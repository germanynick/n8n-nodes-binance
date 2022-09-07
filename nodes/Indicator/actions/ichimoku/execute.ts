import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import { IchimokuCloud } from 'technicalindicators';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const lowString = this.getNodeParameter('low', index) as string;
	const highString = this.getNodeParameter('high', index) as string;
	const conversionPeriod = this.getNodeParameter('conversionPeriod', index) as number;
	const basePeriod = this.getNodeParameter('basePeriod', index) as number;
	const spanPeriod = this.getNodeParameter('spanPeriod', index) as number;
	const displacement = this.getNodeParameter('displacement', index) as number;

	const low = typeof lowString === 'string' ? JSON.parse(lowString) : lowString;
	const high = typeof highString === 'string' ? JSON.parse(highString) : highString;

	const ichimoku = new IchimokuCloud({
		basePeriod,
		conversionPeriod,
		displacement,
		spanPeriod,
		low,
		high,
	});

	return this.helpers.returnJsonArray({ ichimoku: ichimoku.result });
}
