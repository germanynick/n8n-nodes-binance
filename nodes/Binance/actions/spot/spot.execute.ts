import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';

import * as order from './order';
import * as account from './account';
import * as candle from './candle';
import * as exchange from './exchange';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'order':
			return order.execute.call(this, index);
		case 'account':
			return account.execute.call(this, index);
		case 'candle':
			return candle.execute.call(this, index);
		case 'exchange':
			return exchange.execute.call(this, index);
		default:
			return [];
	}
}
