"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import X from './X';
import './xray.css';

export const dynamic = 'force-dynamic';


export default function Xray({apiEntryPoint}) {

    const [resourcesUrl, setResourcesUrl] = useState("");

    const [indexText, setIndexText] = useState(null);
    const [index, setIndex] = useState(null);

    const router = useRouter();

    const indexUrl = apiEntryPoint + '/resume';

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

            <p>This is the x-ray view. It allows to load resume data from API, load JSX templates and render the resume by applying template to the data.</p>

            <h2>Walkthrough</h2>

            {/* Step 1 */}
            <div className='flex flex-row justify-between gap-1 mt-4'>
                <div className='overflow-auto'>
                    <p><span className={!indexText ? "font-bold" : ""}>1. Get resume sections</span></p>
                    <p>Let&apos;s start with fetching the index of resume section endpoints</p>                    
                </div>
                <div className='w-28'>
                    <button disabled={indexText} className='w-28' onClick={() => (loadIndexText(indexUrl))}>Fetch</button>
                </div>
            </div>

            {/* Step 1 result */}
            { indexText &&
                <div className='mt-4'>
                    <span className='text-gray-500'> {indexUrl} </span>
                    <pre>{JSON.stringify(indexText, null, 2)}</pre> 
                </div>
            }

            {/* Step 2 */}
            { indexText &&
                <div className='flex flex-row justify-between gap-1 mt-4'>
                    <div>
                        <p className={!index ? 'font-bold' : ''}>2. Handle each resume section</p>
                        <p>Now when we have section endpoints, let&apos;s fetch the data and templates for each section.</p> 
                    </div>
                    <div className='w-28'>
                        <button disabled={index} className='w-28' onClick={() => loadIndexJson(indexUrl)}>Proceed</button>
                    </div>
                </div>
            }

            {/* Step 2.x */}
            { index?.map((s, i) => (

                <div key={i} className='mt-4'>

                    {/* Step 2.x.y */}
                    {!s.rendered &&
                        <>
                            <p className='font-bold' >2.{i+1}. {s.url.substring(s.url.lastIndexOf("/") + 1).toUpperCase()} section</p>

                            <div className='flex flex-row justify-between gap-1 mt-1'>
                                <p className={(              !s.section  ? 'font-bold' : '') + ' overflow-hidden pl-4'}>Fetch section data</p>
                                <div className='w-28'>                                            
                                    <button disabled={s.section} className= 'w-28' onClick={() => (loadSection(s.url, i))}>Fetch</button> 
                                </div>
                            </div>

                            <div className='flex flex-row justify-between gap-1 mt-1'>
                                <p className={(s.section &&  !s.template ? 'font-bold' : '') + ' overflow-hidden pl-4'}>Fetch section template</p>     
                                <div className='w-28'>                   
                                    {s.section && <button disabled={s.template} className='w-28' onClick={() => loadTemplate(`${resourcesUrl}/components/${s?.section?.title}.jsx`, i)}>Fetch</button>}
                                </div>
                            </div>

                            <div className='flex flex-row justify-between gap-1 mt-1'>
                                <p className={(s.template &&  !s.rendered ? 'font-bold' : '') + ' overflow-hidden pl-4'}>Render section</p>
                                <div className='w-28'>
                                    {s.template && <button disabled={s.rendered} className='w-28' onClick={() => enableRender(i)}>Render</button>}
                                </div>
                            </div>
                        </>
                    }

                    {/* Step 2.x.y result */}
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

            {/* Step 3 */}
            { index?.every(s => s.rendered) &&

                <div className='flex flex-row justify-between gap-1 mt-4'>
                    <div>
                        <p className='font-bold'>3. That&apos;s all folks!</p>
                        <p>This concludes the walkthrough. Click the button to go back to the home page.</p>
                    </div>
                    <div className='w-28'>
                        <button className='w-28 bg-yellow-500 hover:bg-yellow-700' onClick={goHome}>End</button>
                    </div>
                </div>
            }
        </>
    );
};