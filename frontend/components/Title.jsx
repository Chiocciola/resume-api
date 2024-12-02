'use client';

import Link from 'next/link'
import {usePathname} from 'next/navigation';


import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: '400' })

export default function Title({children, className}) {

    const pathname = usePathname();

    // bg-linear-to-r from-amber-500 via-red-600 to-fuchsia-500
    const gradient = ` bg-clip-text text-transparent bg-[length:200%_auto]
    bg-[linear-gradient(to_right,theme(colors.amber.500),theme(colors.red.600),theme(colors.fuchsia.500),theme(colors.red.600),theme(colors.amber.500))]`;

    return pathname == '/' 
            ? <p             className={outfit.className + " " + gradient + " text-2xl my-auto select-none cursor-default " + className}>{children}</p>
            : <Link href='/' className={outfit.className + " " + gradient + " text-2xl my-auto select-none hover:animate-gradient " + className}>{children}</Link>;
}