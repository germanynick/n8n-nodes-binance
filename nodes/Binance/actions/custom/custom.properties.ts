import { INodeProperties } from 'n8n-workflow';

import * as functionOperation from './function';

export const properties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['custom'],
			},
		},
		options: [
			{
				name: 'Execute Custom Function',
				value: 'function',
				description: 'Execute a custom function',
				action: 'Execute custom function',
			},
		],
		default: 'function',
	},
	...functionOperation.properties,
];
