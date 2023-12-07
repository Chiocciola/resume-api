"use client"

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import './icon.css';

export default function Icon({className})
{
    const router = useRouter()

    const pathname = usePathname();

    const [checked, setChecked] = useState(pathname != '/');

    useEffect(() => {
        setChecked(pathname != '/')
      }, [pathname]);

    function toggleChecked()
    {
        router.push(!checked ? '/xray' : '/')
    }

    return (
        <div id="logo" className={"m-auto mx-4 text-3xl " + className}>
            <input type="checkbox" className="w-8 h-8" onChange={toggleChecked} checked={checked}/>
            <div className="w-8 h-8">📃</div>
            <div className="w-8 h-8">🩻</div>
        </div>
    );
}