'use client'
import { Grid} from '@mui/material'
import Item from '../../Item'
import  DatePicker  from '../../DatePicker'

export default function GirdDatePicker({label, focused, fecha, accion, xs, md}){
    return (
        <Grid item xs={xs} md={md}>
            <Item>
                <DatePicker label={label} focused={focused} fecha={fecha} accion={accion}/>
            </Item>
        </Grid>
    )
}