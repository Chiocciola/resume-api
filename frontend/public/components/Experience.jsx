import { micromark } from "micromark"

function renderHTML(markdown) {

  var html = micromark(markdown);

  return {__html: html};
}

export default function Experience({title, content})
{
  return (
    <section key={title}>
      <h2>Experience</h2>

      {content.map(company =>
          <div key={company.company} className="flex flex-row gap-4 mt-4">

            <img className="object-contain object-top w-12 h-12" src={company.logo.url}/>

            <div>
              {company.positions.length > 1 && (<h3>{company.company}</h3>)}

              {company.positions.map((exp) => 
                <div key={exp.title} className="mt-2 only:mt-0">

                  <h4>{exp.title}</h4>

                  {company.positions.length == 1 &&
                    <p>{company.company}</p>
                  }

                    <p className="leading-tight text-gray-500">{exp.startDate} &ndash; {exp.endDate ?? 'Present'}</p>
                    <p className="leading-tight text-gray-500">{exp.location}</p>

                  {exp.summary &&
                    <p className="mt-2">{exp.summary}</p>
                  }

                  {exp.highlights &&
                    <ul className="mt-2">
                        {exp.highlights.map((highlight, hightlightIndex) =>
                            <li key={hightlightIndex} dangerouslySetInnerHTML={renderHTML(highlight)} />
                        )}
                    </ul>
                  }
                </div>
              )}
            </div>
          </div>
      )}
    </section>
  );
}