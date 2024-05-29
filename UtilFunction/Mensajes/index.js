
export function mensajes(id, mensaje){
    const m = mensajeR(id, mensaje)
    return {id:id, mensaje:m.mensaje, severity: (m.severity)?m.severity:'warning'}
}

function mensajeR(id, mensaje){
    switch(id){        
        case 0:
            return {mensaje:'' , severity: 'warning'}
        /*Validaciones Datos fiscales*/ 
        case 1:
            return {mensaje:'Válida tu RFC sea correcto' , severity: 'error'} 
        case 2:
            return {mensaje:'Agrega tu RFC, es necesario para generar tu factura' , severity: 'error'}
        case 3:
            return {mensaje:'El Nombre o Razón social es necesario para generar tu factura' , severity: 'error'}
        case 4:
            return {mensaje:'El uso de CFDI es necesario para generar tu factura' , severity: 'error'}
        case 5:
            return {mensaje:'El Régimen Fiscal es necesario para generar tu factura' , severity: 'error'}
        case 6:
            return {mensaje:'El Código Postal es necesario para generar tu factura' , severity: 'error'}
        case 7:
            return {mensaje:'El correo electrónico es necesario para generar tu factura' , severity: 'error'}
        case 8:
            return {mensaje:'Verifica que tu correo electrónico sea correcto' , severity: 'error'}
        case 9:
            return {mensaje:'Verifica que tu segundo correo electrónico sea correcto' , severity: 'error'}
        /*Validaciones Información de Tickets */ 
        case 10:
            return {mensaje:'La sucursal es necesaria para localizar tu ticke' , severity: 'error'}
        case 11:
            return {mensaje:'No. de Ticket es necesario para localizar tu ticket' , severity: 'error'}
        case 12:
            return {mensaje:'El número de Caja es necesario para localizar tu ticket' , severity: 'error'}
        case 13:
            return {mensaje:'El total de tu compra es necesario para localizar tu ticket' , severity: 'error'}
        case 14://falta
            return {mensaje:'La fecha de compra es necesaria para localizar tu ticket' , severity: 'error'}
        /*****Agregar Ticket*****/
        case 15:
            return {mensaje:'No es posible agregar más de 50 tickets a la lista de facturación 😔' , severity: 'warning'}
        case 16:
            return {mensaje:'Este ticket ya está en la lista de tickets localizados. Agrega otro más o haz clic en "Generar factura" 😉' , severity: 'error'}
        case 17:
            return {mensaje:'Ticket no localizado ¡Ups! Algo salió mal, no pudimos encontrar tu Ticket pero écha un ojo mañana, casi seguro que si lo localizamos 😉' , severity: 'error'}
        case 18:
            return {mensaje:'Ticket no localizado ¡Ups! Algo salió mal, checa los datos de tu ticket y vuelve a ingresarlos 😬' , severity: 'warning'}
        case 19:
            return {mensaje:'Esta factura ya fue solicitada. Lo sentimos, sólo se puede generar una factura por pedido. Échale un ojo a tu bandeja de entrada en tu correo, casi seguro que ya está por allá 🙏.' , severity: 'warning'}
        case 20:
            return {mensaje:'Este ticket está en proceso de facturación, en breve te enviaremos el comprobante a tu correo electrónico 😉' , severity: 'warning'}    
        case 21:
            return {mensaje:'Error para generación de factura, Lo sentimos, este ticket no puede ser facturado por el tipo de pago con que se hizo la compra 😔' , severity: 'warning'}        
        case 22:
            return {mensaje:'¡Ups! el Total de compra no coincide con el ticket, pls chécalo y vuelve a capturarlo 😬' , severity: 'warning'}
        case 22:
            return {mensaje:'Este ticket no es facturable porque corresponde a un pago de servicio sin comisión 😔' , severity: 'error'}
        case 23:
            return {mensaje:'El ticket fue agregado, pero recuerda que solo se factura la comisión por ser un pago de servicio 😬' , severity: 'info'} 
        case 24:
            return {mensaje:'El ticket fue agregado 😊' , severity: 'success'} 
        /*Generar factura */
        case 25:
            return {mensaje:'Para generar una factura, agrega al menos un ticket 😬' , severity: 'error'}
        case 26:
            return {mensaje:'¡Ups! El sistema está teniendo problemas para generar tu factura. Por favor, inténtalo más tarde 😬' , severity: 'error'}
        case 27:
            return {mensaje:'Factura enviada, échale un ojo a la bandeja de entrada en tu correo, seguro ya está por allá 😉' , severity: 'success'}
        /*Reimpresion*/
        case 28:
            return {mensaje:'Ingresa tu RFC' , severity: 'error'} 
        case 29:
            return {mensaje:'Ingresa el Folio de tu factura' , severity: 'error'}
        case 30:
            return {mensaje:'Ingresa la serie de tu factura' , severity: 'error'}
        case 31:
            return {mensaje:'¡Ups! El sistema está teniendo problemas para recuperar tu factura. Por favor, inténtalo más tarde 😬' , severity: 'error'}
        case 32:
            return {mensaje:'¡Ups! no encontramos ningún ticket, revisa los datos y vuelve a intentarlo 🧐' , severity: 'warning'}    
        case 33:
            return {mensaje:'Error al obtener el UUID, por fa envíanos un correo con la información de tu factura para revisarlo 🧐' , severity: 'error'} 
        case 34:
            return {mensaje:'Ingresa o verifica que tu email sea correcto 🧐' , severity: 'error'} 
        case 35:
            return {mensaje:'Ingresa o verifica que tu email 2 sea correcto 🧐' , severity: 'error'}
        case 36:
            return {mensaje:'¡Ups! El sistema está teniendo problemas para enviar tu factura. Revisa tu correo y, si vuelve a suceder, envíanos un mail para revisarlo 🙏' , severity: 'error'} 
        case 37:
            return {mensaje:'Factura enviada exitosamente, échale un ojo a la bandeja de entrada en tu correo 😉' , severity: 'success'}
        /*Error pack*/ 
        case 38:
            return  {mensaje:mensaje , severity: 'error'}
       default:
            return {mensaje:id , severity: 'warning'} 
    }
}

