"use client";

import { useState, useEffect } from 'react';

export default function Resume() {

    const [resumeData, setResumeData] = useState(null);

    const [experienceData, setExperienceData] = useState(null);


    useEffect(() => {
        fetch('/api/resume')
            .then(res => res.json())
            .then(data => setResumeData(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch('/api/resume/experience')
            .then(res => res.json())
            .then(data => setExperienceData(data))
            .catch(err => console.error(err));
    }, [resumeData]);

    if (!experienceData || !resumeData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{resumeData.name}</h1>
            <h2>{resumeData.title}</h2>
            <p>{resumeData.location} | {resumeData.phone} | {resumeData.email} | {resumeData.homePage}</p>

            {/* <ul>
                {resumeData.skills.map(skill => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul> */}
            <h3>Experience</h3>
            {experienceData.map(exp => (
                <div key={exp.company}>
                    <h4>{exp.company}</h4>
                    <p>{exp.position}</p>
                    <p>{exp.startDate} - {exp.endDate ?? 'Present'}</p>
                    <ul>
                        {exp.highlights.map(highlight => (<li>{highlight}</li>))}
                    </ul>
                </div>
            ))}
            {/* <h3>Education</h3>
            {resumeData.education.map(edu => (
                <div key={edu.institution}>
                    <h4>{edu.institution}</h4>
                    <p>{edu.degree}</p>
                    <p>{edu.startDate} - {edu.endDate}</p>
                </div>
            ))} */}
        </div>
    );
};