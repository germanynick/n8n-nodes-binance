import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';

import * as order from './order';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'order':
			return order.execute.call(this, index);
		default:
			return [];
	}
}
