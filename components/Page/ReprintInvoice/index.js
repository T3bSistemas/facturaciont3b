import { useState }                 from 'react';  
import axios                        from 'axios'

import { Grid,Alert, Stack}         from '@mui/material';


import { useFContext, 
        useSetFContext  }           from "../../../FacUserProvider";
import GridText                     from '../../../fastComponents/Girds/GridText';
import GridTextFiled                from '../../../fastComponents/Girds/GridTextFiled';
import GridLoadingButton            from '../../../fastComponents/Girds/GridLoadingButton';
import GridRadioGrups               from '../../../fastComponents/Girds/GridRadioGrups';
import GirdBasicTable               from '../../../fastComponents/Girds/GirdBasicTable';
import {mensajes}                   from '../../../UtilFunction/Mensajes'

const colums=[
    {value: 'Folio'},
    {value: 'Fecha Factura'},
    {value: 'UUID'},
    {value: 'Archivo PDF'},
    {value: 'Archivo XML'},
    {value: 'Enviar por correo'},
]

export default function ReprintInvoice(){
    const fdata                     = useFContext();
    const setFdata                  = useSetFContext();
    const [input, setInput]         = useState({tipo: 2, folio:0, serie:'', rfc:''})     
    const [rows, setRows]           = useState([])
    const [correos, setCorreos]     = useState({to:'', toReply: ''})
    const [mensaje, setMenasaje]    = useState(mensajes(0))
    const mensajesbuscar            = [31, 32, 33, 36, 37]

    function buscar(){
        setMenasaje(mensajes(0))
        setRows([])            
        if( (input.tipo === 1 && input.folio > 0 && input.serie !== '') || (input.tipo === 2)){
            if( (input.tipo === 2 && input.rfc !== '') || (input.tipo === 1)){
                setFdata({...fdata,loading: true})   
                axios.post(process.env.NEXT_PUBLIC_API_DASH+'/t3b-fact-das/reimpresion'
                ,input
                ,fdata.header)
                .then(function (response) {
                    if(response.data.length > 0){
                        const dataRfc = [];
                        response.data.forEach((factura) =>{
                            dataRfc.push({folio: (input.tipo === 1)?input.serie+' '+factura.folio_factura:factura.serie+' '+factura.folio_factura , fechaFactura:factura.fecha_factura, uuid: factura.uuid, accion:'impPDF', accion2:'impXML', accion3:'mail', xmlBase64:factura.xmlBase64, pdfBase64:factura.pdfBase64 })
                        } );
                        setRows(dataRfc)                                 
                    } else{
                        setMenasaje(mensajes(32))
                    }          
                })
                .catch(function (error) {
                    setMenasaje(mensajes(31))
                }).finally(function(){
                    setFdata({...fdata,loading: false})  
                })
            }else{
                setMenasaje(mensajes(28))             
            }           
        }else{
            if(input.folio === 0){
                setMenasaje(mensajes(29))
            }else{
                setMenasaje(mensajes(30))
            }           
        }       
    }

    async function enviarEmail(factura){ 
        setMenasaje(mensajes(0))      
        if(factura.uuid !== ''){
            if(correos.to !== '' && correos.to.includes('@')){                
                if( (correos.toReply === '') || (correos.toReply !== '' && correos.toReply.includes('@'))){   
                    setFdata({...fdata,loading: true})                
                    await axios.post(process.env.NEXT_PUBLIC_API_DASH+'/t3b-fact-das/correo'
                    ,{}
                    ,{...fdata.header, params: { uuid: factura.uuid , to: correos.to, toReply: correos.toReply }})
                    .then(function (response) {
                        if(response.data){
                            setMenasaje(mensajes(37))
                        }else{
                            setMenasaje(mensajes(36))
                        }
                    })
                    .catch(function (error) {
                        setMenasaje(mensajes(36))
                    }).finally(function(){
                        setFdata({...fdata,loading: false})  
                    })
                }else{
                    setMenasaje(mensajes(35))
                }
            }else{
                setMenasaje(mensajes(34))
            }
        } else{
            setMenasaje(mensajes(33))
        }
    }

    return (
        <Grid container mt={8}>
            <GridText text={<b>Reimpresión y descarga de Facturas ​📩​</b>} variant={'h5'} component={'h1'} aling='center' separation={0} fontSize={'22px'} xs={12} md={12}/>
            <GridText text={<>Recuerda que solo tienes <b>30 días naturales</b> desde que realizaste la compra para solicitarlas ​​😬​</>}   variant={'h6'} component={'h6'} aling='center' separation={0} xs={12} md={12}/>
            
            <Grid item xs={12} md={12} mt={4}>
                <GridText text={<h4>Buscar facturas</h4>} variant={'h6'} component={'h6'} aling='left' xs={12} md={12}/>
            </Grid>
            <GridRadioGrups radios={[{label:'RFC', value:2},{label:'Folio Factura', value:1}]} select={input.tipo} action={({target})=>{setInput({...input,tipo:parseInt(target.value)});  setRows([]);}} xs={12} md={3}/>
            {(input.tipo === 1)?
                <>
                <GridTextFiled id={'serie'}                  label={'Serie'} value={input.serie} action={({target})=>{setInput({...input,serie:target.value.toUpperCase()})}}                       variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'AAA'} error={(mensaje.id === 30)} helperText={(mensaje.id === 30)&&mensaje.mensaje} xs={12} md={3} mt={2}/>
                <GridTextFiled id={'folio'} type={'number'}  label={'Folio'} value={input.folio} action={({target})=>{setInput({...input,folio:(target.value === '')?0:parseInt(target.value)})}}   variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'123'} error={(mensaje.id === 29)} helperText={(mensaje.id === 29)&&mensaje.mensaje} xs={12} md={3} mt={2}/>
                </>
                :
                (input.tipo === 2)&&
                <GridTextFiled id={'rfcR'}  label={'RFC'}   value={input.rfc}   action={({target})=>{setInput({...input,rfc:target.value.toUpperCase()})}} variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'RFC'} error={(mensaje.id === 28)} helperText={(mensaje.id === 28)&&mensaje.mensaje} xs={12} md={6} mt={2}/>
            }   
            <Grid item xs={0} md={1} mt={2}></Grid> 
            <GridLoadingButton label={'Buscar'} click={buscar} loading={fdata.loading} variant={'contained'}  color={'error'} fullWidth={true} size={'medium'} xs={12} md={2} mt={2}/>
           {(mensajesbuscar.includes(mensaje.id))&&
            <Grid item xs={12} md={12} mt={1}>
                <Grid container >
                    <Grid item xs={0} md={6} />
                    <Grid item xs={12} md={6} >
                        <Alert severity={mensaje.severity} onClose={() => {setMenasaje(mensajes(0))}}>{mensaje.mensaje}</Alert>
                    </Grid>                       
                </Grid>
            </Grid>
            }
            
            

            {(rows.length > 0)?                                               
                <Grid container mt={1}>
                    <Grid item xs={12} md={12} mt={4}>
                        <GridText text={<h4>Facturas localizadas</h4>} variant={'h6'} component={'h6'} aling='left' xs={12} md={12}/>
                    </Grid>
                    <Grid container >
                        <Grid item xs={12} md={12}>
                            <Stack sx={{ width: '100%' }}>
                                <Alert severity="info" sx={{color: '#000000'}}>
                                        <b>Agrega el correo electrónico al que te enviaremos las facturas</b><br></br>
                                        Puedes agregar dos opciones 🙂​.
                                </Alert>
                            </Stack>
                        </Grid>
                    </Grid>
                    <GridTextFiled id={'mail'}   value={correos.to}        action={({target})=>{setCorreos({...correos, to:target.value})}}      label={'Correo electrónico'}   variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'correo1@mail.com'} error={(mensaje.id === 34)} helperText={(mensaje.id === 34)&&mensaje.mensaje} xs={12} md={5.6} mt={2}/>
                    <Grid item xs={1} md={0.5} />
                    <GridTextFiled id={'mail2'}  value={correos.toReply}   action={({target})=>{setCorreos({...correos, toReply:target.value})}} label={'Correo electrónico 2'}  variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'correo2@mail.com'} error={(mensaje.id === 35)} helperText={(mensaje.id === 35)&&mensaje.mensaje} xs={12} md={5.6} mt={2}/>
                    <Grid item xs={12} md={12} mt={5}/>
                    <GirdBasicTable rows={rows} colums={colums} funcion={enviarEmail}xs={12} md={12} mt={3}/>
                </Grid>
                :
                <Grid container mt={8}> </Grid>
            }            
        </Grid>
    )
}