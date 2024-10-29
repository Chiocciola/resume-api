import type { JSX } from "react";

import Resume from '../../components/Resume';

export default async function Page() : Promise<JSX.Element>
{
    return (<Resume apiEntryPoint={process.env.API_URL + "/test"}/>);
}