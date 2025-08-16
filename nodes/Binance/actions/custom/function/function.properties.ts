import { IBinanceCustomProperties } from '../../../interface';

export const properties: IBinanceCustomProperties = [
	{
		displayName: 'Function Name or ID',
		name: 'functionName',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: { resource: ['custom'], operation: ['function'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getCustomFunctions',
		},
		options: [],
		default: '',
	},
	{
		displayName: 'Parameters',
		name: 'parameters',
		displayOptions: {
			show: {
				resource: ['custom'],
				operation: ['function'],
			},
		},
		description:
			'The parameters for the custom function, in JSON format. <a href="https://www.npmjs.com/package/binance-api-node">binance-api-node</a>.',
		type: 'json',
		default: '',
	},
];
