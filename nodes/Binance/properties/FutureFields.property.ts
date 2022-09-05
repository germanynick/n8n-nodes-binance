import { INodeProperties } from 'n8n-workflow';

export const futureSymbolProperty: INodeProperties = {
	displayName: 'Symbol Name or ID',
	name: 'symbol',
	type: 'options',
	required: true,
	description:
		'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	displayOptions: {
		show: { resource: ['future'], operation: ['candle', 'buy', 'sell'] },
	},
	typeOptions: {
		loadOptionsMethod: 'getSymbols',
	},
	default: '',
};

export const futureIntervalProperty: INodeProperties = {
	displayName: 'Interval Name or ID',
	name: 'interval',
	type: 'options',
	description:
		'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	required: true,
	displayOptions: {
		show: { resource: ['future'], operation: ['candle'] },
	},
	typeOptions: {
		loadOptionsMethod: 'getIntervals',
	},
	default: '',
};

export const futureLimitProperty: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: { resource: ['future'], operation: ['candle'] },
	},
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
		numberStepSize: 1,
	},
	description: 'Max number of results to return',
	default: 50,
};

export const futureStartTimeProperty: INodeProperties = {
	displayName: 'Start Time',
	name: 'startTime',
	type: 'dateTime',
	displayOptions: {
		show: { resource: ['future'], operation: ['candle'] },
	},
	default: '',
};

export const futureEndTimeProperty: INodeProperties = {
	displayName: 'End Time',
	name: 'endTime',
	type: 'dateTime',
	displayOptions: {
		show: { resource: ['future'], operation: ['candle'] },
	},
	default: '',
};

export const futureQuantityProperty: INodeProperties = {
	displayName: 'Quantity',
	name: 'quantity',
	type: 'number',
	required: true,
	displayOptions: {
		show: { resource: ['future'], operation: ['buy', 'sell'] },
	},
	default: 0,
};

export const futurePriceProperty: INodeProperties = {
	displayName: 'Price',
	name: 'price',
	type: 'number',
	required: true,
	displayOptions: {
		show: { resource: ['future'], operation: ['buy', 'sell'] },
	},
	default: 0,
};
