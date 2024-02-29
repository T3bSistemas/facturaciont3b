'use client'
import {useState}               from 'react'
import Link                     from 'next/link'

import { Grid, Typography,
        Snackbar, Alert,
        useMediaQuery}          from '@mui/material'

import {img64}                  from '../../UtilFunction/Base64Img'
import { useFContext, 
        useSetFContext  }       from "../../FacUserProvider";
import Page                     from '../Page'
import GridLoadingButton        from '../../fastComponents/Girds/GridLoadingButton'
import GridImage                from '../../fastComponents/Girds/GridImage'
import ModalTicket              from '../../fastComponents/ModalTicket';
import Item                     from '../../fastComponents/Item'


export default function Start(){
    const fdata                     = useFContext();
    const setFdata                  = useSetFContext();
    const [page, setPage]           = useState('inicio')
    const matches                   = useMediaQuery('(min-width:600px)');
    const [modal, setModal]         = useState(false);
    return (
        <>
            {(page !== 'inicio')?
                <Page page={page} setPage={setPage}/>
                :
                <Grid container>
                    <GridImage src={img64('Logo3b')} width={322} height={86.9} widthMatches={1} heightMatches={1} alt={'Imagen Logo 3B'} xs={12} md={6} separation={8} />                    
                    <Grid item xs={12} md={6}></Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Typography variant={'h4'} component={'h1'} textAlign={'center'} mt={1} >
                                <b>FACTURACIÓN EN LÍNEA</b> 
                            </Typography>
                            <Typography variant={'h6'} component={'h6'} textAlign={'center'} mt={1} >
                                Versión 4.0
                            </Typography>
                        </Item>
                    </Grid>
                    <GridImage infoAdd={<Typography variant='h6' textAlign='center' mt={1} onClick={()=>{setModal(true)}}><b style={ {color: '#d32f2f'}}>¿Qué datos necesito de mi ticket?</b></Typography>} src={img64('ticket')} width={50} height={50} widthMatches={50} heightMatches={50} alt={'Informacion Ticket'} xs={12} md={6} separation={0} click={()=>{setModal(true)}} link={'#'}/>
                    
                    <ModalTicket modal={modal} setModal={setModal}/> 

                    <Grid item xs={12} md={6} mt={5}>                        
                        <Grid container spacing={1}>

                            <Grid item xs={1} md={2}></Grid>
                            <GridLoadingButton label={<Typography variant='h5'>OBTENER FACTURA</Typography>}        click={()=>{setPage('OF')}} loading={false} variant={'contained'}  color={'error'} fullWidth={true} size={'large'} xs={10} md={8}/>
                            <Grid item xs={1} md={2}></Grid>

                            <Grid item xs={1} md={2}></Grid>
                            <GridLoadingButton label={<Typography variant='h5'>REIMPRIMIR FACTURA</Typography>}     click={()=>{setPage('RF')}} loading={false} variant={'contained'}  color={'error'} fullWidth={true} size={'large'} xs={10} md={8}/>
                            <Grid item xs={1} md={2}></Grid>

                            <Grid item xs={1} md={2}></Grid>
                            <GridLoadingButton label={<Typography variant='h5'>PREGUNTAS FRECUENTES</Typography>}   click={()=>{setPage('PF')}} loading={false} variant={'contained'}  color={'error'} fullWidth={true} size={'large'} xs={10} md={8}/>
                            <Grid item xs={1} md={2}></Grid>

                            <Grid item xs={1} md={2}></Grid>
                            <Grid item xs={10} md={8}>
                                <Item>
                                    <>
                                    <Typography variant={'h6'} component={'h6'} textAlign={'center'} mt={1} >
                                        Si tuviste algún problema en el proceso de facturación, comunícate con nosotros al correo electrónico:
                                        <b style={ {color: '#d32f2f'} }>facturamicompra@t3b.com.mx</b>
                                    </Typography>
                                    </>
                                </Item>
                            </Grid>
                            <Grid item xs={1} md={2}></Grid>

                            <Grid item xs={1} md={2}></Grid>
                            <Grid item xs={10} md={8}>
                                <Item>
                                    <Typography variant={'h6'} component={'h6'} textAlign={'center'} mt={1} >
                                        Quizá ya tenemos una respuesta para ti, visita nuestra sección de <Link href={'#'} style={{textDecoration: 'none'}} onClick={()=>{setPage('PF')}}><b style={ {color: '#d32f2f'} }>Preguntas frecuentes</b></Link>.
                                    </Typography>
                                </Item>
                            </Grid>
                            <Grid item xs={1} md={2}></Grid>
                        </Grid>
                    </Grid>
                    <GridImage src={img64('pintV')} width={450} height={450} widthMatches={1} heightMatches={1} alt={'Imagen Principal'} xs={12} md={6} separation={0} />
                </Grid>
            }
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Grid container sx={{position: 'fixed',bottom: 0,left: 0}} >
                <Grid item xs={0} md={2}/>
                <Grid item xs={0} md={8} textAlign={'center'}>
                    <Typography variant={'h9'} component={'h9'} textAlign={'center'}  >
                        <b>Todos los derechos reservados Tiendas 3B |  <Link href={'#'} style={{textDecoration: 'none'}} onClick={()=>{setPage('AV')}}><b style={ {color: '#d32f2f'} }>Aviso de Privacidad</b></Link></b>
                    </Typography>                     
                </Grid>
                <Grid item xs={0} md={2}/>
            </Grid>
            <Snackbar
                anchorOrigin={ fdata.snackbar.anchorOrigin }
                open={fdata.snackbar.open}
                onClose={()=>{setFdata({...fdata,snackbar:{...fdata.snackbar,open:false}})}}
                key={'Snackbar'}
                sx={{ width: (matches)?'30%':'80%' }}
            >
                <Alert onClose={()=>{setFdata({...fdata,snackbar:{...fdata.snackbar,open:false}})}} severity={fdata.snackbar.severity} sx={{ width: '100%' }}>
                    <Typography variant='button' >
                        <b>{fdata.snackbar.message}</b>
                    </Typography>
                </Alert>
            </Snackbar>
        </>
    )
}