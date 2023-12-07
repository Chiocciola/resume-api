"use client"

import {useRef, useEffect} from 'react';
import {usePathname} from 'next/navigation';

import './menu.css';


export default function Menu({children, className}) {

    const pathname = usePathname();

    const checkboxRef = useRef(null)

    useEffect(() => {
        checkboxRef.current.checked = false;
      }, [pathname]);

    return (
        <div id="menu" className='m-4'>

            <input type="checkbox" ref={checkboxRef}/>
            <span/>
            <span/>
            <span/>

            <nav className={'p-12 shadow-lg bg-white dark:bg-neutral-800 ' + className}>
                {children}
            </nav>
            
        </div>
    );
}