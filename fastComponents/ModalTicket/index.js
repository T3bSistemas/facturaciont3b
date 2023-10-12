import Image                                        from 'next/image'
import { Grid, Typography, Modal}                   from '@mui/material';
import Item                                         from '../Item'
import Sheet                                        from '@mui/joy/Sheet';
import ModalClose                                   from '@mui/joy/ModalClose';

import {img64}                                      from '../../UtilFunction/Base64Img'

export default function ModalTicket({modal, setModal}){
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
                maxWidth: 1200,
                borderRadius: 'lg',
                p: 1,
                boxShadow: 'lg',
            }}
            >
            <ModalClose variant="plain" sx={{ m: 1 }} onClick={()=>{setModal(false)}}/>
            <Typography variant="h6" component="h6"  mb={6}>
                Informacion del ticket
            </Typography>
            <Grid container >
                <Grid item xs={0}  md={2}></Grid>
                <Grid item xs={12} md={3}>
                    <Typography  variant="h4" component="h4" mb={6}>
                        ¿COMO OBTENER MI FACTURA?
                    </Typography>               
                    <Typography  variant="h6" component="h6">
                        Para poder facturar deberás contar con tu ticket de compra e identificar 4 datos importantes para poder realizar la búsqueda de la compra y poder generar la factura
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>
                        <Image
                        src={img64('dataTicket')}
                        width={400}
                        height={400}
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