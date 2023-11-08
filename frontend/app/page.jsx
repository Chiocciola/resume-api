import Image from 'next/image'

export const dynamic = 'force-dynamic';

async function getResume()
{
    // await new Promise(r => setTimeout(r, 2000));
    // console.log("Loading resume from RESTful API");

    const host = process.env.API_URL;
    console.log("Loading resume from RESTful API at " + host);

    const loadingResume = fetch(host + '/').then(r => r.json());
    
    const sectionsUrl = await fetch(host + '/sections').then(r => r.json());
    const loadingSections = sectionsUrl.map(s => fetch(s.url).then(r => r.json()));

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
            console.log(e);
        }
    }

    const resume = await loadingResume;
    resume.sections = Object.fromEntries(sections.map(s => [s.title,  s]));

    return resume;
}

export default async function Resume() {

    var resume = null;

    try
    {
        resume = await getResume();
    }
    catch (e)
    {
        console.log(e);
        return (<p>e.message</p>);
    }

    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
            
            <h1 className="text-center text-3xl">{resume.name}</h1>
            
            <p className="text-center mb-4 text-xl">{resume.title}</p>
           
            <ul className="m-0 text-center">
                <li className="inline-block whitespace-nowrap mx-2"><a href={`http://maps.apple.com/?q=${resume.location}`}>📍 {resume.location}</a></li>
                <li className="inline-block whitespace-nowrap mx-2"><a href={`tel:${resume.phone}`}>📱 {resume.phone}</a></li>
                <li className="inline-block whitespace-nowrap mx-2"><a href={`mailto:${resume.email}`}>💌 {resume.email}</a></li>
                <li className="inline-block whitespace-nowrap mx-2"><a href={resume.linkedin.url}><Image src="/linkedin.png" className="align-middle inline mb-1" alt="LinkedIn" width="14" height="14"/> {resume.linkedin.url.replace("https:\/\/www." ,"")}</a></li>
            </ul>

            { resume.summary && (
                <>
                    <h2 className="text-2xl mt-3">Summary</h2>
                    
                    <p className="ml-4">{resume.summary}</p>
                </>
            )}

            { resume.sections['Skills'] && (
                <>
                    <h2 className="text-2xl mt-3">Skills</h2>

                    <ul className='ml-4 list-disc'>
                        {resume.sections['Skills'].content.map(group => (
                            <li key={group.kind}><strong>{group.kind}:</strong> {group.skills.join(", ")}</li>
                        ))}
                    </ul>
                </>
            )}

            { resume.sections['Experience'] && (
                <>
                    <h2 className="text-2xl mt-3">Experience</h2>

                    {resume.sections['Experience'].content.map((company) => (
                        <div key={company.company} className="flex flex-row mt-4">

                            <img className="w-12 h-12" src={company.logo.url}/>

                            <div className="ml-4">

                                {company.positions.length > 1 && (<h3 className="text-xl font-medium">{company.company}</h3>)}

                                {company.positions.map((exp) => (
                                    <div key={exp.title} className="mt-2 only:mt-0">

                                        <h4 className="text-xl font-medium">{exp.title}</h4>

                                        {company.positions.length == 1 && (
                                            <p>{company.company}</p>)}

                                            <p className="leading-tight text-gray-500">{exp.startDate} &ndash; {exp.endDate ?? 'Present'}</p>
                                            <p className="leading-tight text-gray-500">{exp.location}</p>

                                        {exp.summary && (
                                            <p className="mt-2">{exp.summary}</p>)}

                                        {exp.highlights && (
                                            <ul className="mt-2 list-disc">
                                                {exp.highlights.map((highlight, hightlightIndex) => (
                                                    <li key={hightlightIndex}>{highlight}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}

            {resume.sections['Education'] && (
                <>
                    <h2 className="text-2xl mt-3">Education</h2>

                    {resume.sections['Education'].content.map(edu => (
                        <div key={edu.institution} className="flex flex-row mt-3">

                            <img className="w-12 h-12" src={edu.logo.url}/>

                            <div className="ml-4">
                                <h3 className="text-xl font-medium">{edu.institution}</h3>
                                <p className="leading-tight">{edu.degree}</p>
                                <p className="leading-tight text-gray-500">{edu.startDate} &ndash; {edu.endDate}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </main>
    );
};