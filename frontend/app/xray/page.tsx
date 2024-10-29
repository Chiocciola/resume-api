import { Metadata } from 'next'

import Xray from '../../components/Xray';

import type { JSX } from "react";

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
        <Xray apiEntryPoint={process.env.API_URL} />        
    );
}