"use client"

import {useRef, useEffect} from 'react';
import {usePathname} from 'next/navigation';

import './menu.css';


export default function Menu({children}) {

    const pathname = usePathname();

    const checkboxRef = useRef(null)

    useEffect(() => {
        checkboxRef.current.checked = false;
      }, [pathname]);

    return (
        <div id="menu"  className='m-4'>

            <input id="menuChckbox" type="checkbox" ref={checkboxRef}/>
            <span/>
            <span/>
            <span/>

            <nav className='p-12 shadow-lg z-10'>
                {children}
            </nav>
            
        </div>
    );
}