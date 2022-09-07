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
			show: { resource: ['base'], operation: ['bb'] },
		},
	},
	{
		displayName: 'Period',
		name: 'period',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 14,
		displayOptions: {
			show: { resource: ['base'], operation: ['bb'] },
		},
	},
	{
		displayName: 'Std Dev',
		name: 'stdDev',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 2,
		displayOptions: {
			show: { resource: ['base'], operation: ['bb'] },
		},
	},
];
