
import { randomBytes } from 'crypto'
import  Head from 'next/head'
import {Box, CssBaseline } from '@mui/material';
import  FacUserProvider  from '../../FacUserProvider'


export default function Home() {
  return (  
    <Box sx={{
      //position: 'fixed',
      width: '100%',
      height: '100%',
      backgroundImage: `url('fondo.jpg')`
    }}>
      <CssBaseline/>
      <Head>
        <title>Facturación T3B</title>
        <meta
          name="description"
          content="Facturacion en linea de clientes"
          key="desc"
        />
        <meta
          name="Strict-Transport-Security"
          value="max-age=31536000; includeSubdomains"
        />
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
      </Head>  
      <FacUserProvider />
    </Box>
  )
}
