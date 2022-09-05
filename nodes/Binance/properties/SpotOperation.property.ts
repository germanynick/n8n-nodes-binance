import { INodeProperties } from 'n8n-workflow';

export const spotOperationProperty: INodeProperties = {
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
	],
	default: 'account',
};
