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
			show: { resource: ['base'], operation: ['stochRSI'] },
		},
	},
	{
		displayName: 'RSI Period',
		name: 'rsiPeriod',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 14,
		displayOptions: {
			show: { resource: ['base'], operation: ['stochRSI'] },
		},
	},
	{
		displayName: 'Stochastic Period',
		name: 'stochasticPeriod',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 14,
		displayOptions: {
			show: { resource: ['base'], operation: ['stochRSI'] },
		},
	},
	{
		displayName: 'K Period',
		name: 'kPeriod',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 7,
		displayOptions: {
			show: { resource: ['base'], operation: ['stochRSI'] },
		},
	},
	{
		displayName: 'D Period',
		name: 'dPeriod',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 7,
		displayOptions: {
			show: { resource: ['base'], operation: ['stochRSI'] },
		},
	},
];
