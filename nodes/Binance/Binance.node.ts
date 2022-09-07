import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { IExecuteFunctions } from 'n8n-core';

import { loadOptions } from './methods';

import { properties } from './actions/binance.properties';
import { execute } from './actions/binance.execute';

export class Binance implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Binance',
		name: 'binance',
		description: 'Consume Binance API',
		icon: 'file:Binance.svg',
		version: 1,
		inputs: ['main'],
		outputs: ['main'],
		defaults: {
			name: 'Consume Binance API',
		},
		group: ['Binance'],
		credentials: [{ name: 'binanceApi', required: true }],
		properties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return execute.call(this);
	}

	methods = { loadOptions };
}
