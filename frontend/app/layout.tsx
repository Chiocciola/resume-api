import type { Metadata } from 'next'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react';

import { Major_Mono_Display } from 'next/font/google'
const majorMonoDisplay = Major_Mono_Display({ subsets: ['latin'], weight: '400' })

import './globals.css'

import Logo from '../components/Logo'
import Menu from '../components/Menu'

export const metadata: Metadata = {
  title: 'Dmitriy Bondar',
  description: 'API resume',
  icons: {
    icon: '/goomba.png',
    apple: '/goomba.png'
  },
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>

        <div id="navbar" className="flex flex-row justify-between sticky top-0 w-full">

          <Logo />

          <Link href='/' className='my-auto'><p className={majorMonoDisplay.className + " text-2xl text-gray-500"}>API Resume</p></Link>

          <Menu>
            <p>Hi, my name is <b>Dmitriy</b>.<br/>Welcome to my API Resume!<br/><br/>
            The resume data is fetched from a RESTful API:</p>
            <ul className="mt-2">
              <li className="py-2"><a target="_blank" href={`${process.env.API_URL}/resume/doc`}>🚪 API &#x2197;</a></li>
              <li className="py-2"><a target="_blank" href='https://app.swaggerhub.com/apis/Chiocciola/Resume/1.0.0'>📄 API on SwaggerHub &#x2197;</a></li>
              <li className="py-2"><a target="_blank" href='https://www.postman.com/chiocciola/workspace/public/collection/27924363-81530057-d893-4d9c-ba3b-b6d6532ddf1d?action=share&creator=27924363'>🧑‍🚀 API on Postman &#x2197;</a></li>
              <li className="py-2 mt-4"><Link href='/xray'>🩻 Explore API Resume using <b>x-ray view</b></Link></li>
            </ul>
          </Menu>          

          {/* Shadow on top of the menu */}
          <div className="absolute left-0 top-0 h-full w-full shadow-md pointer-events-none z-20" />
        </div>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
