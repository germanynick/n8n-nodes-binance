import { IIndicatorBaseProperties } from '../../interface';

export const properties: IIndicatorBaseProperties = [
	{
		displayName: 'Close Price (JSON)',
		name: 'close',
		type: 'json',
		default: '',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
			editor: 'json',
		},
		displayOptions: {
			show: { resource: ['base'], operation: ['vwap'] },
		},
	},
	{
		displayName: 'Low Price (JSON)',
		name: 'low',
		type: 'json',
		default: '',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
			editor: 'json',
		},
		displayOptions: {
			show: { resource: ['base'], operation: ['vwap'] },
		},
	},
	{
		displayName: 'High Price (JSON)',
		name: 'high',
		type: 'json',
		default: '',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
			editor: 'json',
		},
		displayOptions: {
			show: { resource: ['base'], operation: ['vwap'] },
		},
	},
	{
		displayName: 'Volume (JSON)',
		name: 'volume',
		type: 'json',
		default: '',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
			editor: 'json',
		},
		displayOptions: {
			show: { resource: ['base'], operation: ['vwap'] },
		},
	},
];
