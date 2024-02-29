import {img64}                  from '../../../UtilFunction/Base64Img'
import {Grid}                   from '@mui/material'

export default function aviso(){
    return (
        <Grid container mt={5}>
            <Grid item xs={0} md={12} >
                <iframe src={img64('aviso')} width={'100%'} height={600}/>
           </Grid>
        </Grid>
        
    )
}