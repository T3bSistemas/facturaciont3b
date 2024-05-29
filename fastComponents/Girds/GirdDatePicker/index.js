'use client'
import { Grid} from '@mui/material'
import Item from '../../Item'
import  DatePicker  from '../../DatePicker'

export default function GirdDatePicker({label, fecha, accion, disabled, error, helperText, xs, md, mt}){
    return (
        <Grid item xs={xs} md={md} mt={(mt)?mt:0}>
            <Item>
                <DatePicker label={label} fecha={fecha} accion={accion} disabled={disabled} error={error} helperText={helperText}/>
            </Item>
        </Grid>
    )
}