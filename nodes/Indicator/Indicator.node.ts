import { IExecuteFunctions } from 'n8n-core';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { properties } from './actions/indicator.properties';
import { execute } from './actions/indicator.execute';

export class Indicator implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Indicator',
		name: 'indicator',
		description: 'Technical Indicators',
		icon: 'file:Indicator.svg',
		version: 1,
		inputs: ['main'],
		outputs: ['main'],
		defaults: {
			name: 'Technical Indicators',
		},
		group: ['Technical Indicators'],
		properties,
	};

	async execute(this: IExecuteFunctions) {
		return execute.call(this);
	}
}
