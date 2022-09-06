import { INodeExecutionData } from 'n8n-workflow';

import { IExecuteFunctions } from 'n8n-core';

import * as order_open from './order';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'order':
			return order_open.execute.call(this, index);
		default:
			return [];
	}
}
