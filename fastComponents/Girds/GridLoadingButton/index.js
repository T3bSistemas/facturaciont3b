import { Grid} from '@mui/material';
import Item from '../../Item'
import LoadingButton from '../../LoadingButton';
export default function GridLoadingButton({label, click, loading, variant, icon, color, fullWidth, size, disabled, xs, md, mt}){
    return (
        <Grid item xs={(xs)?xs:12} md={(md)?md:12} mt={(mt)?mt:0}>
            <Item>
                <LoadingButton label={label} click={click} loading={loading} variant={variant} icon={icon} color={color} fullWidth={fullWidth} size={size} disabled={(disabled)?disabled:false}/>
            </Item>
        </Grid>
    )
}