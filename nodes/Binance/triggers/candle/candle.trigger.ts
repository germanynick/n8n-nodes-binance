import { ITriggerFunctions } from 'n8n-core';
import createBinance from 'binance-api-node';
import { ITriggerResponse } from 'n8n-workflow';

export async function trigger(this: ITriggerFunctions): Promise<ITriggerResponse | undefined> {
	const credentials = await this.getCredentials('binanceApi');
	const binanceClient = createBinance(credentials);

	const symbols = this.getNodeParameter('symbols') as string[];
	const interval = this.getNodeParameter('interval') as string;
	const percentThreshold = this.getNodeParameter('percentThreshold') as number;
	const timeThreshold = this.getNodeParameter('timeThreshold') as number;
	const isFinal = this.getNodeParameter('isFinal') as boolean;

	const waiters: any = {};

	const executeTrigger = (data: any) => {
		this.emit([this.helpers.returnJsonArray([data])]);
	};

	const ws = binanceClient.ws.futuresCandles(symbols, interval, (ticker) => {
		if (isFinal && ticker.isFinal) {
			executeTrigger(ticker);
		}

		if (percentThreshold > 0 && timeThreshold > 0) {
			const open = Number(ticker.open);
			const close = Number(ticker.close);

			const percent = Math.abs(close - open) / Math.min(close, open);
			const waitTime = Date.now() - (waiters[ticker.symbol] || 0);

			if (percent > percentThreshold && waitTime > timeThreshold) {
				waiters[ticker.symbol] = Date.now();
				executeTrigger(ticker);
			}
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
