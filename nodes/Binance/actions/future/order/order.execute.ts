import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import createBinance, { OrderSide_LT } from 'binance-api-node';

function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('binanceApi', index);
	const binanceClient = createBinance(credentials as any);

	const side = this.getNodeParameter('side', index) as string;
	const symbol = this.getNodeParameter('symbol', index) as string;

	// quick handlers for CLEAR/GET (preserve existing behavior)
	if (side === 'CLEAR') {
		const order = await binanceClient.futuresCancelAllOpenOrders({ symbol });
		return this.helpers.returnJsonArray(order as any);
	}

	if (side === 'GET') {
		const orders = await binanceClient.futuresOpenOrders({ symbol });
		return this.helpers.returnJsonArray(orders as any);
	}

	// read orderType early so we only request parameters that exist for that type
	const orderType = (this.getNodeParameter('orderType', index) as string) || 'LIMIT';

	// common parameters
	const quantity = this.getNodeParameter('quantity', index) as any;
	// only read price when orderType is LIMIT (price field may be hidden for MARKET and cause an error)
	let price: any = undefined;
	if (orderType === 'LIMIT') {
		price = this.getNodeParameter('price', index) as any;
	}
	const reduceOnly = this.getNodeParameter('reduceOnly', index) as boolean;

	// new parameters per ТЗ
	const tpPercent = (this.getNodeParameter('tpPercent', index) as number) || 0;
	const slPercent = (this.getNodeParameter('slPercent', index) as number) || 0;
	const autoOco = (this.getNodeParameter('autoOco', index) as boolean) ?? true;
	const autoOcoTimeout = (this.getNodeParameter('autoOcoTimeout', index) as number) || 30;
	const workingType = (this.getNodeParameter('workingType', index) as string) || 'MARK_PRICE';

	// response placeholders
	let marketOrder: any = null;
	let takeProfitOrder: any = null;
	let stopLossOrder: any = null;
	let autoOcoResult: any = { status: 'not_enabled' };

	// create market or limit order
	if (orderType === 'MARKET') {
		// create MARKET order
		marketOrder = await binanceClient.futuresOrder({
			symbol,
			quantity: String(quantity),
			side: side as OrderSide_LT,
			type: 'MARKET',
		});

		// try to obtain entry price (avgPrice) and executed qty; fallback polling if 0
		let entryPrice: number | undefined =
			marketOrder && (marketOrder.avgPrice ? Number(marketOrder.avgPrice) : undefined);

		let entryQty: number | undefined =
			marketOrder && marketOrder.executedQty ? Number(marketOrder.executedQty) : undefined;

		if ((!entryPrice || entryPrice === 0) && marketOrder && marketOrder.orderId) {
			const maxAttempts = 5;
			for (let attempt = 0; attempt < maxAttempts; attempt++) {
				await sleep(500);
				try {
					// some binance client libs support fetching order by orderId
					// this call may throw on some versions — wrap in try/catch
					const ord = await binanceClient.futuresOrder({
						symbol,
						orderId: marketOrder.orderId,
					} as any);
					if (ord) {
						if (ord.avgPrice && Number(ord.avgPrice) > 0) {
							entryPrice = Number(ord.avgPrice);
						}
						if (ord.executedQty) {
							entryQty = Number(ord.executedQty);
						}
					}
					if (entryPrice && entryPrice > 0) break;
				} catch (e) {
					// ignore and retry
				}
			}
		}

		// if still no price, we won't create TP/SL to avoid wrong levels
		if (!entryPrice || entryPrice === 0) {
			// fallback: try last trade price (less accurate) — optional, commented out
			// const trades = await binanceClient.futuresTrades({ symbol, limit: 1 });
			// if (trades && trades.length) entryPrice = Number(trades[0].price);

			// Return a warning-contained response but keep market order info
			return this.helpers.returnJsonArray([
				{
					json: {
						error: 'Unable to determine entry price after MARKET order; TP/SL not created',
						marketOrder,
					},
				},
			]);
		}
	} else {
		// LIMIT (existing behaviour) — price is read above only when orderType === 'LIMIT'
		marketOrder = await binanceClient.futuresOrder({
			symbol,
			quantity: String(quantity),
			price: String(price),
			side: side as OrderSide_LT,
			type: 'LIMIT',
			timeInForce: 'GTC',
			reduceOnly: reduceOnly,
		});
		// For LIMIT, binance may not provide avgPrice until filled — we will not attempt TP/SL here
		// unless you want behavior: create conditional orders immediately using price param.
		// For minimal change, we skip auto-TP/SL for LIMIT in this implementation.
	}

	// If we have an entry price and TP/SL requested — create conditional orders
	const entryPriceResolved =
		marketOrder &&
		(marketOrder.avgPrice ||
			(marketOrder.fills && marketOrder.fills.length ? marketOrder.fills[0].price : undefined));

	let entryPriceNum: number | undefined = undefined;
	if (entryPriceResolved) {
		entryPriceNum = Number(entryPriceResolved);
	}

	// If we created MARKET and have entryPriceNum, create TP/SL
	if (orderType === 'MARKET' && entryPriceNum && (tpPercent > 0 || slPercent > 0)) {
		const isBuy = side === 'BUY';
		let tpPrice: number | undefined = undefined;
		let slPrice: number | undefined = undefined;

		if (tpPercent > 0) {
			tpPrice = isBuy
				? entryPriceNum * (1 + tpPercent / 100)
				: entryPriceNum * (1 - tpPercent / 100);
		}
		if (slPercent > 0) {
			slPrice = isBuy
				? entryPriceNum * (1 - slPercent / 100)
				: entryPriceNum * (1 + slPercent / 100);
		}

		const oppositeSide = isBuy ? 'SELL' : 'BUY';

		// create TAKE_PROFIT_MARKET if needed
		if (tpPrice) {
			try {
				takeProfitOrder = await binanceClient.futuresOrder({
					symbol,
					side: oppositeSide as OrderSide_LT,
					type: 'TAKE_PROFIT_MARKET',
					stopPrice: String(tpPrice),
					closePosition: 'true',
					workingType,
				} as any);
			} catch (e: any) {
				// capture error, but continue attempting SL
				takeProfitOrder = { error: e && e.message ? e.message : e };
			}
		}

		// create STOP_MARKET if needed
		if (slPrice) {
			try {
				stopLossOrder = await binanceClient.futuresOrder({
					symbol,
					side: oppositeSide as OrderSide_LT,
					type: 'STOP_MARKET',
					stopPrice: String(slPrice),
					closePosition: 'true',
					workingType,
				} as any);
			} catch (e: any) {
				stopLossOrder = { error: e && e.message ? e.message : e };
			}
		}

		// Auto OCO via short polling of open orders
		if (autoOco && (takeProfitOrder || stopLossOrder)) {
			const start = Date.now();
			const tpId =
				takeProfitOrder &&
				(takeProfitOrder.orderId || takeProfitOrder.clientOrderId || takeProfitOrder.orderId);
			const slId =
				stopLossOrder &&
				(stopLossOrder.orderId || stopLossOrder.clientOrderId || stopLossOrder.orderId);
			let otherToCancel: any = null;
			let handled = false;

			while ((Date.now() - start) / 1000 < autoOcoTimeout) {
				await sleep(1000);
				try {
					const open = await binanceClient.futuresOpenOrders({ symbol });
					const openIds = (open || []).map((o: any) => String(o.orderId));

					// if TP disappeared from open orders -> cancel SL
					if (tpId && !openIds.includes(String(tpId))) {
						if (slId) otherToCancel = slId;
						handled = true;
						break;
					}
					// if SL disappeared -> cancel TP
					if (slId && !openIds.includes(String(slId))) {
						if (tpId) otherToCancel = tpId;
						handled = true;
						break;
					}
				} catch (e) {
					// transient error - ignore
				}
			}

			if (otherToCancel) {
				try {
					await binanceClient.futuresCancelOrder({ symbol, orderId: otherToCancel } as any);
					autoOcoResult = { status: 'cancelled', cancelledOrderId: otherToCancel };
				} catch (e: any) {
					autoOcoResult = { status: 'error', error: e && e.message ? e.message : e };
				}
			} else {
				autoOcoResult = { status: 'timeout' };
			}
		}
	}

	// final response
	const response = {
		marketOrder,
		takeProfitOrder,
		stopLossOrder,
		autoOcoResult,
	};

	return this.helpers.returnJsonArray(response as any);
}
