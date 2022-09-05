import {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import createBinance, { Binance as BinanceClient, CandleChartInterval_LT } from 'binance-api-node';
import {
	FutureEndTimeProperty,
	FutureIntervalProperty,
	FutureLimitProperty,
	FutureOperationProperty,
	FuturePriceProperty,
	FutureQuantityProperty,
	FutureStartTimeProperty,
	FutureSymbolProperty,
	ResourceProperty,
	SpotOperationProperty,
} from './properties';

const EXECUTORS: any = {
	spot: {
		exchange: (binanceClient: BinanceClient) => binanceClient.exchangeInfo(),
		account: (binanceClient: BinanceClient) => binanceClient.accountInfo(),
	},
	future: {
		exchange: (binanceClient: BinanceClient) => binanceClient.futuresExchangeInfo(),
		account: (binanceClient: BinanceClient) => binanceClient.futuresAccountInfo(),
		candle: function (this: IExecuteFunctions, binanceClient: BinanceClient) {
			const symbol = this.getNodeParameter('symbol', 0) as string;
			const interval = this.getNodeParameter('interval', 0) as CandleChartInterval_LT;
			const limit = this.getNodeParameter('limit', 0) as number;
			const startTime = this.getNodeParameter('startTime', 0) as Date;
			const endTime = this.getNodeParameter('endTime', 0) as Date;

			console.log(startTime, endTime);

			return binanceClient.futuresCandles({
				symbol,
				interval,
				limit,
				startTime: new Date(startTime).getTime(),
				endTime: new Date(endTime).getTime(),
			});
		},
		buy: function (this: IExecuteFunctions, binanceClient: BinanceClient) {
			const symbol = this.getNodeParameter('symbol', 0) as string;
			const quantity = this.getNodeParameter('quantity', 0) as string;
			const price = this.getNodeParameter('price', 0) as string;

			return binanceClient.futuresOrder({
				symbol,
				quantity,
				price,
				type: 'LIMIT',
				side: 'BUY',
				timeInForce: 'GTC',
			});
		},
		sell: function (this: IExecuteFunctions, binanceClient: BinanceClient) {
			const symbol = this.getNodeParameter('symbol', 0) as string;
			const quantity = this.getNodeParameter('quantity', 0) as string;
			const price = this.getNodeParameter('price', 0) as string;

			return binanceClient.futuresOrder({
				symbol,
				quantity,
				price,
				type: 'LIMIT',
				side: 'SELL',
				timeInForce: 'GTC',
			});
		},
	},
};

export class Binance implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Binance',
		name: 'binance',
		description: 'Consume Binance API',
		icon: 'file:Binance.svg',
		version: 1,
		inputs: ['main'],
		outputs: ['main'],
		defaults: {
			name: 'Consume Binance API',
		},
		group: ['Binance'],
		credentials: [{ name: 'binanceApi', required: true }],
		properties: [
			ResourceProperty,
			SpotOperationProperty,
			FutureOperationProperty,
			FutureSymbolProperty,
			FutureIntervalProperty,
			FutureQuantityProperty,
			FuturePriceProperty,
			FutureLimitProperty,
			FutureStartTimeProperty,
			FutureEndTimeProperty,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('binanceApi');
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const binanceClient = createBinance(credentials);

		const executor = EXECUTORS[resource]?.[operation];

		const response = await executor?.call(this, binanceClient);

		return [this.helpers.returnJsonArray(response)];
	}

	methods?:
		| {
				loadOptions?:
					| { [key: string]: (this: ILoadOptionsFunctions) => Promise<INodePropertyOptions[]> }
					| undefined;
				credentialTest?: {} | undefined;
		  }
		| undefined = {
		loadOptions: {
			async getSymbols(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('binanceApi');
				const resource = this.getNodeParameter('resource', 0) as string;

				const binanceClient = createBinance(credentials);

				const exchange =
					resource === 'future'
						? await binanceClient.futuresExchangeInfo()
						: await binanceClient.exchangeInfo();
				const options: INodePropertyOptions[] = exchange.symbols.map((item) => ({
					name: item.symbol,
					value: item.symbol,
				}));

				return options;
			},
			async getIntervals(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return [
					'1m',
					'3m',
					'5m',
					'15m',
					'30m',
					'1h',
					'2h',
					'4h',
					'6h',
					'8h',
					'12h',
					'1d',
					'3d',
					'1w',
					'1M',
				].map((name) => ({ name, value: name }));
			},
		},
	};
}
