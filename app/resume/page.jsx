"use client"

import styles from '../page.module.css'

import { useEffect, useState } from 'react';

async function getResume()
{
    const resume = await fetch('/api/resume').then(r => r.json());
   
    const urls = resume.sections;

    const loading = urls.map(url => fetch(url).then(r => r.json()));
    const sections = await Promise.all(loading);

    resume.sections = Object.fromEntries(sections.map(s => [s.section,  s.content]));

    return resume;
}

export default function Resume() {

    var [resume, setResume] = useState(null);

    useEffect(
        () => {getResume().then(setResume).catch(console.log);});

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
                    <ul>
                    {resume.sections['Skills'].map(group => (
                        <li key={group.kind}><b>{group.kind}:</b> {group.skills.join(", ")}</li>
                    ))}
                    </ul>
                </>
            )}

            { resume.sections['Experience'] && (
                <>
                    <h3>Experience</h3>
                    {resume.sections['Experience'].map((exp, expIndex) => (
                        <div key={expIndex}>
                            <h4>{exp.company}</h4>
                            <p>{exp.position}</p>
                            <p>{exp.startDate} - {exp.endDate ?? 'Present'}</p>
                            <ul>
                                {exp.highlights.map((highlight, hightlightIndex) => (<li key={expIndex*100 + hightlightIndex}>{highlight}</li>))}
                            </ul>
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