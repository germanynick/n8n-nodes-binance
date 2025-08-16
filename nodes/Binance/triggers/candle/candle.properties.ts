import { INodeProperties } from 'n8n-workflow';

export const properties: INodeProperties[] = [
	{
		displayName: 'Symbol Names or IDs',
		name: 'symbols',
		type: 'multiOptions',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: { resource: ['trigger'], operation: ['candle'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getSymbols',
		},
		options: [],
		default: [],
	},
	{
		displayName: 'Interval Name or ID',
		name: 'interval',
		type: 'options',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		displayOptions: {
			show: { resource: ['trigger'], operation: ['candle'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getIntervals',
		},
		options: [],
		default: '',
	},
	{
		displayName: 'Percent Threshold',
		name: 'percentThreshold',
		type: 'number',
		default: 0,
	},
	{
		displayName: 'TimeThreshold',
		name: 'timeThreshold',
		type: 'number',
		default: 0,
	},
	{
		displayName: 'Is Final',
		name: 'isFinal',
		type: 'boolean',
		default: false,
	},
];
