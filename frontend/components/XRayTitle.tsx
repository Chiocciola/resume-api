'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: '400' })

import './XRayTitle.css';

export default function XRayTitle({children, className}: {children: string, className?: string}) {

    const xrayRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const sineValue = Math.sin(scrollPosition / 100.0);
            const x1 = sineValue * 1;
            const x2 = sineValue * 2.66;

            xrayRef.current?.style.setProperty('--x1', `${x1}px`);
            xrayRef.current?.style.setProperty('--x2', `${x2}px`);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
            <Link href="/" className={outfit.className + ' text-2xl select-none xray'} xray-text={children} ref={xrayRef}>{children}</Link>
    );

}