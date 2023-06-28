import Joi from 'joi';

import { InsightsConfig } from './insights.service';

export type Pipeline = {
    name: string;
    insightsConfig: InsightsConfig;
    validationSchema: Joi.Schema;
    schema: Record<string, any>[];
};

const actionBreakdownSchema = Joi.array()
    .items({ action_type: Joi.string(), value: Joi.number() })
    .optional();

export const ADSET_INSIGHTS: Pipeline = {
    name: 'AdSetInsights',
    insightsConfig: {
        level: 'adset',
        fields: [
            'date_start',
            'date_stop',
            'account_id',
            'account_name',
            'campaign_id',
            'campaign_name',
            'adset_id',
            'adset_name',
            'action_values',
            'actions',
            'conversion_values',
            'conversions',
            'clicks',
            'impressions',
            'reach',
            'spend',
        ],
    },
    validationSchema: Joi.object({
        date_start: Joi.string(),
        date_stop: Joi.string(),
        account_id: Joi.number().unsafe(),
        account_name: Joi.string(),
        campaign_id: Joi.number().unsafe(),
        campaign_name: Joi.string(),
        adset_id: Joi.number().unsafe(),
        adset_name: Joi.string(),
        action_values: actionBreakdownSchema.optional(),
        actions: actionBreakdownSchema.optional(),
        conversion_values: actionBreakdownSchema.optional(),
        conversions: actionBreakdownSchema.optional(),
        clicks: Joi.number().optional(),
        impressions: Joi.number().optional(),
        reach: Joi.number().optional(),
        spend: Joi.number().optional(),
    }),
    schema: [
        { name: 'date_start', type: 'DATE' },
        { name: 'date_stop', type: 'DATE' },
        { name: 'account_id', type: 'NUMERIC' },
        { name: 'account_name', type: 'STRING' },
        { name: 'campaign_id', type: 'NUMERIC' },
        { name: 'campaign_name', type: 'STRING' },
        { name: 'adset_id', type: 'NUMERIC' },
        { name: 'adset_name', type: 'STRING' },
        {
            name: 'action_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'conversion_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'conversions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        { name: 'clicks', type: 'NUMERIC' },
        { name: 'impressions', type: 'NUMERIC' },
        { name: 'reach', type: 'NUMERIC' },
        { name: 'spend', type: 'NUMERIC' },
    ],
};

export const ADSET_HOURLY_INSIGHTS: Pipeline = {
    name: 'AdSetHourlyInsights',
    insightsConfig: {
        level: 'adset',
        breakdowns: 'hourly_stats_aggregated_by_advertiser_time_zone',
        fields: [
            'date_start',
            'date_stop',
            'account_id',
            'account_name',
            'campaign_id',
            'campaign_name',
            'adset_id',
            'adset_name',
            'action_values',
            'actions',
            'conversion_values',
            'conversions',
            'clicks',
            'impressions',
            'reach',
            'spend',
        ],
    },
    validationSchema: Joi.object({
        date_start: Joi.string(),
        date_stop: Joi.string(),
        account_id: Joi.number().unsafe(),
        account_name: Joi.string(),
        hourly_stats_aggregated_by_advertiser_time_zone: Joi.string(),
        campaign_id: Joi.number().unsafe(),
        campaign_name: Joi.string(),
        adset_id: Joi.number().unsafe(),
        adset_name: Joi.string(),
        action_values: actionBreakdownSchema.optional(),
        actions: actionBreakdownSchema.optional(),
        conversion_values: actionBreakdownSchema.optional(),
        conversions: actionBreakdownSchema.optional(),
        clicks: Joi.number().optional(),
        impressions: Joi.number().optional(),
        reach: Joi.number().optional(),
        spend: Joi.number().optional(),
    }),
    schema: [
        { name: 'date_start', type: 'DATE' },
        { name: 'date_stop', type: 'DATE' },
        { name: 'account_id', type: 'NUMERIC' },
        { name: 'account_name', type: 'STRING' },
        { name: 'hourly_stats_aggregated_by_advertiser_time_zone', type: 'STRING' },
        { name: 'campaign_id', type: 'NUMERIC' },
        { name: 'campaign_name', type: 'STRING' },
        { name: 'adset_id', type: 'NUMERIC' },
        { name: 'adset_name', type: 'STRING' },
        {
            name: 'action_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'conversion_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'conversions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        { name: 'clicks', type: 'NUMERIC' },
        { name: 'impressions', type: 'NUMERIC' },
        { name: 'reach', type: 'NUMERIC' },
        { name: 'spend', type: 'NUMERIC' },
    ],
};
