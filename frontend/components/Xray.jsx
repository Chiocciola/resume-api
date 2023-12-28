"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { immerable } from "immer";
import { useImmer } from "use-immer";


import X from './X';
import Loader from './Loader';
import './xray.css';

class Section
{
    constructor(url)
    {
        this[immerable] = true;

        this.url = url;
        this.loading = false;
        this.section = null;
        this.templateLoading = false;
        this.template = null;
        this.rendered = false;
    }
}

export default function Xray({apiEntryPoint}) {

    const [resourcesUrl, setResourcesUrl] = useState("");

    const [started, setStarted] = useState(false);
    const [indexText, setIndexText] = useState(null);
    const [sections, setSections] = useImmer(null);

    const router = useRouter();

    useEffect(() => {
        setResourcesUrl(window.location.origin);
    }, []);

    async function start()
    {
        setStarted(true);
    }

    async function loadIndexText()
    {    
        const r = await fetch(apiEntryPoint);

        if (r.ok) 
        {
            const json = await r.json();

            setIndexText(json);
        }
        else
        {
            setSections([{section: {title: 'Error', content: `${apiEntryPoint}: ${r.status} ${r.statusText}`} }]);
        }
    }

    async function loadSections()
    {    
        const endpoint = apiEntryPoint; 

        const r = await fetch(endpoint);

        const sections = r.ok
            ? (await r.json()).map(s => new Section(s.url))
            : [{section: {title: 'Error', content: `${endpoint}: ${r.status} ${r.statusText}`} }];

        setSections(sections);
    }

    async function loadSection(i)
    {   
        setSections(draft => {
            draft[i].loading = true;
        });

        const endpoint = sections[i].url;

        const r = await fetch(endpoint);
        
        const section  = r.ok
            ? await r.json() 
            : {title: 'Error', content: `${endpoint}: ${r.status} ${r.statusText}`};

        setSections(draft => {
            draft[i].loading = false;
            draft[i].section = section;
        });
    }

    async function loadTemplate(i)
    {
        const templateUrl = `${resourcesUrl}/components/${sections[i].section.title}.jsx`;
        
        setSections(draft => {
            draft[i].templateLoading = true;
        });

        const template = await fetch(templateUrl).then(r => r.text())  
        
        setSections(draft => { 
            draft[i].templateLoading = false;
            draft[i].template = template;
        });
    }   

    async function render(i)
    {
        setSections(draft => {
            draft[i].rendered = true;
        });
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

            {/* Step 0 */}
            { 
                <div className={'overflow-hidden transition-all duration-1000 ' + (started ? "opacity-0 max-h-0" : "opacity-100 max-h-96")}>
                    <div className='flex justify-center mt-4'>
                        <button className='w-28 bg-yellow-500 hover:bg-yellow-700' onClick={start}>Start</button>
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
                            <button disabled={indexText} className='w-28' onClick={loadIndexText}>Fetch</button>
                        </div>
                    </div>
                </div>
            }   

            {/* Step 2 */}
            { indexText &&
                <div className={'overflow-hidden transition-all duration-[1500ms] ' + (sections ? "opacity-0 max-h-0" : "opacity-100 max-h-[60rem]")}>
                    <p className={!sections ? 'font-bold mt-4' : 'mt-4'}>2. Handle each resume section</p>
                    <div className='flex flex-row justify-between gap-1 pl-4'>
                       <div className='overflow-auto'>
                            <p>Now when we have section endpoints, let&apos;s fetch the data and templates for each section.</p> 
                        </div>
                        <div className='w-28'>
                            <button disabled={sections} className='w-28' onClick={() => loadSections(apiEntryPoint)}>Proceed</button>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <span className='text-gray-500'> {apiEntryPoint} </span>
                        <pre>{JSON.stringify(indexText, null, 2)}</pre> 
                    </div>
                </div>
            }

            { sections?.map((s, i) => (

                <div key={i}>

                    {/* Section steps */}
                    <div className={'overflow-hidden transition-all delay-300 duration-1000 ' + (s.rendered ? " opacity-0 max-h-0" : "opacity-100 max-h-96")}>

                        <p className='mt-4 font-bold' >{i+3}. {s.url.substring(s.url.lastIndexOf("/") + 1).toUpperCase()} section</p>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={              !s.section  ? 'font-bold' : ''}>Fetch section data</p>
                            </div>
                            <div className='w-28'>                                            
                                <button disabled={s.section || s.loading} className= 'w-28 inline-flex items-center justify-center' onClick={() => loadSection(i)}><Loader show={s.loading}/>Fetch</button> 
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={s.section &&  !s.template ? 'font-bold' : ''}>Fetch section template</p>   
                            </div>  
                            <div className='w-28'>                   
                                {s.section && <button disabled={s.template || s.templateLoading} className='w-28 inline-flex items-center justify-center' onClick={() => loadTemplate(i)}><Loader show={s.templateLoading}/>Fetch</button>}
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={s.template &&  !s.rendered ? 'font-bold' : ''}>Render section</p>
                            </div>
                            <div className='w-28'>
                                {s.template && <button disabled={s.rendered} className='w-28' onClick={() => render(i)}>Render</button>}
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
            { sections?.every(s => s.rendered) &&

                <div className='mt-4'>

                    <p className='font-bold'>{2 + sections.length + 1}. That&apos;s all folks!</p>

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