/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import { INodeProperties } from 'n8n-workflow';

export const FutureOperationProperty: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['future'],
		},
	},
	options: [
		{
			name: 'Exchange',
			value: 'exchange',
			description: 'Get the exchange info',
			action: 'Get the exchange',
		},
		{
			name: 'Account',
			value: 'account',
			description: 'Get the account',
			action: 'Get the account',
		},
		{
			name: 'Candle',
			value: 'candle',
			description: 'Get the candles',
			action: 'Get the candles',
		},
		{
			name: 'BUY',
			value: 'buy',
			action: 'Buy a cryptocurrency',
			description: 'Buy a cryptocurrency',
		},
		{
			name: 'SELL',
			value: 'sell',
			action: 'Sell a cryptocurrency',
			description: 'Sell a cryptocurrency',
		},
	],
	default: 'account',
};
