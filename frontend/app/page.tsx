import { Metadata } from 'next'

import Resume from '../components/Resume';

export async function generateMetadata(): Promise<Metadata> {

    const general = await
        fetch(process.env.API_URL + '/general')
        .then(r => r.json());

    return {
        title: general.content.name + ' • ' + general.content.title + ' • API Resume',
        description: general.content.summary,
    }
}

export default async function Page() : Promise<JSX.Element>
{
    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
            <Resume endpoint={process.env.API_URL}/>
        </main>
    );
};