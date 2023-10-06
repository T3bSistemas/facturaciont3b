'use client'
import {Fragment}                   from 'react';

import PropTypes                    from 'prop-types';

import {
Container, Grid, AppBar, 
Toolbar, useScrollTrigger, 
Slide, CssBaseline,
useMediaQuery}     from '@mui/material';
import ArrowBackIosNewOutlinedIcon  from '@mui/icons-material/ArrowBackIosNewOutlined';
import HelpIcon                     from '@mui/icons-material/Help';

import Logo                         from '../../../public/Logo.png'

import GridLoadingButton            from '../../../fastComponents/Girds/GridLoadingButton';
import GridImage                    from '../../../fastComponents/Girds/GridImage';
import ReprintInvoice               from '../ReprintInvoice'
import GenerateInvoices             from '../GenerateInvoices'
import FrequentQuestions            from '../FrequentQuestions'

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Leyout({props, page, setPage}) {
  const matches    = useMediaQuery('(min-width:600px)');
  return (
    <Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="transparent">
          <Toolbar>
            <Grid container spacing={2}>
              <Grid item xs={0} md={1}></Grid>
                <GridLoadingButton label={<b>Inicio</b>}                             click={()=>{setPage('inicio')}} loading={(page === 'inicio')}    variant={'elevated'} icon={<ArrowBackIosNewOutlinedIcon />}   fullWidth={true} size={(matches)?'large':'large'} xs={2} md={2}/>
                <Grid item xs={7} md={5}></Grid>
                {/* <GridImage src={Logo} width={50} height={50} widthMatches={50} heightMatches={50} alt={'Logo'} xs={4} md={4}/> */}
                <GridLoadingButton label={<b>Preguntas Frecuentes <HelpIcon /></b>}  click={()=>{setPage('PF')}}     loading={(page === 'contained')} variant={'elevated'}                                          fullWidth={true} size={(matches)?'large':'large'} xs={3} md={3}/>
              <Grid item xs={0} md={1}></Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
            {(page === 'OF')?
                <GenerateInvoices/>
                :
                (page === 'RF')?
                    <ReprintInvoice />
                    :
                    (page === 'PF')&&
                        <FrequentQuestions/>
            }
      </Container>
    </Fragment>
  );
}