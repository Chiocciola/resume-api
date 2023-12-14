import Xray from '../../components/Xray';

import { Metadata } from 'next'
 
export async function generateMetadata(): Promise<Metadata> {

    const general = await fetch(process.env.API_URL + '/resume/general').then(r => r.json());

    return {
        title: general.content.name + ' | ' + general.content.title + ' | API Resume | X-ray view',
        description: "Explore API resume using X-ray view",
    }
}


export default function Page() {

    const apiEntryPoint = process.env.API_URL;

    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">

            <Xray apiEntryPoint={apiEntryPoint} />
           
        </main>
    );
};