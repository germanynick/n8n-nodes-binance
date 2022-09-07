import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';

import * as sma from './sma';
import * as vwap from './vwap';
import * as ichimoku from './ichimoku';
import * as stockRSI from './stochRSI';
import * as macd from './macd';

export async function execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();

	const executionData: INodeExecutionData[][] = [];

	for (let index = 0; index < items.length; index++) {
		const resource = this.getNodeParameter('resource', index) as string;
		const operation = this.getNodeParameter('operation', index) as string;

		try {
			const data =
				operation === 'sma'
					? await sma.execute.call(this, index)
					: operation === 'vwap'
					? await vwap.execute.call(this, index)
					: operation === 'ichimoku'
					? await ichimoku.execute.call(this, index)
					: operation === 'stochRSI'
					? await stockRSI.execute.call(this, index)
					: operation === 'macd'
					? await macd.execute.call(this, index)
					: [];

			const dataWithMeta: INodeExecutionData[] = data.map((value) => ({
				...value,
				pairedItem: { item: index },
			}));

			executionData.push(dataWithMeta);
		} catch (error) {
			if (this.continueOnFail()) {
				executionData.push([{ json: this.getInputData(index)[0].json, error }]);
			} else {
				if (error.context) error.context.itemIndex = index;
				throw error;
			}
		}
	}

	return executionData;
}
