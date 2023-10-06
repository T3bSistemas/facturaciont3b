import { useState }                 from 'react';  
import axios                        from 'axios'

import { Grid }                     from '@mui/material';
import ManageSearchOutlinedIcon     from '@mui/icons-material/ManageSearchOutlined';
import FileDownloadOutlinedIcon     from '@mui/icons-material/FileDownloadOutlined';
import ForwardToInboxOutlinedIcon   from '@mui/icons-material/ForwardToInboxOutlined';

import { useFContext, 
        useSetFContext  }           from "../../../FacUserProvider";
import GridText                     from '../../../fastComponents/Girds/GridText';
import GridTextFiled                from '../../../fastComponents/Girds/GridTextFiled';
import GridLoadingButton            from '../../../fastComponents/Girds/GridLoadingButton';
import GridLoadingButtonDow         from '../../../fastComponents/Girds/GridLoadingButton/GridLoadingButtonDow';
import GridRadioGrups               from '../../../fastComponents/Girds/GridRadioGrups';
import GirdBasicTable               from '../../../fastComponents/Girds/GirdBasicTable';
import {setSnackbar}                from '../../../UtilFunction/OpenSnackbar'

const colums=[
    {value: 'Folio'},
    {value: 'Fecha Factura'},
    {value: 'UUID'},
    {value: 'PDF'},
    {value: 'XML'},
    {value: 'MAIL'},
]

export default function ReprintInvoice(){
    const fdata                     = useFContext();
    const setFdata                  = useSetFContext();
    const [input, setInput]         = useState({tipo: 1, folio:0, serie:'', rfc:''})     
    const [rows, setRows]           = useState([])

    function buscar(){
        setFdata({...fdata,loading: true})       
        if( (input.tipo === 1 && input.folio > 0 && input.serie !== '') || (input.tipo === 2)){
            if( (input.tipo === 2 && input.rfc !== '') || (input.tipo === 1)){
                axios.post('https://t3b-facturacion-das.azurewebsites.net/t3b-fact-das/reimpresion'
                ,input
                ,fdata.header)
                .then(function (response) {
                    if(response.data.length > 0){
                        if(input.tipo === 1){
                            var hash = {};
                            const data = response.data.filter(function(current) {
                                var exists = !hash[current.uuid];
                                hash[current.uuid] = true;
                                return exists;
                            });
                            setRows(data)
                        } else {
                            const dataRfc = [];
                            response.data.forEach((factura) =>{
                                dataRfc.push({folio: factura.serie+' '+factura.folio_factura , fechaFactura:factura.fecha_factura, uuid: factura.uuid, accion:'impPDF', accion2:'impXML', accion3:'mail', xmlBase64:factura.xmlBase64, pdfBase64:factura.pdfBase64 })
                            } );
                            setRows(dataRfc)                            
                        }
                        setFdata({...fdata,loading: false})  
                    }else{
                        setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'SNR')})
                    }          
                })
                .catch(function (error) {
                    console.log(error);
                    setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'SEP')})
                })
                .finally(function () {
                   
                });
            }else{
                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'IRFC')})
            }           
        }else{
            if(input.folio === 0){
                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'IFOL')})
            }else{
                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'ISER')})
            }           
        }       
    }

    function enviarEmail(factura){
        alert(factura.uuid)
    }

    return (
        <Grid container mt={8}>
            <GridText text={'BIENVENIDO A NUESTRO SISTEMA DE FACTURACIÓN'}                                                                                      variant={'h5'} component={'h1'} aling='center' separation={0} xs={12} md={12}/>
            <GridText text={'El periodo de vigencia para reimpresión o reenvio de factura no debe ser mayor a 30 días naturales en que se efectuó su compra'}   variant={'h6'} component={'h6'} aling='center' separation={0} xs={12} md={12}/>
            <GridText text={'Impresión y Envío de Facturas'}   variant={'h6'} component={'h6'} aling='center' separation={0} xs={12} md={12}/>
            <GridRadioGrups radios={[{label:'Factura', value:1},{label:'RFC', value:2}]} select={input.tipo} action={({target})=>{setInput({...input,tipo:parseInt(target.value)});  setRows([]);}} xs={12} md={3}/>
            {(input.tipo === 1)?
                <>
                <GridTextFiled id={'folio'} type={'number'}  label={'Folio'} value={input.folio} action={({target})=>{setInput({...input,folio:(target.value === '')?0:parseInt(target.value)})}}   variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'123'} error={(fdata.snackbar.tipo === 'IFOL')} xs={12} md={3} />
                <GridTextFiled id={'serie'}                  label={'Serie'} value={input.serie} action={({target})=>{setInput({...input,serie:target.value.toUpperCase()})}}                                     variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'AAA'} error={(fdata.snackbar.tipo === 'ISER')} xs={12} md={3} />
                </>
                :
                (input.tipo === 2)&&
                <GridTextFiled id={'rfcR'}  label={'RFC'}   value={input.rfc}   action={({target})=>{setInput({...input,rfc:target.value.toUpperCase()})}} variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'RFC'} error={(fdata.snackbar.tipo === 'IRFC')} xs={12} md={6} />
            }    

            <GridLoadingButton label={'Buscar Folios'} click={buscar} loading={fdata.loading} variant={'contained'} icon={<ManageSearchOutlinedIcon />} color={'info'} fullWidth={false} size={'medium'} xs={12} md={3}/>
     
            {(rows.length > 0)?
                (input.tipo === 1)?  
                    rows.map((row, index) => (
                        <Grid key={index} container mt={8}>
                            <GridText text={'Factura'}  variant={'h6'} component={'h6'} aling='center' separation={0} xs={2} md={2}/>
                            <GridText text={row.uuid}     variant={'h6'} component={'h6'} aling='center' separation={0} xs={10} md={10}/>
                            <Grid item xs={0} md={3}></Grid> 
                            {/* <GridLoadingButton    label={'Enviar'}         click={buscar} loading={false} variant={'contained'} icon={<ForwardToInboxOutlinedIcon />}    color={'info'} fullWidth={false} size={'medium'} xs={12} md={2}/> */}
                            <GridLoadingButtonDow label={'Descargar XML'}  click={()=>{}} loading={false} variant={'contained'} icon={<FileDownloadOutlinedIcon />}   color={'info'} fullWidth={false} docName={row.uuid+'.xml'} href={'data:image/xml;base64,'+row.xmlBase64} size={'medium'} xs={12} md={2}/>
                            <GridLoadingButtonDow label={'Descargar PDF'}  click={()=>{}} loading={false} variant={'contained'} icon={<FileDownloadOutlinedIcon />}   color={'info'} fullWidth={false} docName={row.uuid+'.PDF'} href={'data:image/xml;base64,'+row.pdfBase64} size={'medium'} xs={12} md={2}/>
                            <Grid item xs={0} md={3}></Grid>  
                        </Grid> 
                    ))
                    :                                
                    <Grid container mt={8}>
                        <GridTextFiled id={'mail'}   label={'Correo Electronico'}   variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'correo1@mail.com'} xs={12} md={6} />
                        <GridTextFiled id={'mail2'}  label={'Correo electronico2'}  variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'correo2@mail.com'} xs={12} md={6} />
                        <GirdBasicTable rows={rows} colums={colums} funcion={enviarEmail}xs={12} md={12} mt={3}/>
                    </Grid>
                :
                <Grid container mt={8}> </Grid>
            }            
        </Grid>
    )
}