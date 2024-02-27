import Link from 'next/link'
import { Grid, Typography} from '@mui/material';
import Item from '../../Item';
import Image from '../../Image';


export default function GridImage({infoAdd, src, width, height, widthMatches, heightMatches, alt, xs,md, separation, click, link}){
    return (
        <Grid item xs={(xs)?xs:12} md={(md)?md:12} mt={separation}>
            <Item>
                { (link != null && link != '')?
                <Link href={link}>
                    <Image src={src} width={width} height={height} widthMatches={widthMatches} heightMatches={heightMatches} alt={alt} click={click}/> 
                    <Typography style={{ color: "black" }}onClick={click} variant={'h4'} component={'h1'} textAlign={'center'} mt={1} >
                        <b>{(infoAdd)&&infoAdd}</b> 
                    </Typography>
                </Link>      
                :
                <>
                <Image src={src} width={width} height={height} widthMatches={widthMatches} heightMatches={heightMatches} alt={alt} click={click}/> 
                <Typography variant={'h4'} component={'h1'} textAlign={'center'} mt={1} >
                    <b>{(infoAdd)&&infoAdd}</b> 
                </Typography>                
                </>
                }
            </Item>
        </Grid>
    )
}