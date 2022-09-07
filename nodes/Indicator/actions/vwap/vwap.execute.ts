import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import { VWAP } from 'technicalindicators';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const closeString = this.getNodeParameter('close', index) as string;
	const lowString = this.getNodeParameter('low', index) as string;
	const highString = this.getNodeParameter('high', index) as string;
	const volumeString = this.getNodeParameter('volume', index) as string;

	const close = typeof closeString === 'string' ? JSON.parse(closeString) : closeString;
	const low = typeof lowString === 'string' ? JSON.parse(lowString) : lowString;
	const high = typeof highString === 'string' ? JSON.parse(highString) : highString;
	const volume = typeof volumeString === 'string' ? JSON.parse(volumeString) : volumeString;

	const vwap = new VWAP({ close, low, high, volume });

	return this.helpers.returnJsonArray({ vwap: vwap.result });
}
