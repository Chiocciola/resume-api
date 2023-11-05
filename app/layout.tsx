import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dmitriy Bondar',
  description: 'Dmitriy Bondar resume',
  icons: {
    icon: '/goomba.png',
    apple: '/goomba.png'
  },
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>

        <nav className="flex justify-between flex-row">

          <div className="absolute h-full w-full z-10 shadow-lg pointer-events-none"/>

          <Image src="/goomba.png" className="m-auto mx-4" alt="Dmitriy Bondar" width="32" height="32" priority={true}/>

          <div id="menuToggle" className='m-4'>

            <input id="clickTarget" type="checkbox" />
            <span/>
            <span/>
            <span/>
    
            <ul id="menu" className='p-12 shadow-md'>
              <li className="py-2 text-xl"><a href="https://www.linkedin.com/in/dmitriy-bondar/">🔗 LinkedIn</a></li>
              <li className="py-2 text-xl"><a href='/api/resume'>🩻 Resume as REST API</a></li>
            </ul>
            
          </div>

        </nav>

        {children}

      </body>
    </html>
  )
}
