"use client"

import { useState } from 'react';

const ResumePage = () => {
    const [generalData, setGeneralData] = useState(null);
    const [sectionsData, setSectionsData] = useState(null);
    const [experienceData, setExperienceData] = useState(null);
    const [educationData, setEducationData] = useState(null);
    const [skillsData, setSkillsData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (endpoint, setData) => {
        setLoading(true);
        fetch(endpoint)
            .then(r => r.json())
            .then(j => setData(j))
            .finally(() => setLoading(false));
    };

    const clearData = (setData) => {
        setData(null);
    };

    const endpoints = [
        {
            name: 'general',
            label: '/resume/general',
            data: generalData,
            setData: setGeneralData,
        },
        {
            name: 'sections',
            label: '/resume/sections',
            data: sectionsData,
            setData: setSectionsData,
        },
        {
            name: 'experience',
            label: '/resume/sections/experience',
            data: experienceData,
            setData: setExperienceData,
        },
        {
            name: 'education',
            label: '/resume/sections/education',
            data: educationData,
            setData: setEducationData,
        },
        {
            name: 'skills',
            label: '/resume/sections/skills',
            data: skillsData,
            setData: setSkillsData,
        },
    ];            

    return (
        <>
            <h1>Resume API</h1>
            <p>This is a REST API for accessing resume data.</p>

            <h2>Endpoints</h2>
            <table style={{width: "600px"}}>
                <tbody>
                {endpoints.map(({ name, label, data, setData }) => (
                    <>
                        <tr key={name}>
                            <td><h3>{label}</h3></td>
                            <td style={{width: "60px"}}>
                                {!data && (<button style={{width: "100%"}} onClick={() => fetchData(label, setData)}>GET</button>)}
                                {data && (<button style={{width: "100%"}} onClick={() => clearData(setData)}>Clear</button>)}
                            </td>                                             
                        </tr>

                        {data && (
                        <tr key={label}>
                            <td colSpan="2">
                                <pre style={{whiteSpace: "pre-wrap"}}>
                                    {JSON.stringify(data, null, 2)}
                                </pre>
                            </td>
                        </tr>)}
                    </>
                ))}
                </tbody>
            </table>
        </>
    );


};

export default ResumePage;
