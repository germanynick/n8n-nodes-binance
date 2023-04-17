import { INodeProperties } from 'n8n-workflow';

import * as order from './order';
import * as account from './account';
import * as candle from './candle';
import * as exchange from './exchange';

export const properties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['spot'],
			},
		},
		options: [
			{
				name: 'Account',
				value: 'account',
				description: 'Get the account',
				action: 'Get the account',
			},
			{
				name: 'Order',
				value: 'order',
				action: 'Buy or sell a cryptocurrency',
				description: 'Buy or sell a cryptocurrency',
			},
			{
				name: 'Candle',
				value: 'candle',
				description: 'Get the candles',
				action: 'Get the candles',
			},
			{
				name: 'Exchange',
				value: 'exchange',
				description: 'Get the exchange info',
				action: 'Get the exchange',
			},
		],
		default: 'account',
	},

	...order.properties,
	...account.properties,
	...candle.properties,
	...exchange.properties,
];
