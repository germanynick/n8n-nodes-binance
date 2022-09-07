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
			show: { resource: ['base'], operation: ['sma'] },
		},
	},

	{
		displayName: 'Period',
		name: 'period',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 7,
		displayOptions: {
			show: { resource: ['base'], operation: ['sma'] },
		},
	},
];
