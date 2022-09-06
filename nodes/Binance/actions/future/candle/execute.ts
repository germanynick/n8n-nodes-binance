import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';

import createBinance, { CandleChartInterval_LT } from 'binance-api-node';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('binanceApi', index);
	const binanceClient = createBinance(credentials);

	const symbol = this.getNodeParameter('symbol', index) as string;
	const interval = this.getNodeParameter('interval', index) as CandleChartInterval_LT;
	const limit = this.getNodeParameter('limit', index) as number;
	const startTimeString = this.getNodeParameter('startTime', index) as string;
	const endTimeString = this.getNodeParameter('endTime', index) as string;

	const startTime = (startTimeString && new Date(startTimeString).getTime()) || undefined;
	const endTime = (endTimeString && new Date(endTimeString).getTime()) || undefined;

	const candles = await binanceClient.futuresCandles({
		symbol,
		interval,
		limit,
		startTime,
		endTime,
	});

	const executionData = candles.map((candle) => ({
		...candle,
		open: Number(candle.open),
		close: Number(candle.close),
		low: Number(candle.low),
		high: Number(candle.high),
		volume: Number(candle.volume),
	}));

	return this.helpers.returnJsonArray(executionData);
}
