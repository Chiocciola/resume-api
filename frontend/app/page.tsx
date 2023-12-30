import { Metadata } from 'next'

import X from '../components/X';
 
type Url = {
    url: string
}

export async function generateMetadata(): Promise<Metadata> {

    const general = await
        fetch(process.env.API_URL + '/general')
        .then(r => r.json());

    return {
        title: general.content.name + ' • ' + general.content.title + ' • API Resume',
        description: general.content.summary,
    }
}

async function getResume() : Promise<any[]>
{
    if (!process.env.API_URL)
    {
        return [{title: 'Error', content: 'API_URL not set'}];
    }

    try
    {            
        const sections: Url[] = 
            await fetch(process.env.API_URL)
                .then(r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                .then(r => r.json());

        return await Promise.all(
            sections.map( (s: Url) => 
                fetch(s.url)
                    .then( r => r.ok ? r : Promise.reject(`${r.status} ${r.statusText}`))
                    .then( r => r.json())
                    .catch(r => ({title: 'Error', content: `${s.url}: ${r}`}))));
    }
    catch (e)
    {
        return [{title: 'Error', content: `${e}`}];
    }
}

export default async function Page() : Promise<JSX.Element>
{
    const sections = await getResume();

    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
            {sections.map(X)}
        </main>
    );
};