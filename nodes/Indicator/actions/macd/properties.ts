import { IIndicatorBaseProperties } from '../../interface';

export const properties: IIndicatorBaseProperties = [
	{
		displayName: 'Values (JSON)',
		name: 'json',
		type: 'json',
		default: '',
		required: true,
		typeOptions: {
			alwaysOpenEditWindow: true,
			editor: 'json',
		},
		displayOptions: {
			show: { resource: ['base'], operation: ['macd'] },
		},
	},
	{
		displayName: 'Fast Period',
		name: 'fastPeriod',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 14,
		displayOptions: {
			show: { resource: ['base'], operation: ['macd'] },
		},
	},
	{
		displayName: 'Slow Period',
		name: 'slowPeriod',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 26,
		displayOptions: {
			show: { resource: ['base'], operation: ['macd'] },
		},
	},
	{
		displayName: 'Signal Period',
		name: 'signalPeriod',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 9,
		displayOptions: {
			show: { resource: ['base'], operation: ['macd'] },
		},
	},
];
