import { INodeProperties } from 'n8n-workflow';

export const ResourceProperty: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Spot',
			value: 'spot',
		},
		{
			name: 'Future',
			value: 'future',
		},
		{
			name: 'Margin',
			value: 'margin',
		},
	],
	default: 'spot',
};
