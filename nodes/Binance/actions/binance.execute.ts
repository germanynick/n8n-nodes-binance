import { INodeExecutionData } from 'n8n-workflow';
import { IExecuteFunctions } from 'n8n-core';

import * as spot from './spot';
import * as future from './future';
import * as custom from './custom';

export async function execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();

	const executionData: INodeExecutionData[][] = [];

	for (let index = 0; index < items.length; index++) {
		const resource = this.getNodeParameter('resource', index) as string;

		try {
			const data =
				resource === 'spot'
					? await spot.execute.call(this, index)
					: resource === 'future'
					? await future.execute.call(this, index)
					: resource === 'custom'
					? await custom.execute.call(this, index)
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
