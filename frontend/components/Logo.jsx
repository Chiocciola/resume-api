"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'


import './logo.css';

export default function Logo()
{
    const router = useRouter()

    const [checked, setChecked] = useState(usePathname() == '/xray');

    function toggleChecked()
    {
        setChecked(!checked);
        router.push(!checked ? '/xray' : '/')
    }

    return (
        <div id="logo" className="m-auto mx-4 text-3xl">
            <input id="logoCheckbox" type="checkbox" className="w-8 h-8" onChange={toggleChecked} checked={checked}/>
            <div className="w-8 h-8 ">🩻</div>
            <div className="w-8 h-8">📃</div>
        </div>
    );
}