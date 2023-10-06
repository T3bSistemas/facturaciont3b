import { Grid, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import Item from '../../Item'

export default function GirdSelect({ focused, fullWidth, inputLabel, id, value, action, items}){
    return (
        <Grid item xs={6} md={3}>
            <Item>
                <FormControl variant='standard'  focused={focused} fullWidth={(fullWidth)?fullWidth:false}
                sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                        color: '#141414'
                        },
                        '& .MuiInputBase-root:after': {
                            borderBottom: '1.5px solid #141414',
                        }
                }}>
                    <InputLabel id='usoCFDI' >{inputLabel}</InputLabel>
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