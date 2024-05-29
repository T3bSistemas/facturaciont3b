
import {useMediaQuery}                              from '@mui/material';

export default function ImgTicket(){
    const matches         = useMediaQuery('(min-width:600px)');
    return ( 
        <img id="ticktePop" src="/ticket.png" alt={'ticket'} loading="lazy" width={(!matches)&&300} />       
    )
}