
import Resume from '../../components/Resume';


import type { JSX } from "react";


export default async function Page() : Promise<JSX.Element>
{
    return (
        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
            <Resume apiEntryPoint={process.env.API_URL + "/test"}/>
        </main>
    );
}