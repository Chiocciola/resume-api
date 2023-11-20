export default function Error({title, content})
{
    return (
        <div key={title}>
            <h2>{title}</h2>
            <span className="text-2xl">❌</span> {content}
        </div>
    );
}