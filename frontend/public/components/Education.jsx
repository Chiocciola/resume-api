export default function Education({title, content})
{
  return(
    <section key={title}>
        <h2>Education</h2>

        {content.map(edu => (
            <div key={edu.institution} className="flex flex-row mt-3">

                <img className="object-contain object-top w-12 h-12" src={edu.logo.url}/>

                <div className="ml-4">
                    <h3>{edu.institution}</h3>
                    <p className="leading-tight">{edu.degree}</p>
                    <p className="leading-tight text-gray-500">{edu.startDate} &ndash; {edu.endDate}</p>
                    <p className="leading-tight text-gray-500">{edu.location}</p>
                </div>
            </div>
        ))}
    </section>
  );
}