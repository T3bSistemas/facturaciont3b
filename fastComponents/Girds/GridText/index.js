import { Grid, Typography} from '@mui/material';

import Item from '../../Item'
export default function GridAll({text, variant, component, aling, separation, fontSize, xs, md, mt}){
    return(
        <Grid item xs={xs} md={md} mt={(mt)?mt:0}>
            <Item>
                {(text)&&
                    (text !== '')&&
                        <Typography variant={variant} component={component} textAlign={aling} mt={separation} sx={{fontSize: (fontSize)?fontSize:'16px'}}>
                            {text}
                        </Typography>
                }
            </Item>
        </Grid>
    )
}