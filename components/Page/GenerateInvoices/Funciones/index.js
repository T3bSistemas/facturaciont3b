    
export function validaDatos(input){
    if(input.rfc === ''){
        return 'R';
    }  
    if(input.correo === ''){
        return 'C';
    } 
    if(input.razonSocial === ''){
        return 'S';
    }
    if(input.usoCFDI === ''){
        return 'U';
    }
    if(input.regimenFiscal === ''){
        return 'F';
    }
    if(input.domicilio.cp === ''){
        return 'P';
    }
    return '';
}

export function validaCaptura(captura){
    if(captura.fecha === ''){
        return 'FCH'
    }

    if(captura.tienda <= 0){
        return 'TND'
    }

    if(captura.caja === ''){
        return 'CJA'
    }

    if(captura.ticket <= 0){
        return 'TKT'
    }

    if(captura.total <= 0){
        return 'TTL'
    }
    return '';
}
