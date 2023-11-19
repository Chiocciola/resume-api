import X from '../components/X';

export const dynamic = 'force-dynamic';

async function getResume()
{
    try
    {    
        const apiEntryPoint = process.env.API_URL;
        
        const sections = await fetch(apiEntryPoint + '/resume/sections').then(r => r.json());

        return await Promise.all(
            sections.map( s => s.url).map( url => fetch(url).then(r => r.ok ? r.json() : {title: 'Error', content: `${url}: ${r.status} ${r.statusText}`})));
    }
    catch (e)
    {
        return [{title: 'Error', content: e.message}];
    }
}

export default async function Resume() {

    const sections = await getResume();

    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
            {sections.map(X)}
        </main>
    );
};