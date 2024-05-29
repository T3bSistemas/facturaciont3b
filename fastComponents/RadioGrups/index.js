import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RadioGrups({label, radios, select, action}) {
    const matches    = useMediaQuery('(min-width:600px)');
    return (
        <FormControl control={'Radio'} fullWidth={true}>
            {(label)&&
                <FormLabel id={label.split(' ').join('')}>{label}</FormLabel>
            }      
            <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={select}
                onChange={action}
                key={'RadioGrups'}
                
            >
            {
                radios.map((radio, index) => (
                    <FormControlLabel sx={{paddingRight: (matches)?'0px':(index===0)?'100px':'0px'}}  key={'for-con-'+index} value={radio.value} control={<Radio sx={{ position:'left', color: '#ED1E24','&.Mui-checked': {color: '#ED1E24',},}}/>} label={radio.label} />
                ))
            }    
            </RadioGroup>
        </FormControl>
    );
}