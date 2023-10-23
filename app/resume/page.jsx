"use client"

import styles from '../page.module.css'

import { useEffect, useState } from 'react';

async function getResume()
{
    const resume = await fetch('/api/resume').then(r => r.json());
   
    const urls = resume.sections;
    const loading = 
        urls.map(async url => {
            const r = await fetch(url);
            return await r.json();
        });

    const sections = [];

    for  (const section of loading)
    {
        try
        {
            sections.push(await section);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    resume.sections = Object.fromEntries(sections.map(s => [s.title,  s.content]));

    return resume;
}

export default function Resume() {

    var [resume, setResume] = useState(null);

    useEffect(
        () => {getResume().then(setResume);});

    if (!resume)
        return (<div>Loading...</div>);

    return (
        <main className={styles.main}>
            
            <h1>{resume.name}</h1>
            <h2>{resume.title}</h2>
           
            <div className={styles.flexlist}>
                <ul>
                    <li>📍 {resume.location}</li>
                    <li><a href={`tel:${resume.phone}`}>📱 {resume.phone}</a></li>
                    <li><a href={`mailto:${resume.email}`}>💌 {resume.email}</a></li>
                    <li><a href={resume.homePage}>🔗 {resume.homePage}</a></li>
                </ul>
            </div>

            { resume.sections['Summary'] && (
                <>
                    <h3>Summary</h3>
                    <p>{resume.sections['Summary']}</p>
                </>
            )}

            { resume.sections['Skills'] && (
                <>
                    <h3>Skills</h3>
                    <p>
                    <ul>
                    {resume.sections['Skills'].map(group => (
                        <li key={group.kind}><b>{group.kind}:</b> {group.skills.join(", ")}</li>
                    ))}
                    </ul>
                    </p>
                </>
            )}

            { resume.sections['Experience'] && (
                <>
                    <h3>Experience</h3>
                    {resume.sections['Experience'].map((exp, expIndex) => (
                        <div key={expIndex}>
                            <h4>{exp.title}</h4>
                            <div>{exp.company}</div>
                            <div><i>{exp.startDate} - {exp.endDate ?? 'Present'}</i></div>
                            <p>
                            <ul>
                                {exp.highlights.map((highlight, hightlightIndex) => (<li key={expIndex*100 + hightlightIndex}>{highlight}</li>))}
                            </ul>
                            </p>
                        </div>
                    ))}
                </>
            )}
            {/* <h3>Education</h3>
            {resumeData.education.map(edu => (
                <div key={edu.institution}>
                    <h4>{edu.institution}</h4>
                    <p>{edu.degree}</p>
                    <p>{edu.startDate} - {edu.endDate}</p>
                </div>
            ))} */}
        </main>
    );
};