

export  function setSnackbar(fdata, tipo){
    /**************************************Genericos************************************************** */
    if(tipo === 'SNR'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'warning', message: 'Sin resultados en la búsqueda '}
    } else if(tipo === 'SEP'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El sistema está experimentado problemas para recuperar su factura, inténtelo más tarde o póngase en contacto con nosotros en facturamicompra@t3b.com.mx'}
    } else if(tipo === 'RFCR'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'info',    message: 'Datos de RFC recuperado de facturas anteriores'}
    }else if(tipo === 'TK50'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'warning', message: 'No es posible agregar más de 50 tickets a la lista de facturación'}
    }else if(tipo === 'TKV'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'warning', message: 'La lista de tickets a facturar esta vacia'}
    }else if(tipo === 'ERRGEN'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error', message: 'Por el momento el sistema experimenta problemas de comunicación con nuestra base de datos, por favor inténtelo más tarde o pongase en contacto con nosotros en facturamicompra@t3b.com.mx, adjuntando sus datos fiscales y copia de su ticket de compra'}
    }
    /**************************************Genericos************************************************** */
   
    /*********************************Reimpresion******************************************** */
    else if(tipo === 'IRFC'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El RFC es información obligatoria'}
    } else if(tipo === 'IFOL'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'Ingresa un Folio'}
    } else if(tipo === 'ISER'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'Ingresa una Serie'}
    } else if(tipo === 'REG'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'No se encontro una Region para la tienda solicitada'}
    } 
    /*********************************Reimpresion******************************************** */
    /*************************************Valida Captura*********************************************************************************/
    else if(tipo === 'FCH'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'La fecha de compra es requerida para facturar su ticket'}
    } else if(tipo === 'TND'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El numero de tienda es requerido para facturar su ticket'}
    } else if(tipo === 'CJA'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El numero de caja es requerida para facturar su ticket'}
    } else if(tipo === 'TKT'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El numero de ticket es requerido para facturar su ticket'}
    } else if(tipo === 'TTL'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El importe de compra es requerido para facturar su ticket'}
    } 
    /*************************************Valida Captura*********************************************************************************/
    /*************************************Valida Datos*********************************************************************************/
    else if(tipo === 'R'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El RFC es información obligatoria'}
    } else if(tipo === 'C'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'Se requiere el correo electronico para enviar su comprobante'}
    } else if(tipo === 'S'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El nombre o razon social son requeridos para genrar la factura'}
    } else if(tipo === 'U'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'Se requiere us uso de CFDI para genrar la factura'}
    } else if(tipo === 'F'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'Se requiere Regimen Fiscal para genrar la factura'}
    } else if(tipo === 'P'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'Se requiere el codigo postal para generar su comprobante'}
    } 
    /*************************************Valida Datos*********************************************************************************/
    /******************************************catch Axios********************************************************/
    //AL BUSCAR RFC EN bd
    else if(tipo === 'RFCE'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El sistema está experimentado problemas para recuperar su RFC, inténtelo más tarde o póngase en contacto con nosotros en facturamicompra@t3b.com.mx'}
    }  
    // AL DE AGREGAR TICKET
    else if(tipo.includes('ERRAGREGAR-')){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'Error al validar Ticket('+tipo.replace('ERRAGREGAR-','')+'), inténtelo más tarde o póngase en contacto con nosotros en facturamicompra@t3b.com.mx '}
    } 
    /******************************************catch Axios********************************************************/
    /**********************************************VALIDACIONES AGREGAR TICKET***************************************** */
     else if(tipo === 'TKP'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'warning', message: 'Ticket no facturable, Este ticket no es válido por el tipo de pago con que fué efectuado'}
    } else if(tipo === 'TKN'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'warning', message: 'Ticket no encontrado, valide que la información es correcta'}
    } else if(tipo === 'EXIT'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'warning', message: 'Este ticket ya fué facturado anteriormente, valide su información'}
    }  else if(tipo === 'PRO'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'warning', message: 'Este ticket está en proceso de facturación, en breve le haremos llegar su comprobante a su cuenta de correo electrónico'}
    } else if(tipo ==='TKA'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'success', message: 'El ticket fué agregado'}
    } else if(tipo === 'TKYA'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'error',   message: 'El ticket ya se encuentra en la lista de validación'}
    }    
    /**********************************************VALIDACIONES AGREGAR TICKET***************************************** */
    else if(tipo === 'OK'){
        return {...fdata.snackbar,tipo:tipo, open:true, severity:'success',   message: 'Facturas generadas y enviadas a su cuenta de correo con Éxito'}
    }
    else{
        return {...fdata.snackbar}
    }

}