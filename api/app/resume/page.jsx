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
        <div style={{fontFamily: "monospace"}}>
            <h1>Resume API</h1>
            <p>This is a REST API for accessing resume data.</p>

            <h2>Endpoints</h2>
            <table style={{borderCollapse: "collapse", border: "1px solid #082044", maxWidth: "600px", width: "100%"}}>
                <tbody>
                {endpoints.map(({ name, label, data, setData }) => (
                    <>
                        <tr key={name} style={{margin: "1rem", color: "white", backgroundColor: "#082044"}}>
                            <td><p style={{margin: "0.5rem 1rem"}}>{label}</p></td>
                            <td style={{margin: "1rem", width: "90px"}}>
                                {!data && (<button style={{width: "80px", border: "none", color: "white", backgroundColor: "orangered"}} onClick={() => fetchData(label, setData)}>{loading ? "Loading..." : "GET"}</button>)}
                                { data && (<button style={{width: "80px", border: "none", color: "white", backgroundColor: "orangered"}} onClick={() => clearData(setData)}>CLEAR</button>)}
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
        </div>
    );


};

export default ResumePage;
