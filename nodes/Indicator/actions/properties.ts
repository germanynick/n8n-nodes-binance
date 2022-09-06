import { INodeProperties } from 'n8n-workflow';

import * as sma from './sma';
import * as vwap from './vwap';

export const properties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden',
		noDataExpression: true,
		default: 'base',
	},

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'SMA', value: 'sma' },
			{ name: 'VWAP', value: 'vwap' },
		],
		default: 'sma',
	},

	...sma.properties,
	...vwap.properties,
];
