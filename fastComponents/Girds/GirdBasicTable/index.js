
import { Grid} from '@mui/material'
import BasicTable from '../../BasicTable'

export default function GirdBasicTable({colums, rows, funcion, xs, md, separation}){
    return(
        <Grid item xs={(xs)?xs:12} md={(md)?md:12} mt={(separation)?separation:0}>
            <BasicTable colums={colums} rows={rows} funcion={funcion}/>
        </Grid> 
    )
}