import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioGrups({label, radios, select, action}) {
  return (
    <FormControl>
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
                <FormControlLabel key={'for-con-'+index} value={radio.value} control={<Radio />} label={radio.label}/>
            ))
        }       
        </RadioGroup>
    </FormControl>
  );
}