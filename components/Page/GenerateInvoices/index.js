'use client'
import {useState}                                   from 'react'
import dayjs                                        from 'dayjs';
import axios                                        from 'axios';      

import { useFContext, useSetFContext  }             from '../../../FacUserProvider';
import { dataInteger, formatImp}                    from '../../../UtilFunction/Util'
import {mensajes}                                   from '../../../UtilFunction/Mensajes'
import { validaCaptura, validaDatos, validaRegExp,
    validaCapturaSinFecha}                          from './Funciones'

import { Grid, Alert, Stack}                        from '@mui/material';

import AddOutlinedIcon                              from '@mui/icons-material/AddOutlined';

import GridText                                     from '../../../fastComponents/Girds/GridText';
import GridTextFiled                                from '../../../fastComponents/Girds/GridTextFiled';
import GirdSelect                                   from '../../../fastComponents/Girds/GirdSelect';
import GirdDatePicker                               from '../../../fastComponents/Girds/GirdDatePicker';
import GridLoadingButton                            from '../../../fastComponents/Girds/GridLoadingButton';
import GirdBasicTable                               from '../../../fastComponents/Girds/GirdBasicTable';
import PopoverTicket                                from '../../../fastComponents/PopoverTicket'

const re = /^[0-9\b]+$/;
const rp = /^[0-9 .\b]+$/;

export default function GenerateInvoices(){
    const fdata                     = useFContext()
    const setFdata                  = useSetFContext()
    const [tickets,   setTickets]   = useState([])
    const [captura,   setCaptura]   = useState({fechaCompra: '', tienda: 0, caja: '01', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}, fclientes:{rfc:'', correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {cp:''}} })
    const [input,     setInput]     = useState({rfc:'', correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {calle:'', numExt:'', numInt:'', colonia: '', munAlc: '', estado: '', pais:'', cp:''}})
    const [habilitar, setHabilitar] = useState(true)  
    const [mensaje, setMenasaje]    = useState(mensajes(0))
    const mensajesAgregar           = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const mensajesGenerar           = [1, 2, 3, 4, 5, 6, 7, 8, 9, 25, 26, 27, 38];
    const [boton, setBoton]         = useState(0)

    async function rfc(){
        setInput({rfc:input.rfc, correo:'', razonSocial:'', correo2:'', usoCFDI: fdata.usosCFDI[0].value, regimenFiscal: fdata.RegimenesFiscales[0].value, domicilio: {calle:'', numExt:'', numInt:'', colonia: '', munAlc: '', estado: '', pais:'', cp:''}})
        setMenasaje((input.rfc !== '')?(!new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$").test(input.rfc))?mensajes(1):mensajes((mensaje.id === 1)?0:mensaje.id, mensaje.mensaje):mensajes((mensaje.id === 1)?0:mensaje.id, mensaje.mensaje))                   
    }

    async function validateEmail(numCorreo){ 
        if( (numCorreo === 1 && input.correo !== '') ||   (numCorreo === 2 && input.correo2 !== '') ){
            if (!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test((numCorreo===1)?input.correo:input.correo2))) {
                setMenasaje(mensajes((numCorreo === 1)?8:9))
            }else{
                setMenasaje(mensajes(0))
            }
        }else{
            setMenasaje(mensajes((mensaje.id === 8 || mensaje.id === 9)?0:mensaje.id))
        }       
    }

    const sinDiacriticos = (function(){
        let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÇáãàäâéëèêíïìîóöòôúüùûñç',
             a = 'AAAAAEEEEIIIIOOOOUUUUCaaaaaeeeeiiiioooouuuunc',
            re = new RegExp('['+de+']' , 'ug');    
        return texto =>
            texto.replace(
                re, 
                match => a.charAt(de.indexOf(match))
            );
    })();

    async function agregar(){
        setBoton(1)
        setMenasaje(mensajes(0))
        if(tickets.length <= 50){
            const validaD= validaDatos(input)
            if(validaD === 0){   
                const validaR = validaRegExp(input.rfc, input.correo, input.correo2);
                if(validaR === 0){
                    const existeT = tickets.filter(function (ticket) {return ticket.fechaCompra === captura.fechaCompra && ticket.tienda === captura.tienda && ticket.caja === captura.caja && ticket.ticket === captura.ticket });
                    if(existeT.length <= 0){ 
                        const validaC = validaCaptura(captura)
                        if(validaC === 0) {
                            setFdata({...fdata,loading: true})
                            await axios.post(process.env.NEXT_PUBLIC_API_DASH+'/t3b-fact-das/agregarTicket',captura ,fdata.header)
                            .then(function (response) {
                                if(response.data !== null && response.data !== ''){
                                    if(response.data.folio != null && response.data.folio != ''){
                                        if(response.data.folio.includes('F:')){
                                            setMenasaje(mensajes(19))
                                        }else if(response.data.folio.includes('S:')){
                                            setMenasaje(mensajes(20))
                                        } else if(response.data.folio.includes('VS:')){
                                            setMenasaje(mensajes(21))
                                        }else{
                                            setMenasaje(mensajes('Este ticket ya tiene este Folio de factura. '+response.data.folio))
                                        }
                                    }else{
                                        if(
                                        (response.data.tipoPago !== null && response.data.tipoPago != '') && 
                                        (response.data.region !== null && response.data.region != '')                                    
                                        ){
                                            if(parseFloat(response.data.total).toFixed(2) === parseFloat(captura.total).toFixed(2)){
                                                if(response.data.tipoPago !== '02' && response.data.tipoPago !== '03' && response.data.tipoPago !== '07'){
                                                    if(response.data.detalles.length  > 0){
                                                        const TotalPS = response.data.detalles.filter(t => t.atmdesc === 'PS').reduce((acc, v) => acc += v.atmventa, 0);
                                                        if(TotalPS > 0){                                                
                                                            if(parseFloat(TotalPS).toFixed(2) === parseFloat(captura.total).toFixed(2)){
                                                                setMenasaje(mensajes(22))
                                                            }else{ 
                                                                setCaptura({...captura, tienda: 0, caja: '01', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}})
                                                                setTickets([...tickets,{tienda: captura.tienda, ticket: captura.ticket, caja: captura.caja, total: parseFloat(parseFloat(captura.total)-parseFloat(TotalPS)).toFixed(2), fechaCompra: captura.fechaCompra, accion: 'delete', region: response.data.region, conexion: response.data.conexion, tipoPago: response.data.tipoPago, detalles:response.data.detalles}])
                                                                setHabilitar(false) 
                                                                setMenasaje(mensajes(23))
                                                            }                                                    
                                                        }else{
                                                            setCaptura({...captura, tienda: 0, caja: '01', ticket: 0, total: 0.00, region: 0, conexion:{tclave: '',host: '', puerto: '', servicio: '', base: '', driver: '', url: ''}})
                                                            setTickets([...tickets,{tienda: captura.tienda, ticket: captura.ticket, caja: captura.caja, total: captura.total, fechaCompra: captura.fechaCompra, accion: 'delete', region: response.data.region, conexion: response.data.conexion, tipoPago: response.data.tipoPago, detalles:response.data.detalles}])
                                                            setHabilitar(false) 
                                                            setMenasaje(mensajes(24))
                                                        }                                
                                                    }else{ 
                                                        setMenasaje(mensajes(17))
                                                    }                                    
                                                }else{
                                                    setMenasaje(mensajes(21))
                                                }
                                            }else{
                                                setMenasaje(mensajes(22))
                                            }                                        
                                        }else{
                                            setMenasaje(mensajes(18))
                                        }                                    
                                    }                                                               
                                } else{
                                    setMenasaje(mensajes(17))
                                }            
                            }).catch(function (error) {  
                                (error.mensaje === 'Network Error')?setMenasaje(mensajes(17)):(error.response.status === 400)?setMenasaje(mensajes(error.response.data)):setMenasaje(mensajes(17))                          
                            }).finally(function(){
                                setFdata({...fdata,loading: false}) 
                            })
                        } else{
                            setMenasaje(mensajes(validaC))
                        }
                    } else{
                        setMenasaje(mensajes(16))
                    }
                }else{
                    setMenasaje(mensajes(validaR))
                }
            } else {
                setMenasaje(mensajes(validaD))
            }
        }else{
            setMenasaje(mensajes(15))
        }
    }

    function quitar(index){
        try {
            setFdata({...fdata,loading: true}) 
            tickets.splice(index,1);
            setTickets((tickets.length > 0)?tickets:[]) 
        } catch (error) {
            console.log(error)
        } finally {
            setFdata({...fdata,loading: false})
        }        
    }
    

    async function generar(){
        setBoton(2)
        setMenasaje(mensajes(0))
        if(tickets.length  > 0){
            const validaD= validaDatos(input)
            if(validaD === 0){
                const validaR = validaRegExp(input.rfc, input.correo, input.correo2);
                if(validaR === 0){
                    setFdata({...fdata,loading: true})
                    await axios.post(process.env.NEXT_PUBLIC_API_DASH+'/t3b-fact-das/generarFactura',{
                        tickets: tickets,
                        fclientes: input
                    },fdata.header)
                    .then(function (response) {
                        const tikets = response.data;
                        if(tikets.length > 0){
                            const errors = tikets.filter(function (tiket) {return  tiket.folio === null || tiket.folio === ''});
                            if(errors.length === 0){                        
                                setMenasaje(mensajes(27))
                                setTickets([])
                            }else {                            
                                if(errors[0].xml !== null){
                                    setMenasaje(mensajes(38, errors[0].xml))                                            
                                }else{
                                    setMenasaje(mensajes(26))
                                }                  
                            }                                    
                        }else{              
                            setMenasaje(mensajes(26))
                        }                    
                    })
                    .catch(function (error) {                        
                        setMenasaje(mensajes(26))
                    }).finally(function(){
                        setFdata({...fdata,loading: false})
                    })               
                }else{
                    setMenasaje(mensajes(validaR))
                }   
            }else {
                setMenasaje(mensajes(validaD))
            }            
        } else{
            setMenasaje(mensajes(25))
        }
    }
    
    return( 
        <Grid container mt={8}>
            <GridText text={<b>Facturación Tiendas3B 📄</b>} variant={'h5'}  component={'h1'} aling='center'  fontSize={'22px'} xs={12} md={12} mt={2}/>
            <GridText text={'Gracias por comprar en Tiendas 3B 🛒​🔥​'}  variant={'h6'}  component={'h6'}   aling='center'  xs={12} md={12} mt={2}/>
            <GridText text={<>Tienes <b>30 días naturales</b> desde que realizaste la compra para solicitar tu factura 😊​​</>}   variant={'h6'}  component={'h6'}   aling='center'  xs={12} md={12}/>
            <Grid item xs={12} md={12} mt={3}>
                <Grid container >
                    <GridText text={<b>1. Datos fiscales</b>} variant={'h5'} component={'h5'} aling='left' fontSize={'22px'} xs={12} md={12}/>
                </Grid> 
                <Grid container >
                    <Grid item xs={12} md={12} mt={2}>
                        <Stack sx={{ width: '100%' }}>
                            <Alert severity="info" sx={{color: '#000000'}}>
                                    <b>Ingresa tus datos fiscales.</b><br></br>
                                    Los campos marcados con * son obligatorios 👆​.
                            </Alert>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container mt={3}>
                    <GridTextFiled id={'rfc'} label={(fdata.loading)?'Espera..':'RFC'} actionOnBlur={rfc} value={input.rfc} action={({target})=>{setInput({...input,rfc:target.value.toUpperCase().trim()}); setCaptura({...captura,fclientes:{...captura.fclientes,rfc:target.value.toUpperCase()}});}} variant={'standard'} focused={true} required={true} fullWidth={true} error={(mensaje.id === 1 ||  mensaje.id === 2)}  helperText={(mensaje.id === 1 ||  mensaje.id === 2)&&mensaje.mensaje} disabled={fdata.loading} xs={12} md={3.5} mt={2}/>
                    <Grid item xs={0} md={0.5} mt={2}/>
                    <GridTextFiled id={'nomraz'} label={(fdata.loading)?'Espera..':'Nombre/Razón Social'} actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === 0)?(validaDatos(input) === 0)?false:true:true)}}  value={input.razonSocial} action={({target})=>{setInput({...input,razonSocial:sinDiacriticos(target.value.toUpperCase())}); setCaptura({...captura,fclientes:{...captura.fclientes,razonSocial:target.value.toUpperCase()}});}} variant={'standard'} focused={true} required={true} fullWidth={true} error={(mensaje.id === 3)} helperText={(mensaje.id === 3)&&mensaje.mensaje} disabled={fdata.loading} inputProps={{ maxLength: 300 }} xs={12} md={8} mt={2}/>
                    <GirdSelect focused={true} fullWidth={true} inputLabel={(fdata.loading)?'Espera..':'Uso CFDI *'} id={'cfdi'} value={input.usoCFDI} action={(event)=>{setInput({...input,usoCFDI: event.target.value}); setCaptura({...captura,fclientes:{...captura.fclientes,usoCFDI:event.target.value}});}} items={fdata.usosCFDI} disabled={fdata.loading} xs={12} md={3.5} mt={2}/>
                    <Grid item xs={0} md={0.5} mt={2}/>
                    <GirdSelect focused={true} fullWidth={true} inputLabel={(fdata.loading)?'Espera..':'Régimen Fiscal *'} id={'regfis'} value={input.regimenFiscal} action={(event)=>{setInput({...input,regimenFiscal: event.target.value}); setCaptura({...captura,fclientes:{...captura.fclientes,regimenFiscal:event.target.value}});}} items={fdata.RegimenesFiscales} disabled={fdata.loading} xs={12} md={8} mt={2}/>
                    <GridTextFiled id={'cp'} label={(fdata.loading)?'Espera..':'Código Postal'} actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === 0)?(validaDatos(input) === 0)?false:true:true)}} value={input.domicilio.cp} action={({target})=>{if(target.value === '' || re.test(target.value)){setInput({...input,domicilio:{...input.domicilio,cp:target.value}}); setCaptura({...captura,fclientes:{...captura.fclientes,domicilio:{...captura.fclientes.domicilio, cp: target.value}}});}}}   variant={'standard'} focused={true} required={true}  fullWidth={true} placeholder={'12345'} error={(mensaje.id === 6)} helperText={(mensaje.id === 6)&&mensaje.mensaje}  disabled={fdata.loading} inputProps={{ maxLength: 5 }} xs={12} md={3.5} mt={2}/>
                    <Grid item xs={0} md={0.5} mt={2}/>
                    <GridTextFiled id={'correo'} label={(fdata.loading)?'Espera..':'Correo electrónico'} actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === 0)?(validaDatos(input) === 0)?false:true:true); validateEmail(1);}} value={input.correo} action={({target})=>{setInput({...input,correo:target.value.trim()}); setCaptura({...captura,fclientes:{...captura.fclientes,correo:target.value.trim()}});}} variant={'standard'} focused={true} required={true}  fullWidth={true} placeholder={'correo@mail.com'} error={(mensaje.id === 7  ||  mensaje.id === 8)} helperText={(mensaje.id === 7  ||  mensaje.id === 8)&&mensaje.mensaje} disabled={fdata.loading} xs={12} md={4} mt={2}/>
                    <Grid item xs={0} md={0.5} mt={2}/>
                    <GridTextFiled id={'correo2'} label={(fdata.loading)?'Espera..':'Correo electrónico 2'} actionOnBlur={()=>{validateEmail(2);}} value={input.correo2} action={({target})=>{setInput({...input,correo2:target.value.trim()}); setCaptura({...captura,fclientes:{...captura.fclientes,correo2:target.value.trim()}});}} variant={'standard'} focused={true} required={false} fullWidth={true} placeholder={'correo@mail.com'} error={(mensaje.id === 9)} helperText={(mensaje.id === 9)&&mensaje.mensaje} disabled={fdata.loading} xs={12} md={3.5} mt={2}/>
                </Grid>               
            </Grid>
            <Grid item xs={12} md={12} mt={5}> 
                <Grid container >
                    <GridText text={<b>2. Información de Tickets</b>} variant={'h5'} component={'h5'} aling='left' fontSize={'22px'} xs={12} md={2.8} />
                    <GridText text={<b>Encuéntralos acá 👉 </b>} variant={'h8'} component={'h8'} fontSize={'14px'} aling='left' xs={6} md={1.8} mt={0.5}/>     
                    <Grid item xs={6} md={1} mt={0.5}>
                        <PopoverTicket/>    
                    </Grid>   
                    <Grid item xs={0} md={5}></Grid>           
                </Grid>
                <Grid container >
                    <Grid item xs={12} md={12} mt={2}>
                        <Stack sx={{ width: '100%' }} >
                            <Alert severity="info" sx={{color: '#000000'}}>
                                <b>Agrega los siguientes datos para localizar tu Ticket.</b><br></br>
                                Puedes agregar más de un ticket. Los tickets de una misma tienda se suman en una sola factura 😊​.
                            </Alert>
                        </Stack>  
                    </Grid>
                </Grid>                
            </Grid>     
            <Grid item xs={12} md={12} mt={4}>
                <Grid container >
                    <GridTextFiled id={'tienda'} label={(fdata.loading)?'Espera..':'Sucursal'} actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === 0)?(validaDatos(input) === 0)?false:true:true)}}  value={captura.tienda} action={({target})=>{(target.value === '' || re.test(target.value))&&setCaptura({...captura,tienda:dataInteger(target.value)})}} variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'9999'} error={(mensaje.id === 10)} helperText={(mensaje.id === 10)&&mensaje.mensaje} inputProps={{maxLength: 4}} xs={5.5} md={2.1} mt={2}/>
                    <Grid item xs={1} md={0.3} mt={2}/>
                    <GridTextFiled id={'numTicket'} label={(fdata.loading)?'Espera..':'Num. Ticket'} actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === 0)?(validaDatos(input) === 0)?false:true:true)}}  value={captura.ticket} action={({target})=>{(target.value === '' || re.test(target.value))&&setCaptura({...captura,ticket:dataInteger(target.value)})}} variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'999'} error={(mensaje.id === 11)} helperText={(mensaje.id === 11)&&mensaje.mensaje} inputProps={{maxLength: 3}} xs={5.5} md={2.1} mt={2}/>
                    <Grid item xs={0} md={0.3} mt={2}/>
                    <GirdSelect    id={'caja'} inputLabel={(fdata.loading)?'Espera..':'Caja *'} focused={true} fullWidth={true} value={captura.caja} action={({target})=>{(target.value === '' || re.test(target.value))&&setCaptura({...captura,caja:target.value})}} items={[{value:'01',item:'01'},{value:'02',item:'02'},{value:'03',item:'03'},{value:'04',item:'04'},{value:'05',item:'05'},{value:'06',item:'06'},{value:'07',item:'07'},{value:'08',item:'08'},{value:'09',item:'09'},{value:'10',item:'10'}]} disabled={fdata.loading} xs={5.5} md={2.1} mt={2}/>
                    <Grid item xs={1} md={0.3} mt={2}/>
                    <GridTextFiled id={'importe'} label={(fdata.loading)?'Espera..':'Total compra'} actionOnBlur={()=>{setHabilitar( (validaCaptura(captura) === 0)?(validaDatos(input) === 0)?false:true:true)}} value={captura.total} action={({target})=>{(target.value === '' || rp.test(target.value))&&setCaptura({...captura,total:formatImp(target.value)})}} variant={'standard'} focused={true} required={true} fullWidth={true} disabled={fdata.loading} placeholder={'99999.99'}   error={(mensaje.id === 13)} helperText={(mensaje.id === 13)&&mensaje.mensaje} inputProps={{maxLength: 8}} xs={5.5} md={2.1} mt={2} autoComplete={'off'}/>
                    <Grid item xs={0} md={0.3} mt={2}/>
                    <GirdDatePicker label={'Fecha de compra'} fecha={captura.fechaCompra} accion={(newValue) => { setCaptura({...captura,fechaCompra: dayjs(new Date(newValue))?.format('YYYY-MM-DD')}); setHabilitar((validaDatos(input) === 0)?(validaCaptura(captura) === 0)?false:(validaCaptura(captura) === 14)?(newValue !== undefined && newValue !== null && newValue !== '')?(validaCapturaSinFecha(captura) === 0)?false:true:true:true:true )}} disabled={fdata.loading} error={(mensaje.id === 14)} helperText={(mensaje.id === 14)&&mensaje.mensaje} xs={12} md={2.1} mt={2}/>
                </Grid>
            </Grid>     
            <Grid item xs={2} md={5.5} />       
            {(mensajesAgregar.includes(mensaje.id) && boton === 1)&&
                <Grid item xs={12} md={12} mt={1}>
                    <Grid container >
                        <Grid item xs={0} md={6} />
                        <Grid item xs={12} md={6} >
                            <Alert severity={mensaje.severity} onClose={() => {setMenasaje(mensajes(0))}}>{mensaje.mensaje}</Alert>
                        </Grid>                       
                    </Grid>
                </Grid>                
            }     
            <Grid item xs={12} md={12} mt={2}>                        
                <Grid container spacing={1}>
                    <Grid  xs={0} md={8}/>
                    <GridLoadingButton label={'Limpiar'} click={()=>{setCaptura({...captura,fechaCompra: '', tienda: 0, caja: '01', ticket: 0, total: 0.00})}} loading={fdata.loading} variant={'outlined'} color={'error'} fullWidth={true} disabled={false} xs={6} md={2}/>
                    <GridLoadingButton label={'Agregar'} click={agregar} loading={fdata.loading} variant={'contained'} icon={<AddOutlinedIcon />} color={'error'} fullWidth={true} disabled={habilitar} xs={6} md={2}/>
                </Grid>
            </Grid>                 
            <Grid item xs={12} md={12} mt={4}> 
                <Grid container >
                    <GridText text={<b>Tickets localizados</b>} variant={'h5'} component={'h5'} aling='left' fontSize={'22px'} xs={12} md={3}/>
                </Grid>
            </Grid> 
            <GirdBasicTable rows={tickets} colums={fdata.columsFactura} funcion={quitar} xs={12} md={12} separation={3}/>
            {(mensajesGenerar.includes(mensaje.id) && boton === 2)&&
                <Grid item xs={12} md={12} mt={1}>
                    <Grid container >
                        <Grid item xs={0} md={6} />
                        <Grid item xs={12} md={6} >
                            <Alert severity={mensaje.severity} onClose={() => {setMenasaje(mensajes(0))}}>{mensaje.mensaje}</Alert>
                        </Grid>                       
                    </Grid>
                </Grid>                
            }  
            <Grid item xs={12} md={12}> 
                <Grid container >
                    <Grid item xs={0} md={9} mt={2}/>
                    <GridLoadingButton label={'Generar Factura'} click={()=>{generar()}} loading={fdata.loading} variant={'contained'} color={'error'} fullWidth={true} size={'large'} disabled={!(tickets.length > 0)} xs={12} md={3} mt={4}/>
                </Grid>
            </Grid>
        </Grid>
    )
}
