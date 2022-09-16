import { INodeProperties } from 'n8n-workflow';

import * as candle from './candle';

export const properties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden',
		default: 'trigger',
		noDataExpression: true,
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		options: [{ name: 'Candle', value: 'candle' }],
		default: 'candle',
		noDataExpression: true,
	},

	...candle.properties,
];
