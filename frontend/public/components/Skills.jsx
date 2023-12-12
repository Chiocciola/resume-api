
export default function Skills({title, content})
{
  return (
    <section key={title}>
      <h2>Skills</h2>

      <ul className='ml-4 list-disc'>
        {content.map(group => (
          <li key={group.kind}><b>{group.kind}:</b> {group.skills.join(", ")}</li>
        ))}
      </ul>
    </section>
  );
}