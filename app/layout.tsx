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

        <div id="topBar" className="flex justify-between flex-row shadow-lg">

          <div className="absolute h-full w-full z-10 shadow-md pointer-events-none"/>

          <Image src="/goomba.png" className="m-auto mx-4" alt="Dmitriy Bondar" width="32" height="32" priority={true}/>

          <div id="menuToggle" className='m-4'>

            <input id="clickTarget" type="checkbox" />
            <span/>
            <span/>
            <span/>
    
            <nav id="menu" className='p-12 shadow-lg'>
              <p className="p-4 pt-0">This resume is a client-side rendered web page.<br/>It loads data using a REST API.</p>
              <ul >
                <li className="py-2 text-l"><a href='/api/resume'>🚪 Resume API entry point</a></li>
                <li className="py-2 text-l"><a target="_blank" href='https://app.swaggerhub.com/apis/Chiocciola/Resume/1.0.0'>📄 Resume API on SwaggerHub</a> &#x2197;</li>
                <li className="py-2 text-l"><a target="_blank" href='https://www.postman.com/chiocciola/workspace/public/api/09a5bb57-61ea-4340-a7c6-161f8ac966fa?action=share&creator=27924363'>🧑‍🚀 Resume API on Postman</a>  &#x2197;</li>
              </ul>
            </nav>
            
          </div>

        </div>

        {children}

      </body>
    </html>
  )
}
