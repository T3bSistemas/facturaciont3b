'use client'
import {useState}               from 'react'

import { Grid, Typography,
        Snackbar, Alert,
        useMediaQuery  }       from '@mui/material'

import {img64}                  from '../../UtilFunction/Base64Img'
import { useFContext, 
        useSetFContext  }       from "../../FacUserProvider";
import Page                     from '../Page'
import GridLoadingButton        from '../../fastComponents/Girds/GridLoadingButton'
import GridText                 from '../../fastComponents/Girds/GridText'
import GridImage                from '../../fastComponents/Girds/GridImage'
import ModalTicket              from '../../fastComponents/ModalTicket';  

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
                <Grid container spacing={2}>
                    <GridText text={'FACTURACIÓN EN LINEA 4.0'} variant={'h4'} component={'h1'} aling='center' separation={8} xs={12} md={6} />
                    <GridImage infoAdd={<Typography variant='h6' textAlign='center' mt={1}><b>Que datos necesito de mi ticket</b> v1</Typography>} src={img64('ticket')} width={50} height={50} widthMatches={50} heightMatches={50} alt={'Informacion Ticket'} xs={12} md={6} separation={3} click={()=>{setModal(true)}}/>
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
                            <GridImage infoAdd={<>
                                    <Typography variant='h6'>
                                        <b>Si presenta algún problema al realizar su factura o descargar su comprobante pongase en contacto con nosotros en la siguiente cuenta de correo electrónico</b>
                                    </Typography>
                                    <Typography variant='h5' mt={2}>
                                        <b>facturamicompra@t3b.com.mx</b>
                                    </Typography></>} 
                            src={img64('SopTec')} width={140} height={160} widthMatches={1} heightMatches={1} alt={'Soporte Tecnico'} xs={12} md={12} separation={3} />
                         </Grid>
                    </Grid>
                    <GridImage src={img64('pintV')} width={450} height={450} widthMatches={1} heightMatches={1} alt={'Imagen Principal'} xs={12} md={6} separation={3} />
                </Grid>
            }
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