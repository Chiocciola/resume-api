export default function Error({title, content})
{
    return (
        <div key={title}>
            <h2 className="text-2xl mt-3">{title}</h2>
            <span className="text-2xl">❌</span> {content}
        </div>
    );
}