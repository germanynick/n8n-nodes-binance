import { ITriggerFunctions } from 'n8n-core';
import { ITriggerResponse } from 'n8n-workflow';

import * as candle from './candle';

export async function trigger(this: ITriggerFunctions): Promise<ITriggerResponse | undefined> {
	const resource = this.getNodeParameter('resource') as string;
	const operation = this.getNodeParameter('operation') as string;

	if (resource !== 'trigger') {
		return;
	}

	switch (operation) {
		case 'candle':
			return candle.trigger.call(this);
		default:
			return;
	}
}
