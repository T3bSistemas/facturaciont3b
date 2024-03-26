'use client'
import {useState}                                   from 'react'
import dayjs                                        from 'dayjs';
import axios                                        from 'axios';      

import { useFContext, useSetFContext  }             from '../../../FacUserProvider';
import { isNotAll, isNull, dataInteger, formatImp}  from '../../../UtilFunction/Util'
import {setSnackbar}                                from '../../../UtilFunction/OpenSnackbar'
import { validaCaptura, validaDatos }               from './Funciones'

import { Grid, Typography, Divider, 
         Popover, IconButton, Alert, Stack}         from '@mui/material';

import DeleteOutlineOutlinedIcon                    from '@mui/icons-material/DeleteOutlineOutlined';
import PostAddOutlinedIcon                          from '@mui/icons-material/PostAddOutlined';
import ContactSupportOutlinedIcon                   from '@mui/icons-material/ContactSupportOutlined';
import ReceiptOutlinedIcon                          from '@mui/icons-material/ReceiptOutlined';

import GridText                                     from '../../../fastComponents/Girds/GridText';
import GridTextFiled                                from '../../../fastComponents/Girds/GridTextFiled';
import GirdSelect                                   from '../../../fastComponents/Girds/GirdSelect';
import GirdDatePicker                               from '../../../fastComponents/Girds/GirdDatePicker';
import GridLoadingButton                            from '../../../fastComponents/Girds/GridLoadingButton';
import GirdBasicTable                               from '../../../fastComponents/Girds/GirdBasicTable';
import ModalTicket                                  from '../../../fastComponents/ModalTicket';  

const re = /^[0-9\b]+$/;
const rp = /^[0-9 .\b]+$/;
const rs = /^[A-Za-z0-9 ^|\b]+$/
const cr = /^[A-Za-z0-9 @<>ç%&(),;:"\b]+$/

export default function GenerateInvoices(){
    const fdata                     = useFContext()
    const setFdata                  = useSetFContext()
    const [actualizar,setActualizar]= useState(0)
    const [tickets,   setTickets]   = useState([])
    const [captura,   setCaptura]   = useState({fechaCompra: dayjs(new Date())?.format('YYYY-MM-DD'), tienda: 0, caja: '01', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}})
    const [input,     setInput]     = useState({rfc:'', correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {calle:'', numExt:'', numInt:'', colonia: '', munAlc: '', estado: '', pais:'', cp:''}})
    const [habilitar, setHabilitar] = useState(true)   
    const [anchorEl, setAnchorEl]   = useState(null);
    const open = Boolean(anchorEl);
    const [modal, setModal]         = useState(false);

    async function rfc(){
        setInput({rfc:input.rfc, correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {calle:'', numExt:'', numInt:'', colonia: '', munAlc: '', estado: '', pais:'', cp:''}})
        if(input.rfc !== ''){
            const patt = new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
            if(!patt.test(input.rfc)){
                setTimeout(function(){
                    setFdata({...fdata, snackbar: setSnackbar(fdata,'400-Válida tu RFC sea correcto')})
                }, 100);
            }         
        }
    }

    async function validateEmail(numCorreo){        
        if( (numCorreo === 1 && input.correo !== '') ||   (numCorreo === 2 && input.correo2 !== '') ){
            if (!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test((numCorreo===1)?input.correo:input.correo2))) {
                const valida = (numCorreo===1)?'400-Válida tu Correo sea correcto':'400-Válida tu Correo 2 sea correcto';
                setTimeout(function(){
                    setFdata({...fdata, snackbar: setSnackbar(fdata,valida)})
                }, 100);
            }
        }       
    }

    async function agregar(){
        if(tickets.length <= 50){
            const validaD= validaDatos(input)
            if(validaD === ''){
                const existeT = tickets.filter(function (ticket) {return ticket.fechaCompra === captura.fechaCompra && ticket.tienda === captura.tienda && ticket.caja === captura.caja && ticket.ticket === captura.ticket && ticket.total===captura.total });
                if(existeT.length <= 0){ 
                    const validaC = validaCaptura(captura)
                    if(validaC === '') {
                        setFdata({...fdata,loading: true})
                        await axios.post(process.env.NEXT_PUBLIC_API_TICK+'/t3b-fact-ticket/agregarTicket',captura ,fdata.header)
                        .then(function (response) {
                            if(response.data !== null && response.data !== ''){
                                if(response.data.folio != null && response.data.folio != ''){
                                    if(response.data.folio.includes('F:')){
                                        setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'EXIT')})
                                    }else if(response.data.folio.includes('S:')){
                                        setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'PRO')})
                                    }else if(response.data.folio.includes('VS:')){
                                        setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-(VLF)')})
                                    }else{
                                        setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-(VLF)')})
                                    }
                                }else{
                                    if(
                                    (response.data.tipoPago !== null && response.data.tipoPago != '') && 
                                    (response.data.region !== null && response.data.region != '') &&
                                    (parseFloat(response.data.total).toFixed(2) === parseFloat(captura.total).toFixed(2))
                                    ){
                                        if(response.data.total.tipoPago !== '2' && response.data.total.tipoPago !== '3' && response.data.total.tipoPago !== '7'){
                                            
                                            if(response.data.detalles.length  > 0){
                                                const TotalPS = response.data.detalles.filter(t => t.atmdesc === 'PS').reduce((acc, v) => acc += v.atmventa, 0);
                                                if(TotalPS > 0){                                                   
                                                    if(parseFloat(TotalPS).toFixed(2) === parseFloat(captura.total).toFixed(2)){
                                                        setFdata({...fdata,loading:false,  snackbar: setSnackbar(fdata,'NPS')}) 
                                                    }else{
                                                        setCaptura({...captura, tienda: 0, caja: '01', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}})
                                                        setTickets([...tickets,{fechaCompra: captura.fechaCompra, tienda: captura.tienda, caja: captura.caja, ticket: captura.ticket, total: parseFloat(parseFloat(captura.total)-parseFloat(TotalPS)).toFixed(2), accion: 'delete', region: response.data.region, conexion: response.data.conexion, tipoPago: response.data.tipoPago}])
                                                        setFdata({...fdata,loading:false,  snackbar: setSnackbar(fdata,'TKAPS')}) 
                                                        setHabilitar(false) 
                                                    }                                                    
                                                }else{
                                                    setCaptura({...captura, tienda: 0, caja: '01', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}})
                                                    setTickets([...tickets,{fechaCompra: captura.fechaCompra, tienda: captura.tienda, caja: captura.caja, ticket: captura.ticket, total: captura.total, accion: 'delete', region: response.data.region, conexion: response.data.conexion, tipoPago: response.data.tipoPago}])
                                                    setFdata({...fdata,loading:false,  snackbar: setSnackbar(fdata,'TKA')}) 
                                                    setHabilitar(false) 
                                                }                                
                                            }else{
                                                setFdata({...fdata,loading:false,  snackbar: setSnackbar(fdata,'NDET')}) 
                                            }                                    
                                        }else{
                                            setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'TKP')})
                                        }
                                    }else{
                                        setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'TKN')})
                                    }                                    
                                }                                                               
                            } else{
                                setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-(1)')})
                            }            
                        }).catch(function (error) {   
                            console.log(error)
                            if(error.response.status === 400){
                                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'400-'+error.response.data)})
                            } else{
                                setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-(0)')})
                            }                           
                        })
                    } else{
                        setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,validaC)})
                    }
                } else{
                    setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'TKYA')})
                }
            } else {
                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,validaD)})
            }
         }else{
            setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'TK50')})
        }
    }

    function quitar(index){
        try {
            setFdata({...fdata,loading: true}) 
            tickets.splice(index,1);
            setTickets((tickets.length > 0)?tickets:[]) 
            setActualizar(tickets.length);
        } catch (error) {
            console.log(error)
        } finally {
            setFdata({...fdata,loading: false})
        }        
    }
    

    async function generar(){
        if(tickets.length  > 0){
            const validaD= validaDatos(input)
            if(validaD === ''){
                const patt = new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
                if(patt.test(input.rfc)){
                    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(input.correo)) {
                        if ((/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(input.correo2)) || input.correo2 === '') {
                            setFdata({...fdata,loading: true})
                            await axios.post(process.env.NEXT_PUBLIC_API_TICK+'/t3b-fact-ticket/generarFactura',{
                                tickets: tickets,
                                fclientes: input
                            },fdata.header)
                            .then(function (response) {
                                const tikets = response.data;
                                if(tikets.length > 0){
                                    const errors = tikets.filter(function (tiket) {return  tiket.folio === null || tiket.folio === ''});
                                    if(errors.length === 0){                        
                                        setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'OK')}) 
                                        setTickets([])
                                    }else {                            
                                        if(errors[0].xml !== null){
                                            setFdata({...fdata,loading:false, snackbar:  {...fdata.snackbar,tipo:'ERROR', open:true, severity:'error',   message: errors[0].xml} })
                                        }else{
                                            setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'SEP')})
                                        }                  
                                    }                                    
                                }else{                        
                                    setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'ERRGEN')})
                                }                    
                            })
                            .catch(function (error) {
                                console.log(error);
                                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-TIKD')})
                            })                       
                        } else{
                            setTimeout(function(){
                                setFdata({...fdata, snackbar: setSnackbar(fdata,'400-Válida tu Correo 2 sea correcto')})
                            }, 100);
                        }                        
                    } else{
                        setTimeout(function(){
                            setFdata({...fdata, snackbar: setSnackbar(fdata,'400-Válida tu Correo sea correcto')})
                        }, 100);
                    }
                }else{
                    setTimeout(function(){
                        setFdata({...fdata, snackbar: setSnackbar(fdata,'400-Válida tu RFC sea correcto')})
                    }, 100);  
                }        
            }else {
                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,validaD)})
            }
            
        } else{
            setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'TKV')})
        }
    }
    
    return( 
        <Grid container >
            <GridText text={'BIENVENIDO A NUESTRO SISTEMA DE FACTURACIÓN'}                                                                             variant={'h5'} component={'h1'} aling='center' separation={2} xs={12} md={12}/>
            <GridText text={'Recuerda que el periodo de vigencia en la facturación no debe ser mayor a 30 días naturales en que se efectuó tu compra'} variant={'h8'} component={'h8'} aling='center' separation={0} xs={12} md={12}/>
            <Stack sx={{ width: '100%' }} spacing={2}>
               <Alert severity="info" >
                 Paso 1: Ingresa tus datos fiscales.<br></br>
                 Los campos marcados con * son obligatorios.
               </Alert>
            </Stack>
            <Grid item xs={12} md={12} mt={4}>
                <Grid container >
                    <GridText text={'Datos fiscales'} variant={'h6'} component={'h6'} aling='left' xs={12} md={12}/>
                </Grid> 
                <Grid container >
                    <GridTextFiled id={'rfc'}       label={(fdata.loading)?'Espera..':'RFC'}                   actionOnBlur={rfc}                                                                                               value={input.rfc}    action={({target})=>{setInput({...input,rfc:target.value.toUpperCase()});}}     variant={'standard'} focused={true} required={true} fullWidth={true}                                  error={(fdata.snackbar.tipo === 'R')}  disabled={fdata.loading} xs={6} md={4} />
                    <GridTextFiled id={'correo'}    label={(fdata.loading)?'Espera..':'Correo electrónico'}    actionOnBlur={()=>{  setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true); validateEmail(1);  }}  value={input.correo} action={({target})=>{setInput({...input,correo:target.value})}}  variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'correo@mail.com'}  error={(fdata.snackbar.tipo === 'C')}  disabled={fdata.loading} xs={6} md={4} />
                    <GirdSelect focused={true} fullWidth={true} inputLabel={(fdata.loading)?'Espera..':'Uso CFDI *'} id={'cfdi'} value={input.usoCFDI} action={(event)=>{setInput({...input,usoCFDI: event.target.value})}} items={fdata.usosCFDI} xs={6} md={4} />
                </Grid>
                <Grid container >
                    <GridTextFiled id={'nomraz'}    label={(fdata.loading)?'Espera..':'Nombre/Razón Social'}    actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}} value={input.razonSocial}    action={({target})=>{setInput({...input,razonSocial:target.value.toUpperCase()})}} variant={'standard'} focused={true} required={true} fullWidth={true}                                 error={(fdata.snackbar.tipo === 'S')}  disabled={fdata.loading}   inputProps={{ maxLength: 300 }} xs={6} md={4} />
                    <GridTextFiled id={'correo2'}   label={(fdata.loading)?'Espera..':'Correo electrónico 2'}   actionOnBlur={()=>{validateEmail(2);}}                                                                                                              value={input.correo2}        action={({target})=>{setInput({...input,correo2:target.value})}}     variant={'standard'} focused={true} required={false} fullWidth={true} placeholder={'correo@mail.com'}                                          disabled={fdata.loading}   xs={6} md={4} />
                    <GirdSelect focused={true} fullWidth={true} inputLabel={(fdata.loading)?'Espera..':'Régimen Fiscal *'} id={'regfis'} value={input.regimenFiscal} action={(event)=>{setInput({...input,regimenFiscal: event.target.value})}} items={fdata.RegimenesFiscales} xs={6} md={4} />
                </Grid>
                <Grid container >
                    <Grid item xs={0} md={8} /> 
                    <GridTextFiled id={'cp'}        label={(fdata.loading)?'Espera..':'Código Postal'}         actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}}  value={input.domicilio.cp}          action={({target})=>{(target.value === '' || re.test(target.value))&&setInput({...input,domicilio:{...input.domicilio,cp:target.value}})}}      variant={'standard'} focused={true} required={true}  fullWidth={true} disabled={fdata.loading} error={(fdata.snackbar.tipo === 'P')}  inputProps={{ maxLength: 5 }}   xs={12} md={4} />
                </Grid>
            </Grid>
            
            <GridText text={''} variant={'h6'} component={'h6'} aling='left' separation={3} xs={12} md={12} />
            <Stack sx={{ width: '100%' }} >
                <Alert severity="info" >
                    Paso 2: Ingresa la información de los tickets. <br></br>
                    Puedes agregar más de un ticket a una misma factura. Los tickets de una misma tienda se calculan en una sola factura. Consulta los campos aquí:
                    <IconButton aria-label="delete" onClick={()=>{setModal(true)}}>
                        <ContactSupportOutlinedIcon  onMouseEnter={(event) => {setAnchorEl(event.currentTarget);}} onMouseLeave={()=>{setAnchorEl(null);}}/>
                    </IconButton>      
                    <ModalTicket modal={modal} setModal={setModal}/>
                </Alert>
            </Stack>  

            <GridText text={'Información de Tickets'} variant={'h6'} component={'h6'} aling='left' separation={1} xs={12} md={12} />            
            <Grid item xs={12} md={12} mt={1}>
                <Grid container >
                    <GirdDatePicker label={'Fecha de compra *'}  fecha={captura.fechaCompra} accion={(newValue) => setCaptura({...captura,fechaCompra: dayjs(new Date(newValue))?.format('YYYY-MM-DD')})} focused={true} xs={6}  md={3} />
                    <GridTextFiled id={'tienda'}       label={(fdata.loading)?'Espera..':'Sucursal'}           actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}}  value={captura.tienda}   action={({target})=>{(target.value === '' || re.test(target.value))&&setCaptura({...captura,tienda:dataInteger(target.value)})}} variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'999'}         error={(fdata.snackbar.tipo === 'TND')}   inputProps={{ maxLength: 4 }}  xs={6}   md={2} />
                    {(fdata.loading === false)?
                    <GirdSelect    id={'caja'}  focused={true} fullWidth={true} inputLabel={(fdata.loading)?'Espera..':'No. de caja *'}  value={captura.caja} action={({target})=>{(target.value === '' || re.test(target.value))&&setCaptura({...captura,caja:target.value})}} items={[{value:'01',item:'01'},{value:'02',item:'02'},{value:'03',item:'03'},{value:'04',item:'04'},{value:'05',item:'05'},{value:'06',item:'06'},{value:'07',item:'07'},{value:'08',item:'08'},{value:'09',item:'09'},{value:'10',item:'10'}]} xs={6} md={2} />
                    :
                    <GridTextFiled id={'caja'}         label={(fdata.loading)?'Espera..':'No. de caja'}    value={captura.caja}    variant={'standard'} focused={true} required={true} fullWidth={true} disabled={true} placeholder={'09'}          error={((fdata.snackbar.tipo === 'CJA'))} inputProps={{ maxLength: 2 }}  xs={6}  md={2}/> 
                    }
                    <GridTextFiled id={'numTicket'}    label={(fdata.loading)?'Espera..':'No. de ticket'}      actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}}  value={captura.ticket}   action={({target})=>{(target.value === '' || re.test(target.value))&&setCaptura({...captura,ticket:dataInteger(target.value)})}} variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'999'}         error={(fdata.snackbar.tipo === 'TKT')}   inputProps={{ maxLength: 4 }}  xs={6}  md={2}/>
                    <GridTextFiled id={'importe'}      label={(fdata.loading)?'Espera..':'Importe compra'}     actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}}  value={captura.total}    action={({target})=>{(target.value === '' || rp.test(target.value))&&setCaptura({...captura,total:formatImp(target.value)})}}    variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'99999.99'}   error={(fdata.snackbar.tipo === 'TTL')}   inputProps={{ maxLength: 10 }}  xs={12}  md={3} autoComplete={'off'}/>
                </Grid>
            </Grid>

            <Grid item xs={2} md={8} />
            <GridLoadingButton label={'Limpiar'} click={()=>{setTickets([])}} loading={fdata.loading} variant={'outlined'} icon={<DeleteOutlineOutlinedIcon />} color={'error'}     fullWidth={false} disabled={false}      xs={5} md={2}/>
            <GridLoadingButton label={'Agregar'} click={agregar}              loading={fdata.loading} variant={'outlined'} icon={<PostAddOutlinedIcon />}       color={'success'}   fullWidth={false} disabled={habilitar}  xs={5} md={2}/>
            
            

            {(fdata.loading === false)&&
                <GirdBasicTable rows={tickets} colums={fdata.columsFactura} funcion={quitar} xs={12} md={12} mt={3}/>
            }
            <Grid item xs={2} md={9} />
            {(tickets.length > 0)&&               
             <GridLoadingButton label={'Generar Factura'} click={()=>{generar()}} loading={fdata.loading} variant={'outlined'} icon={<ReceiptOutlinedIcon />} color={'success'} fullWidth={false} size={'large'} disabled={false}      xs={10} md={3}/>
            }
        </Grid>
    )
}
