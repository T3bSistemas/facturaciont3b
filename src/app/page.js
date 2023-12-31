
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
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> </meta>
      </Head>  
      <FacUserProvider />
    </Box>
  )
}
