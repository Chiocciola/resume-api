import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import Loading from './loading'

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

        <div id="topBar" className="flex flex-row justify-between shadow-lg sticky top-0 w-full">

          {/* Icon to the left */}
          <div className="goomba-card m-auto mx-4">
            <input type="checkbox" />
            <Image src="/goomba.png" className="goomba" alt="Dmitriy Bondar" width="32" height="32" priority={true}/>
            <div className="goomba-back allign-middle w-8 h-8 text-3xl">😝</div>
          </div>
          {/* Hamburger to the right */}
          <div id="menuToggle" className='m-4'>

            <input type="checkbox" />
            <span/>
            <span/>
            <span/>
    
            <nav id="menu" className='p-12 shadow-lg'>
              <p className="p-4 pt-0">This web application renders a resume using data obtained from a RESTful API.</p>
              <ul >
                <li className="py-2 text-l"><a href={`${process.env.API_URL}/resume`}>🚪 Resume API entry point</a></li>
                <li className="py-2 text-l"><a target="_blank" href='https://app.swaggerhub.com/apis/Chiocciola/Resume/1.0.0'>📄 Resume API on SwaggerHub</a> &#x2197;</li>
                <li className="py-2 text-l"><a target="_blank" href='https://www.postman.com/chiocciola/workspace/public/api/09a5bb57-61ea-4340-a7c6-161f8ac966fa?action=share&creator=27924363'>🧑‍🚀 Resume API on Postman</a>  &#x2197;</li>
              </ul>
            </nav>
          
          </div>

          {/* Shadow on top of the menu */}
          <div className="absolute h-full w-full shadow-md pointer-events-none"/>
          
        </div>

        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>

      </body>
    </html>
  )
}
