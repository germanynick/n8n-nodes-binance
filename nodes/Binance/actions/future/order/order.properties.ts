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
		displayName: 'Order Type',
		name: 'orderType',
		type: 'options',
		required: true,
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		options: [
			{ name: 'LIMIT', value: 'LIMIT' },
			{ name: 'MARKET', value: 'MARKET' },
		],
		default: 'LIMIT',
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
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			// Price only shown for LIMIT orders
			show: { resource: ['future'], operation: ['order'], orderType: ['LIMIT'] },
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
	{
		displayName: 'Take Profit (%)',
		name: 'tpPercent',
		type: 'number',
		default: 0,
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		description: 'Take profit in percent (from entry price). 0 = disabled',
	},
	{
		displayName: 'Stop Loss (%)',
		name: 'slPercent',
		type: 'number',
		default: 0,
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		description: 'Stop loss in percent (from entry price). 0 = disabled',
	},
	{
		displayName: 'Auto OCO',
		name: 'autoOco',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		description: 'If enabled, the node will monitor and cancel the paired TP/SL order after one triggers (short polling).',
	},
	{
		displayName: 'Auto OCO Timeout (seconds)',
		name: 'autoOcoTimeout',
		type: 'number',
		default: 30,
		displayOptions: {
			show: { resource: ['future'], operation: ['order'], autoOco: [true] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		description: 'How many seconds to wait for one conditional order to trigger before timing out.',
	},
	{
		displayName: 'Working Type',
		name: 'workingType',
		type: 'options',
		options: [
			{ name: 'MARK_PRICE', value: 'MARK_PRICE' },
			{ name: 'CONTRACT_PRICE', value: 'CONTRACT_PRICE' },
		],
		default: 'MARK_PRICE',
		displayOptions: {
			show: { resource: ['future'], operation: ['order'] },
			hide: { side: ['CLEAR', 'GET'] },
		},
		description: 'Price to use for trigger evaluation (MARK_PRICE is recommended).',
	},
];
