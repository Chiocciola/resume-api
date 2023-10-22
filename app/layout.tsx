import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dmitriy Bondar',
  description: 'Dmitriy Bondar home page',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul>
            <li><Link href="/">🏠 Home</Link></li>
            <li><Link href="/resume/">📝 Resume</Link></li>
            <li><Link href='/api/resume'>🩻 Resume as REST API</Link></li>
            <li><Link href="https://www.linkedin.com/in/dmitriy-bondar/">🔗 Linkedin</Link></li>
        </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
