import { INodeProperties } from 'n8n-workflow';

export const intervalProperty: INodeProperties = {
	displayName: 'Interval',
	name: 'interval',
	type: 'options',
	options: [
		{
			name: 'One Minute',
			value: '1m',
		},
		{
			name: 'Five Minutes',
			value: '5m',
		},
	],
	default: '1m',
};
