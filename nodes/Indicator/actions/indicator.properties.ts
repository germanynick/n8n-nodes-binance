import { INodeProperties } from 'n8n-workflow';

import * as sma from './sma';
import * as vwap from './vwap';
import * as ichimoku from './ichimoku';
import * as stochRSI from './stochRSI';
import * as macd from './macd';
import * as bb from './bb';
import * as vp from './vp';
import * as heikinAshi from './heikin-ashi';

export const properties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden',
		noDataExpression: true,
		default: 'base',
	},

	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Bollinger Bands (BB)',
				value: 'bb',
			},
			{
				name: 'Heikin Ashi',
				value: 'heikin-ashi',
			},
			{
				name: 'Ichimoku Cloud',
				value: 'ichimoku',
			},
			{
				name: 'Moving Average Convergence Divergence (MACD)',
				value: 'macd',
			},
			{
				name: 'Simple Moving Average (SMA)',
				value: 'sma',
			},
			{
				name: 'Stochastic RSI (StochRSI)',
				value: 'stochRSI',
			},
			{
				name: 'Volume Profile (VP)',
				value: 'vp',
			},
			{
				name: 'Volume Weighted Average Price (VWAP)',
				value: 'vwap',
			},
		],
		default: 'sma',
	},

	...sma.properties,
	...vwap.properties,
	...ichimoku.properties,
	...stochRSI.properties,
	...macd.properties,
	...bb.properties,
	...vp.properties,
	...heikinAshi.properties,
];
