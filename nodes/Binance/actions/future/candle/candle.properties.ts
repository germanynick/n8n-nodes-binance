import { IBinanceFutureProperties } from '../../../interface';

export const properties: IBinanceFutureProperties = [
	{
		displayName: 'Symbol Name or ID',
		name: 'symbol',
		type: 'options',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		displayOptions: {
			show: { resource: ['future'], operation: ['candle'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getSymbols',
		},
		options: [],
		default: '',
	},
	{
		displayName: 'Interval Name or ID',
		name: 'interval',
		type: 'options',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		displayOptions: {
			show: { resource: ['future'], operation: ['candle'] },
		},
		typeOptions: {
			loadOptionsMethod: 'getIntervals',
		},
		options: [],
		default: '',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
		},
		required: true,
		displayOptions: {
			show: { resource: ['future'], operation: ['candle'] },
		},
		default: 50,
	},
	{
		displayName: 'Start Time',
		name: 'startTime',
		type: 'dateTime',
		displayOptions: {
			show: { resource: ['future'], operation: ['candle'] },
		},
		default: '',
	},
	{
		displayName: 'End Time',
		name: 'endTime',
		type: 'dateTime',
		displayOptions: {
			show: { resource: ['future'], operation: ['candle'] },
		},
		default: '',
	},
];
