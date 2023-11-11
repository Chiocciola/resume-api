"use client"

import { use, useEffect, useState } from 'react';


const ResumePage = () => {

    const [apiEntryPoint, setApiEntryPoint] = useState("/resume");

    const [indexData, setIndexData] = useState(null);
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

    useEffect(() => {
        setApiEntryPoint(window.location.origin + '/resume');
    }, []);

    const endpoints = [
        {
            name: "index",
            description: 'list of available endpoints',
            endpoint: '/',
            data: indexData,
            setData: setIndexData,
        },
        {
            name: "general",
            description: 'general resume information such as name, title, and contact details.',
            endpoint: '/general',
            data: generalData,
            setData: setGeneralData,
        },
        {
            name: 'sections',
            endpoint: '/sections',
            data: sectionsData,
            setData: setSectionsData,
        },
        {
            name: 'experience',
            endpoint: '/sections/experience',
            data: experienceData,
            setData: setExperienceData,
        },
        {
            name: 'education',
            endpoint: '/sections/education',
            data: educationData,
            setData: setEducationData,
        },
        {
            name: 'skills',
            endpoint: '/sections/skills',
            data: skillsData,
            setData: setSkillsData,
        },
    ];            

    return (
        <div style={{fontFamily: "monospace", margin: "auto", maxWidth: "800px"}}>
            <h1>Resume API</h1>
            <p>The Resume API allows developers to access resume content, providing detailed information about an individual&apos;s professional and educational background. This API offers endpoints for retrieving general information, such as name and contact details, as well as detailed sections for experience and education.</p>

            <h2>Entry Point</h2>
            <p><a href={apiEntryPoint}>{apiEntryPoint}</a></p>

            <h2>Endpoints</h2>

                {endpoints.map(({ name, description, endpoint, data, setData }) => (
                    <>
                        <p key={name}><strong>{name}: </strong>{description}</p>

                        <table key={endpoint} style={{borderCollapse: "collapse", border: "1px solid #082044", width: "100%"}}>
                            <tbody>
                                <tr style={{color: "white", backgroundColor: "#082044",}}>
                                    <td><p style={{margin: "0.5rem 1rem"}}>{endpoint}</p></td>
                                    <td style={{width: "90px"}}>
                                        {!data && (<button style={{width: "80px", border: "none", color: "white", backgroundColor: "orangered"}} onClick={() => fetchData(apiEntryPoint + endpoint, setData)}>{loading ? "Loading..." : "GET"}</button>)}
                                        { data && (<button style={{width: "80px", border: "none", color: "white", backgroundColor: "orangered"}} onClick={() => clearData(setData)}>CLEAR</button>)}
                                    </td>                                             
                                </tr>

                                {data && (
                                <tr>
                                    <td colSpan="2">
                                        <pre style={{whiteSpace: "pre-wrap"}}>
                                            {JSON.stringify(data, null, 2)}
                                        </pre>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </>
                ))}
        </div>
    );
};

export default ResumePage;
