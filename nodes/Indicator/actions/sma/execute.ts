import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import { SMA } from 'technicalindicators';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const json = this.getNodeParameter('json', index) as string;
	const period = this.getNodeParameter('period', index) as number;

	const values = JSON.parse(json);

	const sma = new SMA({ values, period });

	return this.helpers.returnJsonArray({ sma: sma.result });
}
