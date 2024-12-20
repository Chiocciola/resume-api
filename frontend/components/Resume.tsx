import {  type JSX } from 'react';

import { Url, Section, ErrorSection } from './api';
import Render from './Renderer';
import Validate from './Validator';  

async function getSections(apiEntryPoint: string | undefined) : Promise<Section[]>
{
    try
    {  
        if (!apiEntryPoint)
        {
            throw Error('API entry point is not set');
        }
    
        console.log(`Fetching sections from  ${apiEntryPoint}`);
    
        // const schemaUrl : string = '/Chiocciola-Resume-1.0.1-swagger.json';
        
        // const schema : object = 
        //     await fetch(schemaUrl)
        //     .then(r => r.ok ? r : Promise.reject(`${schemaUrl}: ${r.status} ${r.statusText}`))
        //     .then(r => r.json());

        const sectionUrls : Url[] = 
            await fetch(apiEntryPoint)
                .then(r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                .then(r => r.json());

        const sectionsPromises : Promise<Section>[] = 
            sectionUrls.map( (s : Url) => 
                fetch(s.url)
                    .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                    .then( r => r.json())
                    // .then( section => { const errors = Validate(s.url, section, schema); return errors ? Promise.reject(`Validation failed: ${errors}`): section})
                    .catch(e => new ErrorSection(`${s.url}: ${e}`)));

        return await Promise.all(sectionsPromises);
    }
    catch (e)
    {
        return [new ErrorSection(`${e}`)];
    }
}

export default async function Resume(props: {apiEntryPoint: string | undefined}) : Promise<JSX.Element>
{   
    const sections = await getSections(props.apiEntryPoint);

    return (<>{sections.map(Render)}</>);
};