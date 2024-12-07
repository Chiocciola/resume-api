import Link from 'next/link'

import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: '400' })

import "./Title.css";

export default function Title({children, className}: {children: string, className?: string}) {

    // bg-linear-to-r from-amber-500 via-red-600 to-fuchsia-500
    const gradient = ` bg-clip-text text-transparent bg-[length:200%_auto]
    bg-[linear-gradient(to_right,theme(colors.amber.500),theme(colors.red.600),theme(colors.fuchsia.500),theme(colors.red.600),theme(colors.amber.500))] `;

    const style = outfit.className + " " + gradient + " text-2xl select-none ";

    return  (
        <div className='glowingText'>
            <p aria-hidden="true" className={style + " glowPart"}>{children}</p> 
            <Link href='/xray'    className={style + " textPart " + className}>{children}</Link>
      </div>  
    );
}