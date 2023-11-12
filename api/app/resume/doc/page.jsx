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
            description: "hard and soft skills, technologies and programming languages",
            endpoint: '/sections/skills',
            data: skillsData,
            setData: setSkillsData,
        },
        {
            description: "information about professional background",
            endpoint: '/sections/experience',
            data: experienceData,
            setData: setExperienceData,
        },
        {
            description: "information about educational background",
            endpoint: '/sections/education',
            data: educationData,
            setData: setEducationData,
        },
        {
            description: "information about spoken languages",
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
            
            <p>API entry point is located at <a href={apiEntryPoint}>{apiEntryPoint}</a></p>
            <p> Don&apos;t forget to add  it to the beginning of each endpoint, if you are using CURL or Postman to test the API.</p>

            <h2>Endpoints</h2>

                <p>Each endpoint is available as a GET request. The response is a JSON object.</p>
                <p>Press <span style={{padding: "0 0.5rem", color: "white", backgroundColor: "#1391ff"}}>GET</span> button to retrieve the data directly from the browser.</p>

                {endpoints.map(({description, endpoint, data, setData }) => (
                    <div key={endpoint} style={{margin: "1rem 0"}}>

                        <div style={{border: "1px solid #61affe",  borderRadius: "4px", backgroundColor: "#ecf6ff", width: "100%"}}>

                            <div style={{display: "flex", padding: "0.5rem", borderBottom: data ? "1px solid #61affe": "none"}}>

                            <button
                                    style={{flexShrink: "0", width: "80px", padding: "6px 0", margin: "0 0 auto 0", border: "none", borderRadius: "3px", color: "white", backgroundColor: "#1391ff", cursor: "pointer"}}
                                    onClick={() => data ? clearData(setData) : fetchData(apiEntryPoint + endpoint, setData)}>
                                        <strong>
                                            {loading ? "Loading..." : data ? "CLEAR" :"GET"}
                                        </strong>
                                </button>

                                <div style={{display: "inline-block", margin: "auto 0 auto 0.5rem"}}>
                                    <big><strong>{endpoint}</strong></big>
                                </div>

                                <div style={{display: "inline-block", margin: "auto 0 auto 0.5rem"}}>
                                    {description}
                                </div>

                            </div>

                            {data && (<pre style={{borderRadius: "3px", backgroundColor: "#333", color: "white", margin: "0.5rem", padding: "0.5rem",whiteSpace: "pre-wrap"}}>{JSON.stringify(data, null, 2)}</pre>)}
                        </div>
                    </div>
                ))}
        </article>
    );
};