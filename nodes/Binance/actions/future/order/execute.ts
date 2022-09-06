import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import createBinance, { OrderSide_LT } from 'binance-api-node';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('binanceApi', index);
	const binanceClient = createBinance(credentials);

	const side = this.getNodeParameter('side', index) as string;
	const symbol = this.getNodeParameter('symbol', index) as string;

	if (side === 'CLEAR') {
		const order = await binanceClient.futuresCancelAllOpenOrders({ symbol });

		return this.helpers.returnJsonArray(order as any);
	}

	const quantity = this.getNodeParameter('quantity', index) as string;
	const price = this.getNodeParameter('price', index) as string;

	const order = await binanceClient.futuresOrder({
		symbol,
		quantity,
		price,
		side: side as OrderSide_LT,
		type: 'LIMIT',
		timeInForce: 'GTC',
	});

	return this.helpers.returnJsonArray(order as any);
}
