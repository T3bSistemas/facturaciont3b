import { Grid} from '@mui/material';
import Item from '../../Item';
import Image from '../../Image';

export default function GridImage({infoAdd, src, width, height, widthMatches, heightMatches, alt, xs,md, separation, click}){
    return (
        <Grid item xs={(xs)?xs:12} md={(md)?md:12} mt={separation}>
            <Item>
                <Image src={src} width={width} height={height} widthMatches={widthMatches} heightMatches={heightMatches} alt={alt} click={click}/> 
                {(infoAdd)&&infoAdd}
            </Item>
        </Grid>
    )
}