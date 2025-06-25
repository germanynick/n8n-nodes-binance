import { IBinanceFutureProperties } from '../../../interface';

export const properties: IBinanceFutureProperties = [
	{
		displayName: 'Side',
		name: 'side',
		type: 'options',
		required: true,
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
		},
		options: [
			{ name: 'BUY', value: 'BUY' },
			{ name: 'SELL', value: 'SELL' },
			{ name: 'Clear Orders', value: 'CLEAR' },
			{ name: 'Open Orders', value: 'GET' },
		],
		default: 'BUY',
	},
	{
		displayName: 'Symbol Name or ID',
		name: 'symbol',
		type: 'options',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getSymbols',
		},
		options: [],
		default: '',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		required: true,
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		default: 0,
	},
	{
		displayName: 'Reduce Only',
		name: 'reduceOnly',
		type: 'boolean',
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		default: false,
	},
];
