"use client"

import { useState, useEffect } from 'react';

import X from './X';
import './xray.css';

export const dynamic = 'force-dynamic';


export default function Xray({apiEntryPoint}) {

    const [resourcesUrl, setResourcesUrl] = useState("");

    const [index, setIndex] = useState(null);

    useEffect(() => {
        setResourcesUrl(window.location.origin);
    }, []);
    
    async function loadIndex(endpoint)
    {    
        setIndex( await fetch(endpoint).then(r => r.ok ? r.json() : [{section: {title: 'Error', content: `${endpoint}: ${r.status} ${r.statusText}`} }]));
    }

    async function loadSection(endpoint, i)
    {   
        var section = await fetch(endpoint).then(r => r.ok ? r.json() : {title: 'Error', content: `${endpoint}: ${r.status} ${r.statusText}`});

        const newIndex = [...index]; 
        newIndex[i] =  { ...index[i], section: section };
        setIndex(newIndex);
    }

    async function loadTemplate(endpoint, i)
    {
        const template = await fetch(endpoint).then(r => r.text())  
        
        const newIndex = [...index]; 
        newIndex[i] =  { ...index[i], template: template };
        setIndex(newIndex);    }   

    async function enableRender(i)
    {
        const newIndex = [...index]; 
        newIndex[i] =  { ...index[i], rendered: true };
        setIndex(newIndex);
    }

    var indexUrl = apiEntryPoint + '/resume/sections';

    var styleDisabled = 'bg-gray-500 text-gray-400 disabled';
    var styleEnabled = 'bg-blue-500 text-white';

    return (
        <>       
            <h1 className='text-center text-3xl'>X-ray</h1>
            <p className='first-letter:text-5xl'>🩻 This is the x-ray mode. It allows to see the data and templates that are used to render the resume.</p>

            <div className='flex flex-row mt-4 gap-1'>
                <div className='overflow-hidden'>
                    <p><span className={!index ? "font-bold" : ""}>1. Let&apos;s start with fetching the index of resume section endpoints:</span> {indexUrl}</p>
                </div>
                <div className='w-28 ml-auto'>
                    <button disabled={index} className={ (index ? styleDisabled : styleEnabled) + ' rounded w-28 ml-auto'} onClick={() => (loadIndex(indexUrl))}>Get Index</button>
                </div>
            </div>

            { index && <p className='font-bold mt-4'>2. Now when we have section endpoints, let&apos;s fetch the data and templates for each section.</p> } 


            { index && index.map((s, i) => (

                <div key={i} className='flex flex-row mt-4 gap-1'>

                    <div className='overflow-hidden'>
                        {              !s.section &&  <p><span className='font-bold'>2.{i+1}.1 Fetch section data:</span> {s.url}</p>}
                        {s.section &&  !s.template && <p><span className='font-bold'>2.{i+1}.2 Fetch section template:</span> {`${resourcesUrl}/components/${s?.section?.title}.jsx`}</p>}
                        {s.template && !s.rendered && <p className='font-bold'>2.{i+1}.3 Render section</p>}

                        <div id="card-carusel" className='mt-4'>

                            <div className={(s.template ? "card-left" : s.section ?  "card-main" : "card-right") }>
                                <span className='text-gray-500'> {s.url} </span>

                                <pre className="overflow-hidden p-2 rounded bg-gray-700 text-white whitespace-pre-wrap text-sm">{JSON.stringify(s.section, null, 2)}</pre>
                            </div>

                            <div className={(s.rendered ? "card-left" : s.template ? "card-main" : "card-right") }>
                                <span className='text-gray-500'>{`${resourcesUrl}/components/${s?.section?.title || "_???_"}.jsx`}</span>

                                <pre className="overflow-hidden p-2 rounded bg-gray-700 text-white whitespace-pre-wrap text-sm">{s.template}</pre>
                            </div>

                            <div className={s.rendered ? "card-main" : "card-right"}>
                                {s.rendered && X(s.section)}
                            </div>
                        </div>
                    </div>  

                    <div className='flex flex-col gap-2 w-28 ml-auto'>
                        <button disabled={s.section}                 className={(               s.section  ? styleDisabled : styleEnabled) + ' rounded w-28'} onClick={() => (loadSection(s.url, i))}>Get Data</button> 
                        <button disabled={!s.section || s.template}  className={(!s.section  || s.template ? styleDisabled : styleEnabled) + ' rounded w-28'} onClick={() => (loadTemplate(`${resourcesUrl}/components/${s?.section?.title}.jsx`, i))}>Get Template</button>
                        <button disabled={!s.template || s.rendered} className={(!s.template || s.rendered ? styleDisabled : styleEnabled) + ' rounded w-28'} onClick={() => (enableRender(i))}>Render</button>
                    </div>
                </div>                     
            ))}
        </>
    );
};