import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Facturacion T3B',
  description: 'Facturacion de Tickets a Clientes de Tiendas 3B',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> </meta>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
