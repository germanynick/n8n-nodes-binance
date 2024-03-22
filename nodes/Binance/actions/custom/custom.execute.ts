import { INodeExecutionData } from 'n8n-workflow';

import { IExecuteFunctions } from 'n8n-core';
import * as functionOperation from './function';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;

	switch (operation) {
		case 'function':
			return functionOperation.execute.call(this, index);
		default:
			return [];
	}
}
