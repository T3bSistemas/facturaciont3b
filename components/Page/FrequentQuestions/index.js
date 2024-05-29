import * as React from 'react';
import { useFContext  } from "../../../FacUserProvider";

import {Grid, Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import GridText from '../../../fastComponents/Girds/GridText';

export default function FrequentQuestions(){
    const fdata                                  = useFContext();
    return (
        <Grid container mt={8}>
            <GridText text={<b>Preguntas Frecuentes ​🧐​</b>} variant={'h5'} component={'h1'} aling='center' fontSize={'22px'} separation={2} xs={12} md={12}/>
            <GridText text={<>Mira las preguntas que nos han hecho con anterioridad, quizá ya tenemos una respuesta para ti 🙌</>} variant={'h6'} component={'h6'} aling='center' separation={2} xs={12} md={12}/>
            <Grid item xs={12} md={12} mt={4}>
                {fdata.questions.map((question) => (
                    <Accordion mt={8} key={question.id} sx={{borderBottom: 'solid'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon fontSize={'large'} color={'error'} sx={{color:'#ED1E24'}}/>} aria-controls='panel1a-content' id={'panel-'+question.id}>
                            <Typography mt={2}><b>{question.question}</b></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {question.details}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}            
            </Grid>
        </Grid>
    )
}