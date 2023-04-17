import { IBinanceSpotProperties } from '../../../interface';

export const properties: IBinanceSpotProperties = [
	{
		displayName: 'Symbol Name or ID',
		name: 'symbol',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		displayOptions: {
			show: { resource: ['spot'], operation: ['exchange'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getSymbols',
		},
		required: true,
		options: [],
		default: '',
	},
];
