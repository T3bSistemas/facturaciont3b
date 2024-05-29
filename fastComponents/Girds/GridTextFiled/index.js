import { Grid, TextField} from '@mui/material';
import Item from '../../Item'
import {getNumberAlet} from '../../../UtilFunction/Mat'

export default function GridTextFiled({id, type, label, value, action, actionOnBlur, variant, focused, required, fullWidth, placeholder, error, helperText, disabled, inputProps, xs, md, mt, spacing , autoComplete}){
    return (
        <Grid item xs={(xs)?xs:12} md={(md)?md:12} spacing={(spacing)?spacing:0} mt={(mt)?mt:0}>
            <Item>
                <TextField type={(type)?type:'text'} id={(id)?id:'text-'+(getNumberAlet(999,100,3))} label={(label)?<b>{label}</b>:''} value={(value)?value:''} onChange={action} variant={(variant)?variant:'outlined'} focused={(focused)?focused:false} required={(required)?required:false} fullWidth={(fullWidth)?fullWidth:false} placeholder={(placeholder)?placeholder:''} error={(error)?error:false} onBlur={(actionOnBlur)&&actionOnBlur} disabled={(disabled)?disabled:false}
                sx={{
                    '& label.Mui-focused': {
                        color: '#141414',
                        fontSize:'19px'                                      
                    },
                    '& .MuiInputBase-root:after': {
                        borderBottom: '1.5px solid #141414',
                    }
                }}                
                inputProps={(inputProps)?inputProps:{}}
                autoComplete={(autoComplete)?autoComplete:'on'}
                helperText={(helperText)?helperText:''}
                />
            </Item>
        </Grid>
    )
}