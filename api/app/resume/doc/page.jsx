"use client"

import { useEffect, useState } from 'react';

// export const metadata = {
//     title: 'Resume API',
//     description: 'Documentation for the Resume API',
// }

export default function ResumePag() {

    const [apiEntryPoint, setApiEntryPoint] = useState("/resume");

    const [generalData, setGeneralData] = useState(null);
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
            description: 'general resume information such as name, title, and contact details',
            endpoint: '/general',
            data: generalData,
            setData: setGeneralData,
        },
        {
            description: "detailed information about professional background",
            endpoint: '/sections/experience',
            data: experienceData,
            setData: setExperienceData,
        },
        {
            endpoint: '/sections/education',
            data: educationData,
            setData: setEducationData,
        },
        {
            endpoint: '/sections/skills',
            data: skillsData,
            setData: setSkillsData,
        },
        {
            endpoint: '/sections/languages',
            data: skillsData,
            setData: setSkillsData,
        },
    ];            

    return (
        <article style={{fontFamily: "monospace", margin: "auto", maxWidth: "800px"}}>
            <h1>Resume API</h1>
            <p>The Resume API allows developers to access resume content, providing detailed information about professional and educational background. This API offers endpoints for retrieving general information, such as name and contact details, as well as detailed sections for experience and education.</p>

            <h2>Specification</h2>

            <p>Detailed specification is available on <a href="https://app.swaggerhub.com/apis/Chiocciola/Resume/1.0.0">SwaggerHub</a></p>

            <h2>Entry Point</h2>
            <p><a href={apiEntryPoint}>{apiEntryPoint}</a></p>

            <h2>Endpoints</h2>

                <p>Each endpoint is available as a GET request. The response is a JSON object.</p>
                <p>Press <span style={{padding: "0 0.5rem", color: "white", backgroundColor: "orangered"}}>GET</span> button to retrieve the data directly from the browser.</p>

                <ol style={{listStylePosition: "inside", padding: "0" }}>

                {endpoints.map(({description, endpoint, data, setData }) => (
                    <li key={endpoint}>
                        <h3 style={{display: "inline"}}>{endpoint}</h3>
                        <p style={{display: "inline"}}> {description}</p>

                        <div style={{border: "1px solid #082044", width: "calc(100% - 1.5rem)", margin: "0.5rem 0 1rem 1.5rem"}}>

                            <div style={{display: "flex", justifyContent: "space-between", padding: "1rem",color: "white", backgroundColor: "#082044",}}>
                                <span>{apiEntryPoint + endpoint}</span>
                                <button
                                    style={{width: "80px", border: "none", color: "white", backgroundColor: "orangered"}}
                                    onClick={() => data ? clearData(setData) : fetchData(apiEntryPoint + endpoint, setData)}>
                                        {loading ? "Loading..." : data ? "CLEAR" :"GET"}
                                </button>
                            </div>

                            {data && (<pre style={{margin: "1rem", whiteSpace: "pre-wrap"}}>{JSON.stringify(data, null, 2)}</pre>)}
                        </div>
                    </li>
                ))}
                </ol>
        </article>
    );
};