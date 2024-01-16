'use client'
import {useState}                                   from 'react'
import dayjs                                        from 'dayjs';
import axios                                        from 'axios';      

import { useFContext, useSetFContext  }             from '../../../FacUserProvider';
import { isNotAll, isNull, dataInteger, formatImp}  from '../../../UtilFunction/Util'
import {setSnackbar}                                from '../../../UtilFunction/OpenSnackbar'
import { validaCaptura, validaDatos }               from './Funciones'

import { Grid, Typography, Accordion, Box ,
         AccordionSummary, AccordionDetails, 
         Popover, IconButton}               from '@mui/material';

import ExpandMoreIcon                               from '@mui/icons-material/ExpandMore';
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

export default function GenerateInvoices(){
    const fdata                     = useFContext()
    const setFdata                  = useSetFContext()
    const [actualizar,setActualizar]= useState(0)
    const [tickets,   setTickets]   = useState([])
    const [captura,   setCaptura]   = useState({fechaCompra: dayjs(new Date())?.format('YYYY-MM-DD'), tienda: 0, caja: '', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}})
    const [input,     setInput]     = useState({rfc:'', correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {calle:'', numExt:'', numInt:'', colonia: '', munAlc: '', estado: '', pais:'', cp:''}})
    const [habilitar, setHabilitar] = useState(true)   
    const [anchorEl, setAnchorEl]   = useState(null);
    const open = Boolean(anchorEl);
    const [modal, setModal]         = useState(false);

    async function rfc(){
        if(input.rfc !== ''){
            setFdata({...fdata,loading: true})
            setInput({rfc:'', correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {calle:'', numExt:'', numInt:'', colonia: '', munAlc: '', estado: '', pais:'', cp:''}})
            await axios.post('https://appdashboard3b.azurewebsites.net/t3b-fact-das/cliente',{},{...fdata.header, params: { rfc: input.rfc } })
            .then(function (response) {
                const cliente =  response.data;
                if(cliente){
                    const datos = {rfc: isNull(cliente.rfc), correo: isNull(cliente.correo), razonSocial: isNull(cliente.razonSocial), correo2: isNull(cliente.correo2), usoCFDI: (isNotAll(cliente.usoCFDI))?cliente.usoCFDI:fdata.usosCFDI[0].value, regimenFiscal: (isNotAll(cliente.regimenFiscal))?cliente.regimenFiscal:fdata.RegimenesFiscales[0].value, domicilio: {calle: isNull(cliente.domicilio.calle), numExt: isNull(cliente.domicilio.numExt), numInt: isNull(cliente.domicilio.numInt), colonia: isNull(cliente.domicilio.colonia), munAlc: isNull(cliente.domicilio.munAlc), estado: isNull(cliente.domicilio.estado), pais: isNull(cliente.domicilio.pais), cp: isNull(cliente.domicilio.cp)}}
                    setInput(datos)    
                    setHabilitar( (validaCaptura(captura) === '')?(validaDatos(datos) === '')?false:true:true)
                    setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'RFCR')})
                } else{
                    setInput({...input, correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {calle:'', numExt:'', numInt:'', colonia: '', munAlc: '', estado: '', pais:'', cp:''}})
                    setFdata({...fdata,loading: false})
                }
            }).catch(function (error) {
                console.log(error);
                setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'RFCE')})
            })
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
                        //await axios.post('https://ticketfact.t3b.mx/t3b-fact-ticket/agregarTicket',captura ,fdata.header)
                        await axios.post('https://appticktpt3b.azurewebsites.net/t3b-fact-ticket/agregarTicket',captura ,fdata.header)
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
                                            setTickets([...tickets,{fechaCompra: captura.fechaCompra, tienda: captura.tienda, caja: captura.caja, ticket: captura.ticket, total: captura.total, accion: 'delete', region: response.data.region, conexion: response.data.conexion, tipoPago: response.data.tipoPago}])
                                            setCaptura({...captura, tienda: 0, caja: '', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}})
                                            setFdata({...fdata,loading:false,  snackbar: setSnackbar(fdata,'TKA')})      
                                            setHabilitar(false)                                 
                                        }else{
                                            setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'TKP')})
                                        }
                                    }else{
                                        setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'TKN')})
                                    }                                    
                                }                                                               
                            } else{
                                setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-(TNULL)')})
                            }            
                        }).catch(function (error) {                            
                            setFdata({...fdata, loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-(SER)')})
                            console.log(error)
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
                setFdata({...fdata,loading: true})
                //await axios.post('http://localhost:8081/t3b-fact-ticket/generarFactura',{
                await axios.post('https://appticktpt3b.azurewebsites.net/t3b-fact-ticket/generarFactura',{
                    tickets: tickets,
                    fclientes: input
                },fdata.header)
                .then(function (response) {
                    const tikets = response.data;
                    if(tikets.length > 0){
                        const errors = tikets.filter(function (tiket) {return  tiket.folio === null || tiket.folio === ''});
                        if(errors.length === 0){                        
                            setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'OK')})                      
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
                    setTickets([])
                })
                .catch(function (error) {
                    console.log(error);
                    setFdata({...fdata,loading:false, snackbar: setSnackbar(fdata,'ERRAGREGAR-TIKD')})
                })
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
            <GridText text={'Recuerda que el periodo de vigencia en la facturación no debe ser mayor a 30 días naturales en que se efectuó su compra'} variant={'h6'} component={'h6'} aling='center' separation={0} xs={12} md={12}/>
            
            <Grid item xs={0} md={1}/>
                <GridTextFiled id={'rfc'}       label={(fdata.loading)?'Espera..':'R:F:C'}                 actionOnBlur={rfc}                                                                                               value={input.rfc}    action={({target})=>{setInput({...input,rfc:target.value.toUpperCase()})}}     variant={'standard'} focused={true} required={true} fullWidth={true}                                  error={(fdata.snackbar.tipo === 'R')}  disabled={fdata.loading} xs={6} md={3} />
                <GridTextFiled id={'correo'}    label={(fdata.loading)?'Espera..':'Correo electrónico'}    actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}}  value={input.correo} action={({target})=>{setInput({...input,correo:target.value})}}  variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'correo@mail.com'}  error={(fdata.snackbar.tipo === 'C')}  disabled={fdata.loading} xs={6} md={3} />
                <GirdSelect focused={true} fullWidth={true} inputLabel={(fdata.loading)?'Espera..':'Uso CFDI *'} id={'cfdi'} value={input.usoCFDI} action={(event)=>{setInput({...input,usoCFDI: event.target.value})}} items={fdata.usosCFDI}/>
            <Grid item xs={1.5} md={2}/>

            <Grid item xs={0} md={1}/>
                <GridTextFiled id={'nomraz'}    label={(fdata.loading)?'Espera..':'Nombre/Razon Social'}    actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}} value={input.razonSocial}    action={({target})=>{setInput({...input,razonSocial:target.value.toUpperCase()})}} variant={'standard'} focused={true} required={true} fullWidth={true}                                 error={(fdata.snackbar.tipo === 'S')}  disabled={fdata.loading}   xs={6} md={3} />
                <GridTextFiled id={'correo2'}   label={(fdata.loading)?'Espera..':'Correo electrónico 2'}                                                                                                                   value={input.correo2}        action={({target})=>{setInput({...input,correo2:target.value})}}     variant={'standard'} focused={true} required={true} fullWidth={true} placeholder={'correo@mail.com'}                                          disabled={fdata.loading}   xs={6} md={3} />
                <GirdSelect focused={true} fullWidth={true} inputLabel={(fdata.loading)?'Espera..':'Regimen Fiscal *'} id={'regfis'} value={input.regimenFiscal} action={(event)=>{setInput({...input,regimenFiscal: event.target.value})}} items={fdata.RegimenesFiscales}/>
            <Grid item xs={1.5} md={2}/>

            <Grid item xs={12} md={12} mt={4}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='domicilio'>
                        <Typography variant='h6'  textAlign='center'><b>Domicilio *</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                       <Grid container >
                            <GridTextFiled id={'calle'}     label={(fdata.loading)?'Espera..':'Calle'}                 value={input.domicilio.calle}      action={({target})=>{setInput({...input,domicilio:{...input.domicilio,calle:target.value}})}}    variant={'standard'} focused={true} required={false} fullWidth={true} disabled={fdata.loading} xs={6} md={3} />
                            <GridTextFiled id={'numExt'}    label={(fdata.loading)?'Espera..':'Numero Exterior'}       value={input.domicilio.numExt}     action={({target})=>{setInput({...input,domicilio:{...input.domicilio,numExt:target.value}})}}   variant={'standard'} focused={true} required={false} fullWidth={true} disabled={fdata.loading} xs={6} md={3} />
                            <GridTextFiled id={'numInt'}    label={(fdata.loading)?'Espera..':'Numero Interior'}       value={input.domicilio.numInt}     action={({target})=>{setInput({...input,domicilio:{...input.domicilio,numInt:target.value}})}}   variant={'standard'} focused={true} required={false} fullWidth={true} disabled={fdata.loading} xs={6} md={3} />
                            <GridTextFiled id={'colonia'}   label={(fdata.loading)?'Espera..':'Colonia'}               value={input.domicilio.colonia}    action={({target})=>{setInput({...input,domicilio:{...input.domicilio,colonia:target.value}})}}  variant={'standard'} focused={true} required={false} fullWidth={true} disabled={fdata.loading} xs={6} md={3} />
                        </Grid>
                        <Grid container >
                            <GridTextFiled id={'mun-alc'}   label={(fdata.loading)?'Espera..':'Municipio/Alcaldia'}                                                                                                                     value={input.domicilio.munAlc}      action={({target})=>{setInput({...input,domicilio:{...input.domicilio,munAlc:target.value}})}}  variant={'standard'} focused={true} required={false} fullWidth={true} disabled={fdata.loading}                                           xs={6} md={3} />
                            <GridTextFiled id={'estado'}    label={(fdata.loading)?'Espera..':'Estado'}                                                                                                                                 value={input.domicilio.estado}      action={({target})=>{setInput({...input,domicilio:{...input.domicilio,estado:target.value}})}}  variant={'standard'} focused={true} required={false} fullWidth={true} disabled={fdata.loading}                                           xs={6} md={3} />
                            <GridTextFiled id={'pais'}      label={(fdata.loading)?'Espera..':'Pais'}                                                                                                                                   value={input.domicilio.pais}        action={({target})=>{setInput({...input,domicilio:{...input.domicilio,pais:target.value}})}}    variant={'standard'} focused={true} required={false} fullWidth={true} disabled={fdata.loading}                                           xs={6} md={3} />
                            <GridTextFiled id={'cp'}        label={(fdata.loading)?'Espera..':'Codigo Postal'}         actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}}  value={input.domicilio.cp}          action={({target})=>{(target.value === '' || re.test(target.value))&&setInput({...input,domicilio:{...input.domicilio,cp:target.value}})}}      variant={'standard'} focused={true} required={true}  fullWidth={true} disabled={fdata.loading} error={(fdata.snackbar.tipo === 'P')}  inputProps={{ maxLength: 5 }}   xs={6} md={3} />
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>

            <GridText text={'- Puede agregar todos sus tickets y facturarlos en un solo proceso.'}  variant={'h6'} component={'h6'} aling='center' separation={0} xs={12}  md={12}/>
            <GridText text={'- Los tickets de una misma tienda se calculan en una sola factura.'}   variant={'h6'} component={'h6'} aling='center' separation={0}  xs={12} md={12}/>
            
            <GirdDatePicker label={'Fecha de compra'}  fecha={captura.fechaCompra} accion={(newValue) => setCaptura({...captura,fechaCompra: dayjs(new Date(newValue))?.format('YYYY-MM-DD')})} focused={true} xs={6}  md={4} />
            <GridTextFiled id={'tienda'}        type={'number'} label={(fdata.loading)?'Espera..':'Tienda'}            actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}} value={captura.tienda}   action={({target})=>{setCaptura({...captura,tienda:dataInteger(target.value)})}}                                   variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'999'}         error={(fdata.snackbar.tipo === 'TND')}                                 xs={6}  md={2} />
            <GridTextFiled id={'caja'}                          label={(fdata.loading)?'Espera..':'No de caja'}        actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}} value={captura.caja}     action={({target})=>{(target.value === '' || re.test(target.value))&&setCaptura({...captura,caja:target.value})}}  variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'09'}          error={(fdata.snackbar.tipo === 'CJA')} inputProps={{ maxLength: 2 }}   xs={6}  md={2} />
            <GridTextFiled id={'numTicket'}     type={'number'} label={(fdata.loading)?'Espera..':'No de ticket'}      actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}} value={captura.ticket}   action={({target})=>{setCaptura({...captura,ticket:dataInteger(target.value)})}}                                   variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'999'}         error={(fdata.snackbar.tipo === 'TKT')}                                 xs={6}  md={2} />
            <GridTextFiled id={'importe'}       type={'number'} label={(fdata.loading)?'Espera..':'Importe compra'}    actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === '')?(validaDatos(input) === '')?false:true:true)}} value={captura.total}    action={({target})=>{setCaptura({...captura,total:formatImp(target.value)})}}                                      variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'99,999.99'}   error={(fdata.snackbar.tipo === 'TTL')}                                 xs={12} md={2} />
            
            <Grid item xs={1} md={3} />
                <GridLoadingButton label={'Limpiar'} click={()=>{setTickets([])}} loading={fdata.loading} variant={'outlined'} icon={<DeleteOutlineOutlinedIcon />} color={'error'}     fullWidth={false} disabled={false}      xs={4} md={2}/>
                <GridLoadingButton label={'Agregar'} click={agregar}              loading={fdata.loading} variant={'outlined'} icon={<PostAddOutlinedIcon />}       color={'success'}   fullWidth={false} disabled={habilitar}  xs={4} md={2}/>
            <Grid item xs={2} md={2}>
                <IconButton aria-label="delete" onClick={()=>{setModal(true)}}>
                    <ContactSupportOutlinedIcon  onMouseEnter={(event) => {setAnchorEl(event.currentTarget);}} onMouseLeave={()=>{setAnchorEl(null);}}/>
                </IconButton>
                
                <Popover id="mouse-over-popover" open={open} anchorEl={anchorEl} onClose={()=>{setAnchorEl(null);}} disableRestoreFocus
                    sx={{
                    pointerEvents: 'none',
                    }}                    
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    <Typography sx={{ p: 1 }}>Datos del ticket necesarios</Typography>
                </Popover>       
                <ModalTicket modal={modal} setModal={setModal}/>                       
            </Grid>
            <Grid item xs={1} md={3} />
            {(fdata.loading === false)&&
                <GirdBasicTable rows={tickets} colums={fdata.columsFactura} funcion={quitar} xs={12} md={12} mt={3}/>
            }
            <Grid item xs={1} md={3} />
            {(tickets.length > 0)&&               
             <GridLoadingButton label={'Generar Factura'} click={()=>{generar()}} loading={fdata.loading} variant={'outlined'} icon={<ReceiptOutlinedIcon />} color={'success'} fullWidth={false} size={'large'} disabled={false}      xs={10} md={6}/>
            }
            <Grid item xs={1} md={3}></Grid>
        </Grid>
    )
}
