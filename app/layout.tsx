import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

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
          <ul className='menu'>
            <li><Link href='/api/resume'>🩻 Resume as REST API</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
