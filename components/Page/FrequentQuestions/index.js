import * as React from 'react';
import { useFContext  } from "../../../FacUserProvider";

import {Grid, Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import GridText from '../../../fastComponents/Girds/GridText';

export default function FrequentQuestions(){
    const fdata                                  = useFContext();
    return (
        <Grid container mt={8}>
            <GridText text={<b>Preguntas Frecuentes</b>} variant={'h4'} component={'h1'} aling='center' separation={2} xs={12} md={12}/>
            <Grid item xs={12} md={12} mt={4}>
                {fdata.questions.map((question) => (
                    <Accordion mt={8} key={question.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id={'panel-'+question.id}>
                            <Typography><b>{question.question}</b></Typography>
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