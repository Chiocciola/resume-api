export default function Experience({content})
{
    return (
        <div key="Experience">
            <h2>Experience</h2>

            {content.map((company) => (
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
        </div>
    );
}