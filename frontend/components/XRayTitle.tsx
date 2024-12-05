'use client';

import React, { useEffect, useRef } from 'react';

import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'], weight: '400' })

import './XRayTitle.css';

export default function XRayTitle() {


    const xrayRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const sineValue = Math.sin(scrollPosition / 100.0); // Adjust the divisor to control the frequency
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
        <div className='flex justify-center items-center my-auto'>
            <p className={outfit.className + ' text-2xl my-auto select-none xray'} xray-text="X-ray" ref={xrayRef}>X-ray</p>
        </div>
    );

}