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

import GridLoadingButton            from '../../../fastComponents/Girds/GridLoadingButton';
import ReprintInvoice               from '../ReprintInvoice'
import GenerateInvoices             from '../GenerateInvoices'
import FrequentQuestions            from '../FrequentQuestions'
import Aviso                        from '../Aviso/aviso';

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
        <AppBar style={{background : '#EBEAEA'}}>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item xs={0} md={1} />
              <GridLoadingButton label={<b>Inicio</b>}                             click={()=>{setPage('inicio')}} loading={(page === 'inicio')}    variant={'outlined'} icon={<ArrowBackIosNewOutlinedIcon />} color={'error'} fullWidth={true} size={(matches)?'large':'large'} xs={5} md={2}/>
              <Grid item xs={1} md={5}/>
              <GridLoadingButton label={(matches)?<b>Preguntas Frecuentes <HelpIcon /></b>:<HelpIcon />}  click={()=>{setPage('PF')}}     loading={(page === 'contained')} variant={'outlined'}                                        color={'error'} fullWidth={true} size={(matches)?'large':'large'} xs={5} md={3}/>
              <Grid item xs={1} md={1}/>
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
                    (page === 'PF')?
                        <FrequentQuestions/>
                        :
                        (page === 'AV')&&
                          <Aviso/>
            }
      </Container>
    </Fragment>
  );
}