export const metadata = {
  title: 'APIs',
  description: 'Place where APIs live',
  icons: {
    icon: '/flower.png',
    apple: '/flower.png'
  },
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
