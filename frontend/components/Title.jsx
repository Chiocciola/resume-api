'use client';

import Link from 'next/link'
import {usePathname} from 'next/navigation';


import { Major_Mono_Display } from 'next/font/google'
const majorMonoDisplay = Major_Mono_Display({ subsets: ['latin'], weight: '400' })

export default function Title({children, className}) {

    const pathname = usePathname();

    const gradientTailwindStyle = "bg-gradient-to-r from-amber-500 via-red-600 to-fuchsia-500 bg-clip-text text-transparent";

    return pathname == '/' 
            ? <p             className={majorMonoDisplay.className + " " + gradientTailwindStyle + " text-2xl text-gray-500 my-auto select-none cursor-default " + className}>{children}</p>
            : <Link href='/' className={majorMonoDisplay.className + " " + gradientTailwindStyle + " text-2xl text-gray-500 my-auto select-none " + className}>{children}</Link>;
}