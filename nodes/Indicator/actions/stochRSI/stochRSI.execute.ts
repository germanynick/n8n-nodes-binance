import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import { StochasticRSI } from 'technicalindicators';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const json = this.getNodeParameter('json', index) as string;
	const stochasticPeriod = this.getNodeParameter('stochasticPeriod', index) as number;
	const kPeriod = this.getNodeParameter('kPeriod', index) as number;
	const dPeriod = this.getNodeParameter('dPeriod', index) as number;
	const rsiPeriod = this.getNodeParameter('rsiPeriod', index) as number;

	const values = typeof json === 'string' ? JSON.parse(json) : json;

	const stochRSI = new StochasticRSI({ values, dPeriod, kPeriod, rsiPeriod, stochasticPeriod });

	return this.helpers.returnJsonArray({ stochRSI: stochRSI.result });
}
