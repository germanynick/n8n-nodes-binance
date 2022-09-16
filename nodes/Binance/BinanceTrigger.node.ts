import { ITriggerFunctions } from 'n8n-core';
import { INodeType, INodeTypeDescription, ITriggerResponse } from 'n8n-workflow';
import { trigger } from './triggers/binance.trigger';
import { properties } from './triggers/binance.properties';
import { loadOptions } from './methods';
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
		group: ['trigger', 'Binance'],
		credentials: [{ name: 'binanceApi', required: true }],
		properties: properties,
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse | undefined> {
		return trigger.call(this);
	}

	methods = { loadOptions };
}
