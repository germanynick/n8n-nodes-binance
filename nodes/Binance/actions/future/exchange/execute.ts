import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import createBinance from 'binance-api-node';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('binanceApi', index);
	const binanceClient = createBinance(credentials);
	const symbol = this.getNodeParameter('symbol', index) as string;

	const exchangeInfo = await binanceClient.futuresExchangeInfo();

	const executionData = symbol
		? exchangeInfo.symbols.find((item) => item.symbol === symbol)
		: exchangeInfo.symbols;

	return this.helpers.returnJsonArray(executionData as any);
}
