'use client';

import Link from 'next/link'
import {usePathname} from 'next/navigation';


import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: '400' })

export default function Title({children, className}) {

    const pathname = usePathname();

    const gradient = "bg-gradient-to-r from-amber-500 via-red-600 to-fuchsia-500 bg-clip-text text-transparent";

    return pathname == '/' 
            ? <p             className={outfit.className + " " + gradient + " text-2xl my-auto select-none cursor-default " + className}>{children}</p>
            : <Link href='/' className={outfit.className + " " + gradient + " text-2xl my-auto select-none " + className}>{children}</Link>;
}