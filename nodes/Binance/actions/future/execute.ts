import { INodeExecutionData } from 'n8n-workflow';

import { IExecuteFunctions } from 'n8n-core';

import * as order from './order';
import * as candle from './candle';
import * as exchange from './exchange';
import * as leverage from './leverage';

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
		case 'exchange':
			return exchange.execute.call(this, index);
		case 'leverage':
			return leverage.execute.call(this, index);
		default:
			return [];
	}
}
