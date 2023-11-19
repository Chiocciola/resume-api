import type { Metadata } from 'next'

import './globals.css'

import Logo from '../components/Logo'


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

        <div id="navbar" className="flex flex-row justify-between sticky top-0 w-screen">

          {/* Logo to the left */}
          <Logo />

          {/* Hamburger to the right */}
          <div id="menu" className='m-4'>

            <input id="menuChckbox" type="checkbox" />
            <span/>
            <span/>
            <span/>
    
            <nav className='p-12 shadow-lg'>
              <p className="p-4 pt-0">This resume page fetches data from a RESTful API.</p>
              <ul >
                <li className="py-2 text-l"><a target="_blank" href={`${process.env.API_URL}/resume/doc`}>🚪 Resume API &#x2197;</a></li>
                <li className="py-2 text-l"><a target="_blank" href='https://app.swaggerhub.com/apis/Chiocciola/Resume/1.0.0'>📄 Resume API on SwaggerHub &#x2197;</a></li>
                <li className="py-2 text-l"><a target="_blank" href='https://www.postman.com/chiocciola/workspace/public/collection/27924363-81530057-d893-4d9c-ba3b-b6d6532ddf1d?action=share&creator=27924363'>🧑‍🚀 Resume API on Postman &#x2197;</a></li>
              </ul>
            </nav>
          
          </div>

          {/* Shadow on top of the menu */}
          <div className="absolute h-full w-full shadow-md pointer-events-none" />
          
        </div>

        {children}

      </body>
    </html>
  )
}
