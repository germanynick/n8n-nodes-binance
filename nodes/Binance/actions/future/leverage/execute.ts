import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, LoggerProxy } from 'n8n-workflow';
import createBinance, { MarginType_LT } from 'binance-api-node';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('binanceApi', index);
	const binanceClient = createBinance(credentials);
	const symbol = this.getNodeParameter('symbol', index) as string;
	const leverage = this.getNodeParameter('leverage', index) as number;
	const marginType = this.getNodeParameter('marginType', index) as MarginType_LT;

	const response = await binanceClient.futuresLeverage({ symbol, leverage });

	try {
		await binanceClient.futuresMarginType({ symbol, marginType });
	} catch (error) {
		if (error.code !== -4046) {
			throw error;
		}

		// -4046 NO_NEED_TO_CHANGE_MARGIN_TYPE
		LoggerProxy.warn(error);
	}

	return this.helpers.returnJsonArray({ ...response, marginType });
}
