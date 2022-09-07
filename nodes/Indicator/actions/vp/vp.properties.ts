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
			show: { resource: ['base'], operation: ['vp'] },
		},
	},
	{
		displayName: 'Open Price (JSON)',
		name: 'open',
		type: 'json',
		default: '',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
			editor: 'json',
		},
		displayOptions: {
			show: { resource: ['base'], operation: ['vp'] },
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
			show: { resource: ['base'], operation: ['vp'] },
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
			show: { resource: ['base'], operation: ['vp'] },
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
			show: { resource: ['base'], operation: ['vp'] },
		},
	},
	{
		displayName: 'Num of Bars',
		name: 'noOfBars',
		type: 'number',
		default: 14,
		required: true,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: { resource: ['base'], operation: ['vp'] },
		},
	},
];
