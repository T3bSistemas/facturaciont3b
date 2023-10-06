import { Grid} from '@mui/material';
import Item from '../../../Item'
import LoadingButton from '../../../LoadingButton';
export default function GridLoadingButton({label, click, loading, variant, icon, color, fullWidth, docName, href, size, disabled, xs, md}){
    return (
        <Grid item xs={(xs)?xs:12} md={(md)?md:12}>
            <Item>
                {(href && href !== '')?
                <a download={docName} href={href}> 
                    <LoadingButton label={label} click={click} loading={loading} variant={variant} icon={icon} color={color} fullWidth={fullWidth} disabled={disabled} size={size}/>
                </a>
                :
                <LoadingButton label={label} click={click} loading={loading} variant={variant} icon={icon} color={color} fullWidth={fullWidth} disabled={disabled} size={size}/>
                }
            </Item>
        </Grid>
    )
}