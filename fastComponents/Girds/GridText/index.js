import { Grid, Typography} from '@mui/material';

import Item from '../../Item'
export default function GridAll({text, variant, component, aling, separation, xs, md}){
    return(
        <Grid item xs={xs} md={md}>
            <Item>
                {(text)&&
                    (text !== '')&&
                        <Typography variant={variant} component={component} textAlign={aling} mt={separation} >
                            <b>{text}</b>
                        </Typography>
                }
            </Item>
        </Grid>
    )
}