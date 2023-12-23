export const metadata = {
  title: 'Resume API',
  description: 'Documentation for the Resume API',
  icons: {
    icon: '/flower.png',
    apple: '/flower.png'
  },
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
