import Image from 'next/image'
import { useMediaQuery } from '@mui/material';
import Logo from '../../public/Logo.png'

export default function image({src, width, height, widthMatches, heightMatches,alt, click}){
    const matches    = useMediaQuery('(min-width:600px)');
    return (
        <Image onClick={click} src={(src)?src:Logo} width={(matches)?(width)?width:300:(widthMatches)?widthMatches:10} height={(matches)?(height)?height:200:(heightMatches)?heightMatches:10} alt={alt} /> 
    )
}