"use client"

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { immerable } from "immer";
import { useImmer } from "use-immer";
import { toast } from 'react-toastify';

import Loader from './Loader';

import {Url, Section} from './api';

import Render from './Renderer';
import Validate from './Validator';

import './Xray.css';

class XraySection
{
    [immerable] = true;

    endpoint: Url;
    loading: boolean = false;
    section: null | Section = null;
    isValid: null | boolean = null;
    templateLoading: boolean = false;
    template: null | string = null;
    rendered: boolean = false;

    constructor(endpoint: Url)
    {
        this.endpoint = endpoint;
    }
}

export default function Xray(props: {apiEntryPoint: string | undefined}) {

    const [resourcesUrl, setResourcesUrl] = useState("");

    const [started, setStarted] = useState(false);

    const [schema, setSchema] = useState<object | null>(null);
    const [schemaLoading, setSchemaLoading] = useState(false);

    const [sectionEndpoints,        setSectionsEndpoints] = useState<Url[]>([]);
    const [sectionEndpointsLoading, setSectionsEndpointsLoading] = useState(false);

    const [sections, setSections] = useImmer<XraySection[]>([]);

    const router = useRouter();

    useEffect(() => {
        setResourcesUrl(window.location.origin);
    }, []);

    function start()
    {
        setStarted(true);
    }

    function loadSchema()
    {
        const url = `${resourcesUrl}/Chiocciola-Resume-1.0.1-swagger.json`;

        setSchemaLoading(true);

        fetch(url)
            .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
            .then( r => r.json())
            .then( j => setSchema(j))
            .finally(() => setSchemaLoading(false))
            .catch(e => toast.error(`${url}: ${e}`));
    }

    function loadSectionsJson()
    {
        if (!props.apiEntryPoint)
        {
            toast.error("API entry point not set");
            return;
        }

        const url = props.apiEntryPoint; 

        setSectionsEndpointsLoading(true);

        fetch(url)
            .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
            .then( r => r.json())
            .then( j => setSectionsEndpoints(j))
            .finally(() => setSectionsEndpointsLoading(false))
            .catch(e => toast.error(`${url}: ${e}`));
    }

    function handleSections()
    {    
        setSections(sectionEndpoints.map(endpoint => new XraySection(endpoint)));
    }

    function loadSection(i: number)
    {   
        if (i < 0 || i >= sections.length)
        {
            toast.error(`Invalid section index ${i}`);
            return;
        }

        const url = sections[i].endpoint.url;

        setSections(draft => { draft[i].loading = true; });

        fetch(url)
            .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
            .then( r => r.json())
            .then( j => setSections(draft => { draft[i].section = j; }))
            .finally(() => setSections(draft => { draft[i].loading = false; }))
            .catch(e => toast.error(`${url}: ${e}`));
    }

    function validateSection(i: number)
    {
        if (i < 0 || i >= sections.length)
        {
            toast.error(`Invalid section index ${i}`);
            return;
        }

        if (sections[i].section == null)
        {
            toast.error(`Section ${i} not loaded`);
            return;
        }

        const errors = Validate(sections[i].endpoint.url, sections[i].section as Section, schema);

        setSections(draft => { draft[i].isValid = errors == null; });
    }

    function loadTemplate(i: number)
    {
        const endpoint = `${resourcesUrl}/components/${sections[i].section?.title}.jsx`;
        
        setSections(draft => { draft[i].templateLoading = true; });

        fetch(endpoint)
            .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
            .then( r => r.text())
            .then( j => setSections(draft => { draft[i].template = j;}) )
            .finally(() => setSections(draft => { draft[i].templateLoading = false; }))
            .catch(e => toast.error(`${endpoint}: ${e}`));
    }   

    function render(i: number)
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
            <h1>X-ray</h1>

            <p className="text-center mb-4">Revealing the invisible</p>

            <p>Explore API resume using X-ray view. It enables loading resume data directly from an API, loading of JSX templates, and rendering the resume by applying these templates to the data.</p>

            {/* Step 0 */}
            { 
                <div className={'overflow-hidden transition-all duration-500 ' + (started ? "opacity-0 max-h-0" : "opacity-100 max-h-96")}>
                    <div className='flex justify-center mt-4'>
                        <button className='w-28 bg-yellow-500 hover:bg-yellow-700' onClick={start}>Start</button>
                    </div>
                </div>
            }

            {/* Step 1 */}
            { started &&
                <div className={'overflow-hidden transition-all duration-500 ' + (schema ? "opacity-0 max-h-0" : "opacity-100 max-h-96")}>
                    <p className={sectionEndpoints.length == 0 ? "font-bold mt-4" : "mt-4"}>1. Get Resume API schema</p>
                    <div className='flex flex-row justify-between gap-1 pl-4'>
                        <div className='overflow-hidden'>
                            <p>Let&apos;s start with fetching the API schema. We will use it to validate API responses.</p>
                        </div>
                        <div className='w-28'>
                            <button disabled={sectionEndpoints.length > 0 || sectionEndpointsLoading} className='w-28 inline-flex items-center justify-center' onClick={loadSchema}><Loader show={schemaLoading}/>Fetch</button>
                        </div>
                    </div>
                </div>
            }   

            {/* Step 2 */}
            { schema &&
                <div className={'overflow-hidden transition-all duration-500 ' + (sectionEndpoints.length > 0 ? "opacity-0 max-h-0" : "opacity-100 max-h-96")}>
                    <p className={sectionEndpoints.length == 0 ? "font-bold mt-4" : "mt-4"}>2. Get resume sections</p>
                    <div className='flex flex-row justify-between gap-1 pl-4'>
                        <div className='overflow-hidden'>
                            <p>Let&apos;s start with fetching the index of resume section endpoints</p>                    
                        </div>
                        <div className='w-28'>
                            <button disabled={sectionEndpoints.length > 0 || sectionEndpointsLoading} className='w-28 inline-flex items-center justify-center' onClick={loadSectionsJson}><Loader show={sectionEndpointsLoading}/>Fetch</button>
                        </div>
                    </div>
                </div>
            }   

            {/* Step 3 */}
            { sectionEndpoints.length > 0 &&
                <div className={'overflow-hidden transition-all duration-500 ' + (sections.length > 0 ? "opacity-0 max-h-0" : "opacity-100 max-h-[60rem]")}>
                    <p className={sections.length == 0 ? 'font-bold mt-4' : 'mt-4'}>3. Handle each resume section</p>
                    <div className='flex flex-row justify-between gap-1 pl-4'>
                       <div className='overflow-auto'>
                            <p>Now when we have section endpoints, let&apos;s fetch the data and templates for each section.</p> 
                        </div>
                        <div className='w-28'>
                            <button disabled={sections.length > 0} className='w-28' onClick={handleSections}>Proceed</button>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <span className='text-gray-500'> {props.apiEntryPoint} </span>
                        <pre>{JSON.stringify(sectionEndpoints, null, 2)}</pre> 
                    </div>
                </div>
            }

            { sections.map((s, i) => (

                <div key={i}>

                    {/* Section steps */}
                    <div className={'overflow-hidden transition-all delay-300 duration-500 ' + (s.rendered ? " opacity-0 max-h-0" : "opacity-100 max-h-96")}>

                        <p className='mt-4'>{i+4}. Handle <b>{s.endpoint.url.substring(s.endpoint.url.lastIndexOf("/") + 1).toUpperCase()}</b> section</p>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={              !s.section  ? 'font-bold' : ''}>Fetch section data</p>
                            </div>
                            <div className='w-28'>                                            
                                <button disabled={s.section != null || s.loading} className= 'w-28 inline-flex items-center justify-center' onClick={() => loadSection(i)}><Loader show={s.loading}/>Fetch</button> 
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <span className={s.section && !s.isValid ? 'font-bold' : ''}>Validate data against schema</span>
                            </div>
                            <div className='w-28'>                                            
                                {s.section && <button disabled={s.isValid != null} className= 'w-28 inline-flex items-center justify-center' onClick={() => validateSection(i)}>{s.isValid && (s.isValid == true ? "✅" : "❌")} Validate</button> }
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-1 mt-1 pl-4'>
                            <div className='overflow-hidden'>
                                <p className={s.isValid &&  !s.template ? 'font-bold' : ''}>Fetch section template</p>   
                            </div>  
                            <div className='w-28'>                   
                                {s.isValid && <button disabled={s.template != null || s.templateLoading} className='w-28 inline-flex items-center justify-center' onClick={() => loadTemplate(i)}><Loader show={s.templateLoading}/>Fetch</button>}
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
                            <span className='text-gray-500'> {s.endpoint.url} </span>
                            <pre>{JSON.stringify(s.section, null, 2)}</pre>
                        </div>

                        <div className={(s.rendered ? "card-left" : s.template ? "card-main" : "card-right") }>
                            <span className='text-gray-500'>{`${resourcesUrl}/components/${s.section?.title}.jsx`}</span>
                            <pre>{s.template}</pre>
                        </div>

                        <div className={(s.rendered ? "card-main" : "card-right")}>
                            {s.rendered && s.section && Render(s.section)}
                        </div>
                    </div>
                </div>
            ))}

            {/* Final step */}
            { sections.length > 0 && sections.every(s => s.rendered) &&

                <div className='mt-4'>

                    <p className='font-bold'>{3 + sections.length + 1}. That&apos;s all folks!</p>

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