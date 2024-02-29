import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Facturacion T3B',
  description: 'Facturacion de Tickets a Clientes de Tiendas 3B',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{background: '#EBEAEA'}} >{children}</body> 
    </html>
  )
}
