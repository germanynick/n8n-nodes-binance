import { ITriggerFunctions } from 'n8n-core';
import createBinance from 'binance-api-node';
import { ITriggerResponse } from 'n8n-workflow';

export async function trigger(this: ITriggerFunctions): Promise<ITriggerResponse | undefined> {
	const credentials = await this.getCredentials('binanceApi');
	const binanceClient = createBinance(credentials);

	const symbols = this.getNodeParameter('symbols') as string[];
	const interval = this.getNodeParameter('interval') as string;

	const executeTrigger = (data: any) => {
		this.emit([this.helpers.returnJsonArray([data])]);
	};

	const ws = binanceClient.ws.futuresCandles(symbols, interval, (ticker) => {
		if (ticker.isFinal) {
			executeTrigger(ticker);
		}
	});

	async function closeFunction() {
		ws();
	}

	async function manualTriggerFunction() {
		executeTrigger({});
	}

	return {
		closeFunction,
		manualTriggerFunction,
	};
}
