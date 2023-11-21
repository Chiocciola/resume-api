"use client"

import { useState, useEffect } from 'react';

import X from './X';
import './xray.css';

export const dynamic = 'force-dynamic';


export default function Xray({apiEntryPoint}) {

    const [resourcesUrl, setResourcesUrl] = useState("");

    const [indexText, setIndexText] = useState(null);
    const [index, setIndex] = useState(null);

    useEffect(() => {
        setResourcesUrl(window.location.origin);
    }, []);
    
    async function loadIndexText(indexEndpoint)
    {    
        const r = await fetch(indexEndpoint);

        if (r.ok) 
        {
            setIndexText(await r.text());
        }
        else
        {
            setIndexText( `Error: ${indexEndpoint}: ${r.status} ${r.statusText}`);
        }
    }

    async function loadIndexJson(indexEndpoint)
    {    
        const r = await fetch(indexEndpoint);

        if (r.ok) 
        {
            setIndex(await r.json());
        }
        else
        {
            setIndex([{section: {title: 'Error', content: `${indexEndpoint}: ${r.status} ${r.statusText}`} }]);
        }
    }

    async function loadSection(sectionEndpoint, i)
    {   
        var section = await fetch(sectionEndpoint).then(r => r.ok ? r.json() : {title: 'Error', content: `${sectionEndpoint}: ${r.status} ${r.statusText}`});

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
            <div className='relative flex flex-row justify-center'>
                <h1 className='xray' xray-text="X-ray">X-ray</h1>
            </div>

            <p className="text-center mb-4 text-xl">Revealing the invisible</p>

            <p>This is the x-ray view. It allows to load resume data from API, load JSX templates and render the resume by applying template to the data.</p>

            <h2>Walkthrough</h2>

            <div className='flex flex-row mt-4 gap-1'>
                <div className='overflow-auto'>
                    <p><span className={!indexText ? "font-bold" : ""}>1. Let&apos;s start with fetching the index of resume section endpoints:</span> {indexUrl}</p>
                    { indexText && <pre className="mt-4">{indexText}</pre> }
                </div>
                <div className='w-28 ml-auto'>
                    <button disabled={indexText} className={ (indexText ? styleDisabled : styleEnabled) + ' rounded w-28 ml-auto'} onClick={() => (loadIndexText(indexUrl))}>Fetch Index</button>
                </div>
            </div>

            { indexText &&
                <>

                    <div className='flex flex-row mt-4 gap-1'>

                        <p className='font-bold'>2. Now when we have section endpoints, let&apos;s fetch the data and templates for each section.</p> 
                        <div className='w-28 ml-auto'>
                            <button disabled={index} className={ (index ? styleDisabled : styleEnabled) + ' rounded w-28 ml-auto'} onClick={() => loadIndexJson(indexUrl)}>Proceed</button>
                         </div>
                    </div>

                </>
            }


            { index?.map((s, i) => (

                <div key={i} className='mt-4'>
                    <div key={i} className='flex flex-row  gap-1'>

                        <div className='overflow-hidden'>
                            {!s.rendered &&
                                <div>
                                    <p><span className={              !s.section  ? 'font-bold' : ''}>2.{i+1}.1 Fetch section data:</span> {s.url}</p>
                                    <p><span className={s.section &&  !s.template ? 'font-bold' : ''}>2.{i+1}.2 Fetch section template:</span> {`${resourcesUrl}/components/${s?.section?.title}.jsx`}</p>
                                    <p><span className={s.template &&  !s.rendered ? 'font-bold' : ''}>2.{i+1}.3 Render section</span></p>
                                </div>
                            }
                        
                        </div>  

                        { !s.rendered &&
                        <div className='flex flex-col gap-2 w-28 ml-auto'>
                            {              <button disabled={s.section}                 className={(               s.section  ? styleDisabled : styleEnabled) + ' rounded w-28'} onClick={() => (loadSection(s.url, i))}>Fetch Data</button> }
                            {s.section   && <button disabled={!s.section || s.template}  className={(!s.section  || s.template ? styleDisabled : styleEnabled) + ' rounded w-28'} onClick={() => (loadTemplate(`${resourcesUrl}/components/${s?.section?.title}.jsx`, i))}>Fetch Template</button>}
                            {s.template  && <button disabled={!s.template || s.rendered} className={(!s.template || s.rendered ? styleDisabled : styleEnabled) + ' rounded w-28'} onClick={() => (enableRender(i))}>Render</button>}
                        </div>
                        }
                    </div>

                    <div id="card-carusel" className='mt-4'>

                        <div className={(s.template ? "card-left" : s.section ?  "card-main" : "card-right") }>
                            <span className='text-gray-500'> {s.url} </span>

                            <pre>{JSON.stringify(s.section, null, 2)}</pre>
                        </div>

                        <div className={(s.rendered ? "card-left" : s.template ? "card-main" : "card-right") }>
                            <span className='text-gray-500'>{`${resourcesUrl}/components/${s?.section?.title || "_???_"}.jsx`}</span>

                            <pre>{s.template}</pre>
                        </div>

                        <div className={(s.rendered ? "card-main" : "card-right")}>
                            {s.rendered && X(s.section)}
                        </div>
                    </div>
                </div>                     
            ))}
        </>
    );
};