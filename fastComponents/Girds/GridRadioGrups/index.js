import { Grid} from '@mui/material';
import Item from '../../Item'
import RadioGroup from '../../RadioGrups';
export default function ({label, radios, select, action, xs, md}){
    return (
        <Grid item xs={(xs)?xs:12} md={(md)?md:12}>
            <Item>
                <RadioGroup label={label} radios={radios} select={select} action={action}/>
            </Item>
        </Grid>
    )
}