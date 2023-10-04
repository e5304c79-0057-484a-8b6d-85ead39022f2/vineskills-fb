import { Readable } from 'node:stream';
import Joi from 'joi';

import { CreateLoadStreamConfig } from '../bigquery.service';
import { getInsightsStream } from '../facebook/insights.service';
import { PipelineOptions } from './pipeline.request.dto';

export type Pipeline = {
    name: string;
    getExtractStream: (options: PipelineOptions) => Promise<Readable>;
    validationSchema: Joi.Schema;
    loadConfig: CreateLoadStreamConfig;
};

const actionBreakdownSchema = Joi.array()
    .items({ action_type: Joi.string(), value: Joi.number() })
    .optional();

export const ADSET_INSIGHTS: Pipeline = {
    name: 'AdSetInsights',
    getExtractStream: getInsightsStream({
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
    }),
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
    loadConfig: {
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
        writeDisposition: 'WRITE_APPEND',
    },
};

export const ADSET_HOURLY_INSIGHTS: Pipeline = {
    name: 'AdSetHourlyInsights',
    getExtractStream: getInsightsStream({
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
    }),
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
    loadConfig: {
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
        writeDisposition: 'WRITE_APPEND',
    },
};

export const CAMPAIGNS_PLATFORM_INSIGHTS: Pipeline = {
    name: 'CampaignPlatformInsights',
    getExtractStream: getInsightsStream({
        level: 'campaign',
        breakdowns: 'publisher_platform,platform_position',
        fields: [
            'date_start',
            'date_stop',
            'account_id',
            'account_name',
            'campaign_id',
            'campaign_name',
            'spend',
        ],
    }),
    validationSchema: Joi.object({
        date_start: Joi.string(),
        date_stop: Joi.string(),
        account_id: Joi.number().unsafe(),
        account_name: Joi.string(),
        publisher_platform: Joi.string(),
        platform_position: Joi.string(),
        campaign_id: Joi.number().unsafe(),
        campaign_name: Joi.string(),
        spend: Joi.number().optional(),
    }),
    loadConfig: {
        schema: [
            { name: 'date_start', type: 'DATE' },
            { name: 'date_stop', type: 'DATE' },
            { name: 'account_id', type: 'NUMERIC' },
            { name: 'account_name', type: 'STRING' },
            { name: 'publisher_platform', type: 'STRING' },
            { name: 'platform_position', type: 'STRING' },
            { name: 'campaign_id', type: 'NUMERIC' },
            { name: 'campaign_name', type: 'STRING' },
            { name: 'spend', type: 'NUMERIC' },
        ],
        writeDisposition: 'WRITE_APPEND',
    },
};
