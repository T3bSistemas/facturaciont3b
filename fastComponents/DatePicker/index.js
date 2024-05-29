import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from  '@mui/x-date-pickers/DatePicker';
import {  TextField} from '@mui/material';

export default function datePicker({label, fecha, accion, disabled, error, helperText}){
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} focused={true} >
            <DatePicker 
                disabled={disabled}
                disableFuture={true}
                shouldDisableDate={(dateParam) => {
                    const fechamenos30 = new Date();
                        fechamenos30.setDate(fechamenos30.getDate()-30)
                    const currentDate  = dateParam.toISOString().split("T")[0];
                    return fechamenos30 >= new Date(currentDate);
                }} 
                format={'YYYY/MM/DD'}  label={(disabled)?'Espera..':<b>{label}</b>} value={(fecha)?dayjs(fecha):null}  onChange={accion}
                slotProps={{
                    textField: {
                        variant: 'standard',
                        placeholder: 'YYYY/MM/DD',
                        readOnly: true,
                        error: (error)?true:false,
                        helperText: (helperText)?helperText:'',
                        focused: true,
                        required: true,
                        fullWidth: true
                    },
                }}
                sx={{
                    '& label.Mui-focused': {
                        color: '#141414',
                        fontSize:'19px'                                           
                    },
                    '& .MuiInputBase-root:after': {
                        borderBottom: '1.5px solid #141414',
                    }
                }}  
            />                
        </LocalizationProvider>
    )
}