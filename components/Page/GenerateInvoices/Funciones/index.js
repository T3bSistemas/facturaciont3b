    
export function validaDatos(input){
    if(input.rfc === ''){
        return 2;
    }  
    if(input.razonSocial === ''){
        return 3;
    }
    if(input.usoCFDI === ''){
        return 4;
    }
    if(input.regimenFiscal === ''){
        return 5;
    }
    if(input.domicilio.cp === ''){
        return 6;
    }
    if(input.correo === ''){
        return 7;
    }        
    return 0;
}

export function validaCaptura(captura){
    if(captura.fechaCompra === ''){
        return 14
    }

    if(captura.tienda <= 0){
        return 10
    }

    if(captura.caja === ''){
        return 12
    }

    if(captura.ticket <= 0){
        return 11
    }

    if(captura.total <= 0){
        return 13
    }
    return 0;
}

export function validaCapturaSinFecha(captura){
    if(captura.tienda <= 0){
        return 10
    }

    if(captura.caja === ''){
        return 12
    }

    if(captura.ticket <= 0){
        return 11
    }

    if(captura.total <= 0){
        return 13
    }
    return 0;
}


export function validaRegExp(rfc, correo, correo2){
    const patt = new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
    if(!patt.test(rfc)){
        return 1;
    }

    if (!(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(correo))) {
        return 8
    }

    if (correo2 !== '' && !((/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(correo2)))) {
        return 9
    }
    return 0
}