
import React from 'react';
import { Grid, Typography} from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';

import Item from '../componentes/comUtiles/Item'
import {ImgBse64} from '../imgBase64'

export default function Home() {
  return (  
      <Grid container direction='row'  justifyContent='center' alignItems='center' spacing={2} 
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        minHeight: '100vh', 
        backgroundImage: `url('fondo.jpg')`
      }}>
      
          <Grid item  xs={12} md={6} spacing={3} >
            <Grid container direction='row'  justifyContent='center' alignItems='center' spacing={3}>
              <Grid item  xs={12} md={12}>
                <Item>
                  <Typography component='h1'  variant='h3' gutterBottom>
                      <b> FACTURACIÓN EN LINEA 4.0</b>
                  </Typography>
                </Item>
              </Grid>
              <Grid item  xs={12} md={6} mt={3}>
                <Item>   
                  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1.3)', textAlign: 'center' }}>           
                    <Card >
                      <CardActions sx={{backgroundColor: 'error.main' }}>
                        <Button   size="small">
                          <Typography variant="subtitle1" sx={{ color: 'white' }}>
                            <DescriptionOutlinedIcon/>  OBTENER FACTURA
                          </Typography>
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                </Item>
              </Grid>
              <Grid item  xs={12} md={6} mt={3}>
                <Item>   
                  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1.3)', textAlign: 'center' }}>           
                    <Card >
                      <CardActions sx={{backgroundColor: 'error.main' }}>
                        <Button   size="small">
                          <Typography variant="subtitle1" sx={{ color: 'white' }}>
                            <LocalPrintshopOutlinedIcon/>   REIMPRIMIR FACTURA
                          </Typography>
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                </Item>
              </Grid>
              <Grid item  xs={12} md={12} mt={3}>
                <Item>   
                  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(1.3)', textAlign: 'center' }}>           
                    <Card >
                      <CardActions sx={{backgroundColor: 'error.main' }}>
                        <Button   size="small">
                          <Typography variant="subtitle1" sx={{ color: 'white' }}>
                              <ContactSupportOutlinedIcon/> PREGUNTAS FRECUENTES
                          </Typography>
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                </Item>
              </Grid>
              <Grid item  xs={12} md={12} mt={3}>
                <Typography component='h5' variant='h5' >
                    <b>
                      <p>Si presenta algún problema al realizar su factura o descargar su comprobante </p>
                      <p>pongase en contacto con nosotros en la siguiente cuenta de correo electrónico</p>
                    </b>
                </Typography>
                <Typography component='h4' variant='h4' >
                    <b>
                      <p> facturamicompra@t3b.com.mx</p>
                    </b>
                </Typography>
               
              </Grid>
             
            </Grid>            
          </Grid>
          <Grid item xs={0} md={6}>
            <Item>
              <ImageList >
                  <ImageListItem key={'inicio'}>
                    <img
                      srcSet={'inicio?w=500&h=500&fit=crop&auto=format&dpr=2 2x'}
                      src={ImgBse64('inicio')}
                      alt={'inicio'}
                      loading="lazy"
                    />
                  </ImageListItem>
              </ImageList>
            </Item>
          </Grid>
      </Grid>
  )
}
