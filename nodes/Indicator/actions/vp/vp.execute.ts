import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import { VolumeProfile } from 'technicalindicators';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const openString = this.getNodeParameter('open', index) as string;
	const closeString = this.getNodeParameter('close', index) as string;
	const lowString = this.getNodeParameter('low', index) as string;
	const highString = this.getNodeParameter('high', index) as string;
	const volumeString = this.getNodeParameter('volume', index) as string;
	const noOfBars = this.getNodeParameter('noOfBars', index) as number;

	const open = typeof openString === 'string' ? JSON.parse(openString) : openString;
	const close = typeof closeString === 'string' ? JSON.parse(closeString) : closeString;
	const low = typeof lowString === 'string' ? JSON.parse(lowString) : lowString;
	const high = typeof highString === 'string' ? JSON.parse(highString) : highString;
	const volume = typeof volumeString === 'string' ? JSON.parse(volumeString) : volumeString;

	const vp = VolumeProfile.calculate({ open, close, low, high, noOfBars, volume });

	return this.helpers.returnJsonArray({ vp });
}
