import OpenAPIResponseValidator from 'openapi-response-validator'

import {Section} from './api';

export function Validate(endpoint: string, response: Section, schema: any) : boolean
{
    try
    {
        endpoint = endpoint.substring(endpoint.lastIndexOf("/"));
        
        console.log(`${endpoint}: Validating response against schema`);
        
        const responses = schema.paths[endpoint].get.responses;
        const validator = new OpenAPIResponseValidator({
            responses: responses,
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
        return false;
    }

    return true;
}