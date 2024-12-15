import Image from "next/image";
import { Fragment } from "react";

export default function General({title, content})
{
    return (
        <Fragment key={title}>
            <section>
                <h1 className="text-center">{content.name}</h1>
                        
                <p className="text-center">{content.title}</p>
            
                <ul className="m-0 p-0 text-center">
                        <li className="inline-block whitespace-nowrap mx-2"><a href={`http://maps.apple.com/?q=${content.location}`}>📍 {content.location}</a></li>
                    {content.phone && 
                        <li className="inline-block whitespace-nowrap mx-2"><a href={`tel:${content.phone}`}>📱 {content.phone}</a></li>}
                    {content.mail && 
                        <li className="inline-block whitespace-nowrap mx-2"><a href={`mailto:${content.email}`}>✉️ {content.email}</a></li>}
                        <li className="inline-block whitespace-nowrap mx-2"><a href={content.linkedin.url}><Image src="/linkedin.png" className="align-middle inline mb-1" alt="LinkedIn" width="14" height="14"/> LinkedIn</a></li>
                </ul>
            </section>
        
            <section>
                <h2>Summary</h2>
                <div className="ml-4">
                    <p>{content.summary}</p>
                </div>
            </section>
        </Fragment>
    );
}