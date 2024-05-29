


import { useState } from "react";
import InfoOutlinedIcon                             from '@mui/icons-material/InfoOutlined';
import ImgTicket                                    from '../../UtilFunction/ImgTicket'
import {Popover, PopoverTrigger, PopoverContent}    from "@nextui-org/react";
import {useMediaQuery, Box}                              from '@mui/material';


export default function PopoverTicket(){
    const matches         = useMediaQuery('(min-width:600px)');
    const [open, setOpen] = useState(false)    
    return (
      <Popover key={(matches)?'right-end':'top-start'} placement={(matches)?'right-end':'top-start'} isOpen={open} triggerType={'left'}>
          <PopoverTrigger>
            <InfoOutlinedIcon  onMouseEnter={() => {setOpen(true)}} onMouseLeave={()=>{setOpen(false)}}/>
          </PopoverTrigger>          
          <PopoverContent>    
            <Box component="section" sx={{ p: 0, borderRadius: 2, boxShadow: 3}}>
              <ImgTicket/>
            </Box>     
          </PopoverContent>        
      </Popover>
    );
}