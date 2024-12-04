'use client';

import Link from 'next/link'
import {usePathname} from 'next/navigation';

import "./Title.css";


import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: '400' })

export default function Title({children, className}) {

    const pathname = usePathname();

    // bg-linear-to-r from-amber-500 via-red-600 to-fuchsia-500
    const gradient = ` bg-clip-text text-transparent bg-[length:200%_auto]
    bg-[linear-gradient(to_right,theme(colors.amber.500),theme(colors.red.600),theme(colors.fuchsia.500),theme(colors.red.600),theme(colors.amber.500))] `;

    const style = outfit.className + " " + gradient + " text-2xl my-auto select-none ";

    return  (
        <div className='relative m-auto glowingText'>

            {pathname == '/' 
            ? <p             className={style + " cursor-default "+ className}>{children}</p>
            :            
            <>
              <p aria-hidden="true" className={style + " glowPart absolute -z-10"}>{children}</p> 
              <Link href='/' className={style + " textPart " + className}>{children}</Link>
            </>
            }

      </div>  
    );
}