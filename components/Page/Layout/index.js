'use client'
import {Fragment}                   from 'react';

import PropTypes                    from 'prop-types';

import {
Container, Grid, AppBar, 
Toolbar, useScrollTrigger, 
Slide, CssBaseline,
useMediaQuery}     from '@mui/material';
import ArrowBackIosNewOutlinedIcon  from '@mui/icons-material/ArrowBackIosNewOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
        <AppBar style={{background : '#FFFFFF'}} elevation={2}>
          <Toolbar>
            <Grid container  mt={1} my={1.5}>
              <Grid item xs={0} md={1} />
              <GridLoadingButton label={'Regresar'} click={()=>{setPage('inicio')}} loading={(page === 'inicio')} variant={'outlined'} icon={<ArrowBackIosNewOutlinedIcon sx={{color:'#ED1E24'}}/>} color={'error'} fullWidth={true}  xs={4.5} md={1.5}/>
              <Grid item xs={7.5} md={9.5}/>
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