import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from  '@mui/x-date-pickers/DatePicker';
function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

export default function datePicker({label, fecha, accion}){
    function sumarDias(fecha, dias){
        alert(fecha.getDate())
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      }
      

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker  
            shouldDisableDate={(dateParam) => {
                const fechamenos30 = new Date();
                      fechamenos30.setDate(fechamenos30.getDate()-41)
                const currentDate  = dateParam.toISOString().split("T")[0];
                return fechamenos30 >= new Date(currentDate);
            }} 
            format={'YYYY/MM/DD'}  label={label} value={(fecha)?dayjs(fecha):dayjs(new Date())}  onChange={accion} 
                 sx={{
                     '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                         borderColor: '#f7f2f200' ,
                     } ,
                     '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root': {
                         color: '#141414'                           
                     },
                     '& .MuiInputBase-root': {
                         borderBottom: '1.5px solid #141414',
                     },                
                 }}
                 fullWidth={true}
            />
        </LocalizationProvider>
    )
}