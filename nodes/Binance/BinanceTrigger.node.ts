import {
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { intervalProperty, symbolProperty } from './properties';

export class BinanceTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Binance Trigger',
		name: 'binanceTrigger',

		description: 'Binance Trigger',
		icon: 'file:Binance.svg',
		version: 1,
		inputs: [],
		outputs: ['main'],
		defaults: {
			name: 'Binance Trigger',
		},
		group: ['Binance'],
		properties: [symbolProperty, intervalProperty],
	};

	async execute() {
		return [];
	}
}
