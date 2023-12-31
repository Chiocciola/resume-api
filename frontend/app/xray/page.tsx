import { Metadata } from 'next'

import Xray from '../../components/Xray';
 
export async function generateMetadata(): Promise<Metadata> {

    const general = await 
        fetch(process.env.API_URL + '/general')
        .then(r => r.json());

    return {
        title: general.content.name + ' • ' + general.content.title + ' • X-ray',
        description: "Explore API resume using X-ray view",
    }
}

export default function Page() : JSX.Element
{
    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
            <Xray apiEntryPoint={process.env.API_URL} />        
        </main>
    );
};