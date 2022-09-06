import { INodeExecutionData } from 'n8n-workflow';

import { IExecuteFunctions } from 'n8n-core';

import * as order from './order';
import * as candle from './candle';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'order':
			return order.execute.call(this, index);
		case 'candle':
			return candle.execute.call(this, index);
		default:
			return [];
	}
}
