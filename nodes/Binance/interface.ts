import { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type IBinanceMap = {
	spot: 'exchange' | 'account' | 'candle' | 'order';
	future: 'exchange' | 'account' | 'candle' | 'order' | 'leverage' | 'position' | 'statistics';
	margin: 'exchange' | 'account' | 'candle' | 'order';
	custom: 'function';
};

export type IBinance = AllEntities<IBinanceMap>;

export type IBinanceSpot = Entity<IBinanceMap, 'spot'>;
export type IBinanceFuture = Entity<IBinanceMap, 'future'>;
export type IBinanceMargin = Entity<IBinanceMap, 'margin'>;
export type IBinanceCustom = Entity<IBinanceMap, 'custom'>;

export type IBinanceSpotProperties = PropertiesOf<IBinanceSpot>;
export type IBinanceFutureProperties = PropertiesOf<IBinanceFuture>;
export type IBinanceMarginProperties = PropertiesOf<IBinanceMargin>;
export type IBinanceCustomProperties = PropertiesOf<IBinanceCustom>;
