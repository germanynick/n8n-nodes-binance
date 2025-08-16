import { IBinanceFutureProperties } from '../../../interface';

export const properties: IBinanceFutureProperties = [
	{
		displayName: 'Symbol Name or ID',
		name: 'symbol',
		type: 'options',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: { resource: ['future'], operation: ['leverage'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getSymbols',
		},
		options: [],
		default: '',
	},
	{
		displayName: 'Leverage',
		name: 'leverage',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
			maxValue: 75,
			numberStepSize: 1,
		},
		default: 20,
		displayOptions: {
			show: { resource: ['future'], operation: ['leverage'] },
		},
	},
	{
		displayName: 'Margin Type',
		name: 'marginType',
		type: 'options',
		required: true,
		options: [
			{ name: 'ISOLATED', value: 'ISOLATED' },
			{ name: 'CROSSED', value: 'CROSSED' },
		],
		default: 'ISOLATED',
		displayOptions: {
			show: { resource: ['future'], operation: ['leverage'] },
		},
	},
];
