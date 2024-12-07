import type { Metadata } from 'next'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css'

import Icon from '../components/Icon'
import Menu from '../components/Menu'
import DynamicTitle from '../components/DynamicTitle'

export const metadata: Metadata = {
  icons: {
    icon: '/goomba.png',
    apple: '/goomba.png'
  },
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>

        <header className="flex flex-row justify-between sticky top-0 w-full z-20 backdrop-blur bg-white/75 dark:bg-neutral-800/75">

          <Icon className="z-20" />

          <DynamicTitle className="z-20"/>

          <Menu className="z-10">
            <p>Hi, my name is <b>Dmitriy</b>.</p>
            <p>Welcome to my API Resume!</p>

            <p className="mt-4">The resume data is fetched from a REST API:</p>
            <ul>
              <li className="py-2"><a target="_blank" href={`${process.env.API_URL}/docs`}>🚪 API &#x2197;</a></li>
            </ul>

            <p className="mt-4">Explore API Resume using x-ray view:</p>        
            <ul>
              <li className="py-2"><Link href='/xray'>🩻 X-ray view</Link></li>
            </ul>
          </Menu>          

          {/* Shadow on top of the menu */}
          <div className="absolute left-0 top-0 h-full w-full shadow-md pointer-events-none z-20" />
        </header>

        <main className="px-4 md:px-16 lg:px-32 xl:px-48 py-4">
          {children}
        </main>  

        <ToastContainer />
        <Analytics />

      </body>
    </html>
  )
}
