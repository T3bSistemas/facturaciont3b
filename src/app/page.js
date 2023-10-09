
import Head from 'next/head';
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
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> </meta>
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
        <span id="delivery_data_url" data-url="{{ route('http://20.83.26.232:8081/t3b-fact-ticket/agregarTicket') }}"></span>
      </Head>  
      <FacUserProvider />
    </Box>
  )
}
