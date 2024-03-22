import { INodeProperties } from 'n8n-workflow';
import * as spot from './spot';
import * as future from './future';
import * as custom from './custom';

export const properties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Spot',
				value: 'spot',
			},
			{
				name: 'Future',
				value: 'future',
			},
			{
				name: 'Margin',
				value: 'margin',
			},
			{
				name: 'Custom',
				value: 'custom',
			},
		],
		default: 'spot',
	},
	...spot.properties,
	...future.properties,
	...custom.properties,
];
