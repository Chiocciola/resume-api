"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import X from './X';
import './xray.css';

export const dynamic = 'force-dynamic';


export default function Xray({apiEntryPoint}) {

    const [resourcesUrl, setResourcesUrl] = useState("");

    const [started, setStarted] = useState(false);
    const [indexText, setIndexText] = useState(null);
    const [index, setIndex] = useState(null);

    const router = useRouter();

    useEffect(() => {
        setResourcesUrl(window.location.origin);
    }, []);
    
    async function loadIndexText(indexEndpoint)
    {    
        const r = await fetch(indexEndpoint);

        if (r.ok) 
        {
            setIndexText(await r.json());
        }
        else
        {
            setIndex([{section: {title: 'Error', content: `${indexEndpoint}: ${r.status} ${r.statusText}`} }]);
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

    function goHome()
    {
        router.push('/');
    }

    return (
        <>       
            <div className='flex justify-center items-center'>
                <h1 className='xray' xray-text="X-ray">X-ray</h1>
            </div>

            <p className="text-center mb-4 text-xl">Revealing the invisible</p>

            <p>Explore API resume using X-ray view. It enables loading resume data directly from an API, loading of JSX templates, and rendering the resume by applying these templates to the data.</p>

            {/* <h2>Walkthrough</h2> */}

            {/* Step 0 */}
            { 
                <div className={'overflow-hidden transition-all duration-1000 ' + (started ? "opacity-0 max-h-0" : "opacity-100 max-h-96")}>
                    <div className='flex justify-center mt-4'>
                        <button className='w-28 bg-yellow-500 hover:bg-yellow-700' onClick={() => setStarted(true)}>Start</button>
                    </div>
                </div>
            }

            {/* Step 1 */}
            { started &&
                <div className={'overflow-hidden transition-all duration-1000 ' + (indexText ? "opacity-0 max-h-0" : "opacity-100 max-h-96")}>
                    <p className={!indexText ? "font-bold mt-4" : "mt-4"}>1. Get resume sections</p>
                    <div className='flex flex-row justify-between gap-1 pl-4'>
                        <div className='overflow-hidden'>
                            <p>Let&apos;s start with fetching the index of resume section endpoints</p>                    
                        </div>
                        <div className='w-28'>
                            <button disabled={indexText} className='w-28' onClick={() => (loadIndexText(apiEntryPoint))}>Fetch</button>
                        </div>
                    </div>
                </div>
            }   

            {/* Step 2 */}
            { indexText &&
                <div className={'overflow-hidden transition-all duration-[1500ms] ' + (index ? "opacity-0 max-h-0" : "opacity-100 max-h-[60rem]")}>
                    <p className={!index ? 'font-bold mt-4' : 'mt-4'}>2. Handle each resume section</p>
                    <div className='flex flex-row justify-between gap-1 pl-4'>
                       <div className='overflow-auto'>
                            <p>Now when we have section endpoints, let&apos;s fetch the data and templates for each section.</p> 
                        </div>
                        <div className='w-28'>
                            <button disabled={index} className='w-28' onClick={() => loadIndexJson(apiEntryPoint)}>Proceed</button>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <span className='text-gray-500'> {apiEntryPoint} </span>
                        <pre>{JSON.stringify(indexText, null, 2)}</pre> 
                    </div>
                </div>
            }

            { index?.map((s, i) => (

                <div key={i}>

                    {/* Section steps */}
                    <div className={'overflow-hidden transition-all delay-300 duration-1000 ' + (s.rendered ? " opacity-0 max-h-0" : "opacity-100 max-h-96")}>

                        <p className='mt-4 font-bold' >{i+3}. {s.url.substring(s.url.lastIndexOf("/") + 1).toUpperCase()} section</p>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={              !s.section  ? 'font-bold' : ''}>Fetch section data</p>
                            </div>
                            <div className='w-28'>                                            
                                <button disabled={s.section} className= 'w-28' onClick={() => (loadSection(s.url, i))}>Fetch</button> 
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={s.section &&  !s.template ? 'font-bold' : ''}>Fetch section template</p>   
                            </div>  
                            <div className='w-28'>                   
                                {s.section && <button disabled={s.template} className='w-28' onClick={() => loadTemplate(`${resourcesUrl}/components/${s?.section?.title}.jsx`, i)}>Fetch</button>}
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={s.template &&  !s.rendered ? 'font-bold' : ''}>Render section</p>
                            </div>
                            <div className='w-28'>
                                {s.template && <button disabled={s.rendered} className='w-28' onClick={() => enableRender(i)}>Render</button>}
                            </div>
                        </div>
                    </div>

                    {/* Section result */}
                    <div id="card-carusel" className='mt-4'>

                        <div className={(s.template ? "card-left" : s.section ?  "card-main" : "card-right") }>
                            <span className='text-gray-500'> {s.url} </span>
                            <pre>{JSON.stringify(s.section, null, 2)}</pre>
                        </div>

                        <div className={(s.rendered ? "card-left" : s.template ? "card-main" : "card-right") }>
                            <span className='text-gray-500'>{`${resourcesUrl}/components/${s.section?.title}.jsx`}</span>
                            <pre>{s.template}</pre>
                        </div>

                        <div className={(s.rendered ? "card-main" : "card-right")}>
                            {s.rendered && X(s.section)}
                        </div>
                    </div>
                </div>
            ))}

            {/* Final step */}
            { index?.every(s => s.rendered) &&

                <div className='mt-4'>

                    <p className='font-bold'>{2 + index.length + 1}. That&apos;s all folks!</p>

                    <div className='flex flex-row justify-between gap-1 pl-4'>
                        <div className='overflow-hidden'>
                            <p>This concludes the walkthrough. Click the button to go back to the resume page.</p>
                        </div>
                        <div className='w-28'>
                            <button className='w-28 bg-yellow-500 hover:bg-yellow-700' onClick={goHome}>Back home</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};