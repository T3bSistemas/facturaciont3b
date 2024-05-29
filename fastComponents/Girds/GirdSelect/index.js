import { Grid, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import Item from '../../Item'

export default function GirdSelect({ focused, fullWidth, inputLabel, id, value, action, items, disabled, xs, md, mt}){
    return (
        <Grid item xs={(xs)?xs:12} md={(md)?md:12} mt={(mt)?mt:0}>
            <Item>
                <FormControl variant='standard'  focused={focused} fullWidth={(fullWidth)?fullWidth:false}
                sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#141414',
                            fontSize:'19px'
                        },
                        '& .MuiInputBase-root:after': {
                            borderBottom: '1.5px solid #141414',
                        }
                }} disabled={(disabled)?disabled:false}>
                    <InputLabel id='usoCFDI' ><b>{inputLabel}</b></InputLabel>
                    <Select labelId={inputLabel} id={id} value={value}  onChange={action} label={inputLabel}>
                    {(items.length > 0)&&
                        items.map((item, index) => (
                            <MenuItem key={'Select'+index} value={item.value}>{item.item}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>                    
            </Item>
        </Grid>
    )
}