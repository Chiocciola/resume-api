"use client";

import { useState, useEffect } from 'react';
import Render from './Render';
import Loader from './Loader';
import { Url, Section } from './api';

export async function getSections(endpoint: string | undefined) : Promise<Section[]>
{
    if (!endpoint)
    {
        return [{title: 'Error', content: 'Endpoint not set'}];
    }

    console.log(`Fetching sections from  ${endpoint}`);

    try
    {            
        const sectionUrls : Url[] = 
            await fetch(endpoint)
                .then(r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                .then(r => r.json());

        const sectionsPromises : Promise<Section>[] = 
            sectionUrls.map( (s : Url) => 
                fetch(s.url)
                    .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                    .then( r => r.json())
                    .catch(r => ({title: 'Error', content: `${s.url}: ${r}`})));

        return await Promise.all(sectionsPromises);
    }
    catch (e)
    {
        return [{title: 'Error', content: `${e}`}];
    }
}

export default function Resume({endpoint}: {endpoint: string | undefined}) : JSX.Element
{   
    const [sections, setSections] = useState([] as Section[]);

    useEffect(
        () => {getSections(endpoint).then(setSections)},
        []);

    if (sections.length === 0)
    {
        return <div className='flex justify-center w-full text-current'><Loader show={true} color="text-current"/></div>;
    }

    return <>{sections.map(Render)}</>;
};