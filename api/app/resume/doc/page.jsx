"use client"

import { useEffect, useState } from 'react';

// export const metadata = {
//     title: 'Resume API',
//     description: 'Documentation for the Resume API',
// }

export default function ResumePag() {

    const [apiEntryPoint, setApiEntryPoint] = useState("/resume");

    const [indexData, setIndexlData] = useState(null);
    const [generalData, setGeneralData] = useState(null);
    const [experienceData, setExperienceData] = useState(null);
    const [educationData, setEducationData] = useState(null);
    const [skillsData, setSkillsData] = useState(null);
    const [languagesData, setLanguagesData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setApiEntryPoint(window.location.origin + '/resume');
    }, []);

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
            description: 'List of all section endpoints',
            endpoint: '/',
            data: indexData,
            setData: setIndexlData,
        },
        {
            description: 'General resume information such as name, title, and contact details',
            endpoint: '/general',
            data: generalData,
            setData: setGeneralData,
        },
        {
            description: "Hard and soft skills, technologies and programming languages",
            endpoint: '/skills',
            data: skillsData,
            setData: setSkillsData,
        },
        {
            description: "Information about professional background",
            endpoint: '/experience',
            data: experienceData,
            setData: setExperienceData,
        },
        {
            description: "Information about educational background",
            endpoint: '/education',
            data: educationData,
            setData: setEducationData,
        },
        {
            description: "Information about spoken languages",
            endpoint: '/languages',
            data: languagesData,
            setData: setLanguagesData,
        },
    ];            

    return (
        <article style={{fontFamily: "monospace", margin: "auto", maxWidth: "800px"}}>
            <h1>Resume API</h1>
            <p>The Resume API allows developers to access resume content, providing detailed information about professional and educational background. This API offers endpoints for retrieving general information, such as name and contact details, as well as detailed sections for experience and education.</p>

            <h2>Specification</h2>

            <p>Detailed specification is available on <a href="https://app.swaggerhub.com/apis/Chiocciola/Resume/1.0.0">SwaggerHub</a></p>

            {/* <h2>Access API using Postman</h2>
            <p>Alternative way to test the API is to use Postman. You can access the collection of requests <a href="https://www.postman.com/chiocciola/workspace/public/collection/27924363-81530057-d893-4d9c-ba3b-b6d6532ddf1d?action=share&creator=27924363">here</a>.</p> */}

            <h2>Entry Point</h2> 
            
            <p>API entry point is located at <a href={apiEntryPoint}>{apiEntryPoint}</a></p>
            <p> Don&apos;t forget to add  it to the beginning of each endpoint, if you are using CURL or Postman to test the API.</p>

            <h2>Endpoints</h2>

                <p>Each endpoint is available as a GET request. The response is a JSON object.</p>
                <p>Press <span style={{padding: "0 0.5rem", color: "white", backgroundColor: "#1391ff"}}>GET</span> button to retrieve the data directly from the browser.</p>

                {endpoints.map(({description, endpoint, data, setData }) => (
                    <div key={endpoint} style={{margin: "1rem 0"}}>

                        <div style={{border: "1px solid #61affe",  borderRadius: "4px", backgroundColor: "#ecf6ff", width: "100%"}}>

                            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.5rem", borderBottom: data ? "1px solid #61affe": "none"}}>

                                <div style={{ display: "flex", overflow: "hidden", gap: "0.5rem"}}>

                                    <button style={{flexShrink: "0", width: "80px", padding: "6px 0", border: "none", borderRadius: "3px", color: "white", backgroundColor: "#1391ff", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit"}}
                                            onClick={() => data ? clearData(setData) : fetchData(apiEntryPoint + endpoint, setData)}>
                                        {loading ? "Loading..." : data ? "CLEAR" : "GET"}
                                    </button>

                                    <div style={{textOverflow: "ellipsis", margin: "auto 0", fontSize: "1rem", fontWeight: "bold"}}>{endpoint}</div>
                                </div>

                                <div style={{overflow: "hidden", color: "gray"}}>
                                    {description}
                                </div>
                            </div>

                            {data && (<pre style={{overflow: "hidden", margin: "0.5rem", padding: "0.5rem", borderRadius: "3px", backgroundColor: "#333", color: "white", whiteSpace: "pre-wrap"}}>{JSON.stringify(data, null, 2)}</pre>)}
                        </div>
                    </div>
                ))}
        </article>
    );
};