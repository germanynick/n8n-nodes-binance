import { IIndicatorBaseProperties } from '../../interface';

export const properties: IIndicatorBaseProperties = [
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
			show: { resource: ['base'], operation: ['ichimoku'] },
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
			show: { resource: ['base'], operation: ['ichimoku'] },
		},
	},

	{
		displayName: 'Conversion Period',
		name: 'conversionPeriod',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 9,
		displayOptions: {
			show: { resource: ['base'], operation: ['ichimoku'] },
		},
	},
	{
		displayName: 'Base Period',
		name: 'basePeriod',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 26,
		displayOptions: {
			show: { resource: ['base'], operation: ['ichimoku'] },
		},
	},
	{
		displayName: 'Span Period',
		name: 'spanPeriod',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 52,
		displayOptions: {
			show: { resource: ['base'], operation: ['ichimoku'] },
		},
	},
	{
		displayName: 'Displacement',
		name: 'displacement',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 26,
		displayOptions: {
			show: { resource: ['base'], operation: ['ichimoku'] },
		},
	},
];
