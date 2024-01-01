"use client";

import { useState, useEffect } from 'react';
import Render from './Render';
import Loader from './Loader';
import { Url, Section, ErrorSection } from './api';
import { Validate } from './Validate';  

export async function getSections(endpoint: string | undefined) : Promise<Section[]>
{
    if (!endpoint)
    {
        return [{title: 'Error', content: 'Endpoint not set'}];
    }

    console.log(`Fetching sections from  ${endpoint}`);

    try
    {  
        const schemaUrl : string = '/Chiocciola-Resume-1.0.1-swagger.json';
        
        const schema : object = 
            await fetch(schemaUrl)
            .then(r => r.ok ? r : Promise.reject(`${schemaUrl}: ${r.status} ${r.statusText}`))
            .then(r => r.json());

        const sectionUrls : Url[] = 
            await fetch(endpoint)
                .then(r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                .then(r => r.json());

        const sectionsPromises : Promise<Section>[] = 
            sectionUrls.map( (s : Url) => 
                fetch(s.url)
                    .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                    .then( r => r.json())
                    .then( section => { const errors = Validate(s.url, section, schema); return errors ? Promise.reject(`Validation failed: ${errors}`): section})
                    .catch(e => new ErrorSection(`${s.url}: ${e}`)));

        return await Promise.all(sectionsPromises);
    }
    catch (e)
    {
        return [new ErrorSection(`${e}`)];
    }
}

export default function Resume({endpoint}: {endpoint: string | undefined}) : JSX.Element
{   
    const [sections, setSections] = useState([] as Section[]);

    useEffect(
        () => {getSections(endpoint)
            .then(setSections)},
        []);

    if (sections.length === 0)
    {
        return <div className='flex justify-center w-full text-current'><Loader show={true} color="text-current"/></div>;
    }

    return <>{sections.map(Render)}</>;
};