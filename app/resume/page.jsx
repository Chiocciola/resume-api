"use client"

import styles from '../page.module.css'

import { useEffect, useState, useRef } from 'react';

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
            // console.log(e);
        }
    }

    resume.sections = Object.fromEntries(sections.map(s => [s.title,  s.content]));

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
                getResume().then(setResume).then(() => loading.current = false);
            }
        }, []);

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
                    <div className={styles.section}>
                        {resume.sections['Summary']}
                    </div>
                </>
            )}

            { resume.sections['Skills'] && (
                <>
                    <h3>Skills</h3>
                    <div className={styles.section}>
                        <ul>
                        {resume.sections['Skills'].map(group => (
                            <li key={group.kind}><b>{group.kind}:</b> {group.skills.join(", ")}</li>
                        ))}
                        </ul>
                    </div>
                </>
            )}

            { resume.sections['Experience'] && (
                <>
                    <h3>Experience</h3>

                    <div className={styles.experience}>

                        {resume.sections['Experience'].map((company, companyIndex) => (
                            <>
                            <div className={styles.experience_company_logo}> </div>

                            <div>
                                {company.company}

                                {company.positions.map((exp, expIndex) => (
                                <div key={expIndex} className={styles.experience_position_box}>
                                    <span key={expIndex} className={styles.experience_position_path_node}></span>

                                    <div key={expIndex} className={(expIndex < company.positions.length - 1) ? styles.experience_position_path: ""}>
                                        <h4>{exp.title}</h4>
                                        <div><i>{exp.startDate} - {exp.endDate ?? 'Present'}</i></div>
                                        <ul>
                                            {exp.highlights.map((highlight, hightlightIndex) => (<li key={expIndex*100 + hightlightIndex}>{highlight}</li>))}
                                        </ul>
                                    </div>
                                </div>
                                ))}
                            </div>
                            </>
                        ))}
                    </div>
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