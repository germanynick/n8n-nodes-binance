import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import createBinance from 'binance-api-node';

export async function getSymbols(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
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
}

export async function getCustomFunctions(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('binanceApi');
	const binanceClient = createBinance(credentials);

	const functions = Object.keys(binanceClient as any).filter(
		(key) => typeof (binanceClient as any)[key] === 'function',
	);

	return functions.map((name) => ({ name, value: name }));
}

export async function getIntervals(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
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
}
