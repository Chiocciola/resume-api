'use client';

import Link from 'next/link'
import {usePathname} from 'next/navigation';


import { Major_Mono_Display } from 'next/font/google'
const majorMonoDisplay = Major_Mono_Display({ subsets: ['latin'], weight: '400' })

export default function Title({children}) {

    const pathname = usePathname();

    return pathname == '/' 
            ? <p className={majorMonoDisplay.className + " text-2xl text-gray-500 my-auto"}>{children}</p>
            : <Link href='/' className='my-auto'><p className={majorMonoDisplay.className + " text-2xl text-gray-500"}>{children}</p></Link>;
}