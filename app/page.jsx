"use client"

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'

async function getResume()
{
    const resume = await fetch('/api/resume').then(r => r.json());
   
    const loadingSections = resume.sections.map(s => fetch(s.url).then(r => r.json()));

    // await new Promise(r => setTimeout(r, 1000));

    const sections = [];

    for (const loadingSection of loadingSections)
    {
        try
        {
            sections.push(await loadingSection);
        }
        catch (e)
        {
            // ignore errors
            // console.log(e);
        }
    }

    resume.sections = Object.fromEntries(sections.map(s => [s.title,  s]));

    return resume;
}

export default function Resume() {

    var [resume, setResume] = useState(null);

    const loading = useRef(false)

    useEffect(
        () => {
            if (!loading.current)
            {
                loading.current = true;
                getResume().then(setResume).finally(() => loading.current = false);
            }
        }, []);

    if (!resume)
        return (<div className="loader"/>);

    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
            
            <h1 className="text-center text-3xl">{resume.name}</h1>
            
            <p className="text-center mb-4 text-xl">{resume.title}</p>
           
            <ul className="m-0 text-center">
                <li className="relative inline-block whitespace-nowrap mx-2"><a href={`http://maps.apple.com/?q=${resume.location}`}>📍 {resume.location}</a></li>
                <li className="relative inline-block whitespace-nowrap mx-2"><a href={`tel:${resume.phone}`}>📱 {resume.phone}</a></li>
                <li className="relative inline-block whitespace-nowrap mx-2"><a href={`mailto:${resume.email}`}>💌 {resume.email}</a></li>
                <li className="relative inline-block whitespace-nowrap mx-2"><a href={resume.homePage}><Image className="align-middle inline" src="/linkedin.png" width="14" height="14"/> {resume.homePage.replace("https:\/\/www." ,"")}</a></li>
            </ul>

            { resume.sections['Summary'] && (
                <>
                    <h2 className="text-2xl mt-3">Summary</h2>
                    
                    <div className="ml-12">
                        {resume.sections['Summary'].content}
                    </div>
                </>
            )}

            { resume.sections['Skills'] && (
                <>
                    <h2 className="text-2xl mt-3">Skills</h2>

                    <ul className='ml-12 list-disc'>
                        {resume.sections['Skills'].content.map(group => (
                            <li key={group.kind}><b>{group.kind}:</b> {group.skills.join(", ")}</li>
                        ))}
                    </ul>
                </>
            )}

            { resume.sections['Experience'] && (
                <div>

                    <h2 className="text-2xl mt-4">Experience</h2>

                    {resume.sections['Experience'].content.map((company) => (
                        <div key={company.company} className="flex flex-row mt-4">

                            <img className="w-12 h-12" src={company.logo.url}/>

                            <div className="ml-4">

                                {Object.keys(company.positions).length > 1 && (<h3 className="text-xl font-medium">{company.company}</h3>)}

                                {company.positions.map((exp) => (
                                    <div key={exp.title} className="mt-2 ony:mt-0">

                                        <h4 className="text-xl font-medium">{exp.title}</h4>

                                        {Object.keys(company.positions).length == 1 && (<p>{company.company}</p>)}
                                        <div className="text-gray-500">{exp.startDate} &ndash; {exp.endDate ?? 'Present'}</div>
                                        <div className="text-gray-500">{exp.location}</div>

                                        <p className="mt-2">{exp.summary}</p>

                                        <ul className="mt-2 list-disc">
                                            {exp.highlights.map((highlight, hightlightIndex) => (
                                                <li key={hightlightIndex}>{highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {resume.sections['Education'] && (
                <div>

                    <h2 className="text-2xl mt-4">Education</h2>

                    {resume.sections['Education'].content.map(edu => (
                        <div key={edu.institution} className="flex flex-row mt-3">

                            <img className="w-12 h-12" src={edu.logo.url}/>

                            <div className="ml-4">
                                <h3 className="text-xl font-medium">{edu.institution}</h3>
                                <p>{edu.degree}</p>
                                <div className="text-gray-500">{edu.startDate} &ndash; {edu.endDate}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};