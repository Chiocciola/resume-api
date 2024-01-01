import OpenAPIResponseValidator from 'openapi-response-validator'

import {Section} from './api';

export function Validate(endpoint: string, response: Section, schema: any) : string | null
{
    try
    {
        endpoint = endpoint.substring(endpoint.lastIndexOf("/"));

        console.log(`${endpoint}: Validating response against schema`);
        
        const validator = new OpenAPIResponseValidator({
            responses: schema.paths[endpoint].get.responses,
            components: schema.components
        });

        const result = validator.validateResponse('200', response);

        if (result?.errors)
        {
            throw new Error(JSON.stringify(result.errors));
        }

        console.log(`${endpoint}: Response validation passed`);
    }
    catch (e)
    {
        console.log(`${endpoint}: Response validation failed: ${e}`);
        return `${e}`;
    }

    return null;
}