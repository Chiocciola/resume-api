
export default function Skills({title, content})
{
    return (
        <div key={title}>
            <h2 className="text-2xl mt-3">Skills</h2>

            <ul className='ml-4 list-disc'>
                {content.map(group => (
                    <li key={group.kind}><strong>{group.kind}:</strong> {group.skills.join(", ")}</li>
                ))}
            </ul>
        </div>
    );
}