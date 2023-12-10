export default function Error({title, content})
{
    return (
        <section key={title}>
            <h2>{title}</h2>
            <span className="text-2xl">❌</span> {content}
        </section>
    );
}