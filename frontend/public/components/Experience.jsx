import Markdown from "@/components/Markdown";

export default function Experience({title, content})
{
  return (
    <section key={title}>
      <h2>Experience</h2>

      {content.map(company =>
          <div key={company.company} className="flex flex-row gap-4 mt-4">
            
            <img className="object-contain object-top w-12 h-12" src={company.logo.url}/> 

            <div className="flex flex-col gap-2">

              {company.positions.length > 1 &&
                <h3>{company.company}</h3>
              }

              {company.positions.map((exp) => 
                <>
                  <div>
                    <h4>{exp.title}</h4>

                    {company.positions.length == 1 &&
                      <p>{company.company}</p>
                    }

                    <p className="leading-tight text-gray-500">{exp.startDate} &ndash; {exp.endDate ?? 'Present'}</p>
                    <p className="leading-tight text-gray-500">{exp.location}</p>
                  </div>
                  
                  {exp.summary &&
                    <p>{exp.summary}</p>
                  }

                  {exp.highlights &&
                    <ul>
                        {exp.highlights.map((highlight, hightlightIndex) =>
                            <li key={hightlightIndex}><Markdown>{highlight}</Markdown></li>
                        )}
                    </ul>
                  }
                </>
              )}
            </div>
          </div>
      )}
    </section>
  );
}