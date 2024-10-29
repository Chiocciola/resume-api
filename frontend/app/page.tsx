import { Metadata } from 'next'

import Resume from '../components/Resume';

import Loader from '../components/Loader';

import  {Suspense, type JSX } from "react";

export async function generateMetadata(): Promise<Metadata> {

    const general = await
        fetch(process.env.API_URL + '/general')
        .then(r => r.json());

    return {
        title: general.content.name + ' • ' + general.content.title + ' • API Resume',
        description: general.content.summary,
    }
}

export default function Page() : JSX.Element
{
    return (
        <Suspense fallback={<div className='flex justify-center w-full text-current'><Loader show={true} color="text-current"/></div>}>
            <Resume apiEntryPoint={process.env.API_URL}/>
        </Suspense>
    );
}