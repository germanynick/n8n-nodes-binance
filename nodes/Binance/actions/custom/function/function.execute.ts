import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import createBinance from 'binance-api-node';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('binanceApi', index);
	const binanceClient = createBinance(credentials);
	const functionName = this.getNodeParameter('functionName', index) as string;
	const json = this.getNodeParameter('parameters', index) as any;

	// return parameters as an array if json is an object return [json] if json is an array
	const parameters = Array.isArray(json) ? json : [json];

	const data = await (binanceClient as any)[functionName](...parameters);

	return this.helpers.returnJsonArray(data as any);
}
