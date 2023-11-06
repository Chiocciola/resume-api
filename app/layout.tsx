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
              <p className="p-4 pt-0">This is client side rendered page.<br/>Data are loaded through REST API.</p>
              <ul >
                <li className="py-2 text-l"><a href='/api/resume'>🩻 REST API entrypoint</a></li>
                <li className="py-2 text-l"><a href='https://app.swaggerhub.com/apis/Chiocciola/Resume/1.0.0'>📄 API spec (OpenAPI - SwaggerHub)</a></li>
                <li className="py-2 text-l"><a href='https://www.postman.com/chiocciola/workspace/public/collection/'>🧑‍🚀 Test API in Postman</a></li>
              </ul>
            </nav>
            
          </div>

        </div>

        {children}

      </body>
    </html>
  )
}
