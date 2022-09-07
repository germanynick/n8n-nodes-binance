import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import { MACD } from 'technicalindicators';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const json = this.getNodeParameter('json', index) as string;

	const fastPeriod = this.getNodeParameter('fastPeriod', index) as number;
	const slowPeriod = this.getNodeParameter('slowPeriod', index) as number;
	const signalPeriod = this.getNodeParameter('signalPeriod', index) as number;

	const values = typeof json === 'string' ? JSON.parse(json) : json;

	const macd = MACD.calculate({
		values,
		fastPeriod,
		slowPeriod,
		signalPeriod,
		SimpleMAOscillator: false,
		SimpleMASignal: false,
	});

	return this.helpers.returnJsonArray({ macd });
}
