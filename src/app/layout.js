import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Facturacion T3B',
  description: 'Facturacion de Tickets a Clientes de Tiendas 3B',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{background: '#EBEAEA'}} >{children}</body>
      <footer>
		        <span id="siteseal"><script  type="text/javascript" src="https://seal.starfieldtech.com/getSeal?sealID=MmocUzxFkUu7etk3ohTqmsREF08fcjwGxUjEA0cHyc06qTG8e3ujW6kNKui6"></script></span>
      </footer>
    </html>
  )
}
