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

        <nav>
          <div id="menuToggle">

            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
    
            <ul id="menu">
              <li><a href="https://www.linkedin.com/in/dmitriy-bondar/">LinkedIn</a></li>
              <li><a href='/api/resume'>Resume as REST API</a></li>
            </ul>
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
}
