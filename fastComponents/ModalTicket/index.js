import Image                                        from 'next/image'
import { Grid, Typography, Modal,useMediaQuery}     from '@mui/material';
import Item                                         from '../Item'
import Sheet                                        from '@mui/joy/Sheet';
import ModalClose                                   from '@mui/joy/ModalClose';

import {img64}                                      from '../../UtilFunction/Base64Img'

export default function ModalTicket({modal, setModal}){
    const matches                   = useMediaQuery('(min-width:600px)');
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={modal}
            onClose={() => setModal(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
            variant="outlined"
            sx={{
                maxWidth: (matches)?1300:500,
                borderRadius: 'lg',
                p: 1,
                boxShadow: 'lg',
            }}
            >
            <ModalClose variant="plain" sx={{ m: 1 }} onClick={()=>{setModal(false)}}/>
            <Typography variant="h6" component="h6"  mb={6}>
                Información del ticket
            </Typography>
            <Grid container >
                <Grid item xs={0}  md={2}></Grid>
                <Grid item xs={12} md={3}>
                    <Typography  variant="h4" component="h4" mb={6}>
                        <b>¿Cómo obtener mi factura?</b>
                    </Typography>               
                    <Typography  variant="h6" component="h6">
                        Deberás contar con tu ticket de compra e identificar los 5 datos importantes para realizar la búsqueda de tu compra y generar la factura.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>
                        <Image
                        src={img64('dataTicket')}
                        width={(matches)?715:300}
                        height={(matches)?579:400}
                        alt="Picture of the author"
                        />
                    </Item>
                </Grid>
                <Grid item xs={0} md={1}></Grid>
            </Grid>
            </Sheet>
        </Modal>  
    )
}