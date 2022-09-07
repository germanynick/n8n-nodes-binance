import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import { BollingerBands } from 'technicalindicators';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const json = this.getNodeParameter('json', index) as string;

	const period = this.getNodeParameter('period', index) as number;
	const stdDev = this.getNodeParameter('stdDev', index) as number;

	const values = typeof json === 'string' ? JSON.parse(json) : json;

	const bb = BollingerBands.calculate({ period, stdDev, values });

	return this.helpers.returnJsonArray({ bb });
}
