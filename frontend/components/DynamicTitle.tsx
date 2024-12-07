'use client'

import {usePathname} from 'next/navigation';
import Title from './Title';
import XRayTitle from './XRayTitle';

export default function DynamicTitle({className}: {className?: string}) {

    // Change the title of the page based on current page address
    // use next.js API to detect the current page address

    const pathname = usePathname();
    
    return (
        <div id="title" className={"my-auto " + className}>
            
            {pathname === '/' && <Title>API Resume</Title>}
            {pathname === '/xray' && <XRayTitle>X-ray</XRayTitle>}

        </div>
    );
}