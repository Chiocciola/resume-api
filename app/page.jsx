"use client"

import styles from './page.module.css'

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
        <main className={styles.main}>
            
            <h1>{resume.name}</h1>
            
            <div className={styles.title}>{resume.title}</div>
           
            <div className={styles.contactList}>
                <ul>
                    <li><a href={`http://maps.apple.com/?q=${resume.location}`}>📍 {resume.location}</a></li>
                    <li><a href={`tel:${resume.phone}`}>📱 {resume.phone}</a></li>
                    <li><a href={`mailto:${resume.email}`}>💌 {resume.email}</a></li>
                    <li><a href={resume.homePage}><Image src="/linkedin.png" width="14" height="14"/> {resume.homePage.replace("https:\/\/www." ,"")}</a></li>
                </ul>
            </div>

            { resume.sections['Summary'] && (
                <>
                    <h2>Summary</h2>
                    <div className={styles.section}>
                        {resume.sections['Summary'].content}
                    </div>
                </>
            )}

            { resume.sections['Skills'] && (
                <>
                    <h2>Skills</h2>

                    <div className={styles.section}>
                        <ul>
                        {resume.sections['Skills'].content.map(group => (
                            <li key={group.kind}><b>{group.kind}:</b> {group.skills.join(", ")}</li>
                        ))}
                        </ul>
                    </div>
                </>
            )}

            { resume.sections['Experience'] && (
                <div className={styles.experience}>

                    <h2>Experience</h2>

                    {resume.sections['Experience'].content.map((company) => (
                        <div key={company.company} className={styles.experience_company}>

                            <img className={styles.experience_company_logo} src={company.logo.url}/>

                            <div className={styles.experience_company_content}>

                                {Object.keys(company.positions).length > 1 && (<h3>{company.company}</h3>)}

                                {company.positions.map((exp) => (
                                    <div key={exp.title} className={styles.experience_position_box}>

                                        <h4>{exp.title}</h4>

                                        {Object.keys(company.positions).length == 1 && (<p>{company.company}</p>)}
                                        <div className={styles.grey}>{exp.startDate} &ndash; {exp.endDate ?? 'Present'}</div>
                                        <div className={styles.grey}>{exp.location}</div>

                                        <p className={styles.mt_0_5}>{exp.summary}</p>

                                        <ul className={styles.mt_0_5}>
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
                <div className={styles.experience}>

                    <h2>Education</h2>

                    {resume.sections['Education'].content.map(edu => (
                        <div key={edu.institution} className={styles.experience_company}>
                            <img className={styles.experience_company_logo} src={edu.logo.url}/>
                            <div className={styles.experience_company_content}>

                                <h3>{edu.institution}</h3>
                                <p>{edu.degree}</p>
                                <div className={styles.grey}>{edu.startDate} &ndash; {edu.endDate}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};