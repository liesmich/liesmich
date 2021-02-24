/*!
 * Source https://github.com/liesmich/liesmich Package: schemas
 */

import { JSONSchemaType, } from 'ajv';

export interface ITemplate {
    name: string;
}

export interface IConfig {
    templates: { [key: string]: ITemplate };
}

export const TEMPLATE_SCHEMA: JSONSchemaType<ITemplate> = {
    properties: {
        name: {
            type: 'string',
        }
    },
    required: ['name'],
    type: 'object',
}
export const CONFIG_SCHEMA: JSONSchemaType<IConfig> = {
    $id: '#liesmich/geo_fence',
    definitions: {
        templates: TEMPLATE_SCHEMA,
    },
    properties: {
        templates: {
            $ref: '#/definitions/templates'
        },
    },
    required: ['templates'],
    type: 'object',
};
