import OpenAPIResponseValidator from 'openapi-response-validator'

import {Section} from './api';

export function Validate(endpoint: string, response: Section, schema: any) : boolean
{
    try
    {
        endpoint = endpoint.substring(21);
        console.log(`${endpoint}: Validating response`);
        
        const responses = schema.paths[endpoint].get.responses;
        const validator = new OpenAPIResponseValidator({
            responses: responses,
            components: schema.components
        });

        const result = validator.validateResponse('200', response);

        if (result?.errors)
        {
            console.log(`${endpoint}: Validation failed: ${JSON.stringify(result.errors)}`);
        }
        else
        {
            console.log(`${endpoint}: Validation passed`);
        }
    }
    catch (e)
    {
        console.log(`${endpoint}: Validation failed: ${e}`);
        console.log(e);
    }

    return true;
}