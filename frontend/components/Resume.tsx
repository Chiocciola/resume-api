"use client";

import { useState, useEffect } from 'react';
import X from './X';

type Url = {
    url: string;
}

export async function getSections(endpoint: string) : Promise<any[]>
{
    if (!endpoint)
    {
        return [{title: 'Error', content: 'Endpoint not set'}];
    }

    console.log(`Fetching sections from  ${endpoint}`);

    try
    {            
        const sections : Url[] = 
            await fetch(endpoint)
                .then(r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                .then(r => r.json());

        return await Promise.all(
            sections.map( (s : Url) => 
                fetch(s.url)
                    .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                    .then( r => r.json())
                    .catch(r => ({title: 'Error', content: `${s.url}: ${r}`}))));
    }
    catch (e)
    {
        return [{title: 'Error', content: `${e}`}];
    }
}


export default function Resume({endpoint}: {endpoint: string}) : JSX.Element
{
    
    const [sections, setSections] = useState([] as any[]);

    useEffect(
        () => {getSections(endpoint).then(setSections)},
        []);

    return (
        <>
            {sections.map(X)}
        </>
    );
};