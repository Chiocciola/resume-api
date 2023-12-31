"use client";

import { useState, useEffect } from 'react';
import Render from './Render';
import { Url } from './api';

export async function getSections(endpoint: string | undefined) : Promise<any[]>
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

        const sectionsPromises : any[] = 
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
    const [sections, setSections] = useState([] as any[]);

    useEffect(
        () => {getSections(endpoint).then(setSections)},
        []);

    return <>{sections.map(Render)}</>;
};