'use client'
import React from 'react'
import { randomBytes } from 'crypto'
import  Head from 'next/head'
import {Grid, Container} from '@mui/material';
import  FacUserProvider  from '../../FacUserProvider'
import Item from '../../fastComponents/Item'

export default function Home() {
  return (  
    <Grid container>
      <Grid item xs={12} md={12} >
        <Item>
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
        </Item>
      </Grid>
    </Grid>
  )
}
