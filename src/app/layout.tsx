import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Raleway } from 'next/font/google'

export const metadata: Metadata = {
  title: 'REM - Diprofire Chile',
  description:
    'Sistema de generación y gestión de solicitudes de requerimientos y materiales.'
}

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway'
})

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${raleway.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
