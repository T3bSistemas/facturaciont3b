'use client'
import {useState}               from 'react'
import Link                     from 'next/link'

import { Grid, Typography,
        Snackbar, Alert,
        useMediaQuery}          from '@mui/material'
import { useFContext, 
        useSetFContext  }       from "../../FacUserProvider";
import Page                     from '../Page'
import GridLoadingButton        from '../../fastComponents/Girds/GridLoadingButton'
import Item                     from '../../fastComponents/Item'
import PopoverTicket            from '../../fastComponents/PopoverTicket'
import Intercom                 from '@intercom/messenger-js-sdk';

export default function Start(){
    const [page, setPage]           = useState('inicio')
    const matches                   = useMediaQuery('(min-width:600px)');
    Intercom({app_id: 'v6jamdkq',});

    return (
        <>
            {(page !== 'inicio')?
                <Page page={page} setPage={setPage}/>
                :
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Item><img id="logo3b" src={(matches)?'/Logo3b.png':'/Logo3bm.png'} alt={'logo3bi'} loading='lazy'/></Item>                                               
                    </Grid>
                    <Grid item xs={12} md={12} mt={3}>
                        <Item>
                            <Typography variant={'h5'} component={'h1'} >
                                <b>FACTURACIÓN EN LÍNEA</b> 
                            </Typography>
                            <Typography variant={'h6'} component={'h6'} mt={0} sx={{fontSize: '16px'}}>
                                Versión 4.0
                            </Typography>
                        </Item>
                    </Grid>

                    <Grid item xs={12} md={12} mt={0}>
                        <Item>
                            <Typography variant={'h6'} component={'h6'} textAlign={'center'} mt={3} sx={{fontSize: '16px'}}>
                                ¡Hola! ¿necesitas una factura? <br></br>
                                Recuerda que podrá ser generada <b>después de 24 hrs</b> de haber realizado tu compra  🙌​​ 
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={12} mt={5}>
                        <Item>
                            <Typography variant={'h6'} component={'h6'} textAlign={'center'} mt={0} sx={{fontSize: '16px'}}>
                                <b>¿Qué datos necesito de mi ticket?</b>   Encuéntralos acá 👉 <PopoverTicket/>
                            </Typography>
                        </Item>
                    </Grid>

             
                    <Grid  item xs={1} md={4.7} mt={6}></Grid>
                    <GridLoadingButton label={<Typography variant='h6' sx={{fontSize: '18px'}}>Solicitar factura</Typography>} click={()=>{setPage('OF')}} loading={false} variant={'contained'}  color={'error'} fullWidth={true} size={'large'} xs={10} md={2.6} mt={6}/>
                    <Grid  item xs={1} md={4.7} mt={6}></Grid>
                    <Grid  item xs={1} md={4.7} mt={2}></Grid>
                    <GridLoadingButton label={<Typography variant='h6' sx={{fontSize: '18px'}}>Reimprimir factura</Typography>} click={()=>{setPage('RF')}} loading={false} variant={'contained'}  color={'error'} fullWidth={true} size={'large'} xs={10} md={2.6} mt={2}/>
                    <Grid  item xs={1} md={4.7} mt={2}></Grid>
                    <Grid  item xs={1} md={4.7} mt={2}></Grid>
                    <GridLoadingButton label={(matches)?<Typography variant='h6' sx={{fontSize: '18px'}}>Preguntas frecuentes</Typography>:<Typography variant='h6' sx={{fontSize: '16px'}}>Preguntas frec.</Typography>}   click={()=>{setPage('PF')}} loading={false} variant={'outlined'}  color={'error'} fullWidth={true} size={'large'} xs={10} md={2.6} mt={2}/>
                    <Grid  item xs={1} md={4.7} mt={2}></Grid>
                    
                    <Grid item xs={12} md={12} mt={5}>
                        <Item>
                            <Typography variant={'h6'} component={'h6'} textAlign={'center'} mt={0} sx={{fontSize: '16px'}}>
                            Si tuviste algún problema en el proceso de facturación, comunícate <br></br>
                            con nosotros al correo electrónico: <b style={ {color: '#d32f2f'} }>facturamicompra@t3b.com.mx</b>
                            </Typography>
                        </Item>
                    </Grid>

                </Grid>
            }
        </>
    )
}