import Image from "next/image";

export default function General({title, content})
{
    return (
        <div key={title}>
            <h1 className="text-center text-3xl">{content.name}</h1>
                    
            <p className="text-center mb-4 text-xl">{content.title}</p>
        
            <ul className="m-0 text-center">
                <li className="inline-block whitespace-nowrap mx-2"><a href={`http://maps.apple.com/?q=${content.location}`}>📍 {content.location}</a></li>
                <li className="inline-block whitespace-nowrap mx-2"><a href={`tel:${content.phone}`}>📱 {content.phone}</a></li>
                <li className="inline-block whitespace-nowrap mx-2"><a href={`mailto:${content.email}`}>✉️ {content.email}</a></li>
                <li className="inline-block whitespace-nowrap mx-2"><a href={content.linkedin.url}><Image src="/linkedin.png" className="align-middle inline mb-1" alt="LinkedIn" width="14" height="14"/> {content.linkedin.url.replace("https:\/\/www." ,"")}</a></li>
            </ul>

            { content.summary && (
                <>
                    <h2>Summary</h2>
                    
                    <p className="ml-4">{content.summary}</p>
                </>
            )}
        </div>
    );
}