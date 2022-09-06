import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type IBinanceMap = {
	spot: 'exchange' | 'account' | 'kline' | 'order';
	future: 'exchange' | 'account' | 'kline' | 'order';
	margin: 'exchange' | 'account' | 'kline' | 'order';
};

export type IBinance = AllEntities<IBinanceMap>;

export type IBinanceSpot = Entity<IBinanceMap, 'spot'>;
export type IBinanceFuture = Entity<IBinanceMap, 'future'>;
export type IBinanceMargin = Entity<IBinanceMap, 'margin'>;

export type IBinanceSpotProperties = PropertiesOf<IBinanceSpot>;
export type IBinanceFutureProperties = PropertiesOf<IBinanceFuture>;
export type IBinanceMarginProperties = PropertiesOf<IBinanceMargin>;
