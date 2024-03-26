import {colocarCero} from '../Mat'

export function isNotAll(data){
    if(data){
        if(data !== null){
            if(data !== ''){
                return true;
            }
        }
    }
    return false;
}

export function isNull(data){
    if(data !== undefined){
        if(data !== null){
            if(data !== ''){
                return data.trim();
            }
        }
    }
    return '';
}

export function dataInteger(data){
    try {
        if(data !== undefined){
            if(data !== null){
                if(data !== ''){
                    return parseInt(data.trim())
                }
            }
        }
    } catch (error) {
        console.log(error)
    }    
    return 0
}

export function formatImp(data){
    try {
        if(data !== undefined){
            if(data !== null){
                if(data !== ''){
                    if(data.includes('.')){
                        const entero  = data.substring(0, data.indexOf('.'));
                        const decimal = data.substring(data.indexOf('.')+1, data.length);
                        if(decimal.length > 2){
                            const dosDecimales = decimal.substring(0,2);
                            return parseFloat(entero+'.'+dosDecimales.trim()).toFixed(2)
                        }else{
                            if(decimal.length === 0){
                                return data.trim()
                            }else if(decimal.length === 1){
                                return parseFloat(data.trim()).toFixed(1)
                            }else{
                                return parseFloat(data.trim()).toFixed(2)
                            }                            
                        }                        
                    }else{
                        return parseFloat(data.trim())
                    }
                    
                }
            }
        }
    } catch (error) {
        console.log(error)
    }    
    return 0.00
}

export function formatoFecha(fecha, formato) {
    const map = {
        dd: colocarCero(fecha.getDate()),
        mm: colocarCero(fecha.getMonth() + 1),
        yy: fecha.getFullYear(),
        yyyy: fecha.getFullYear()
    }
    return formato.replace(/dd|mm|yy|yyyy/gi, matched => map[matched])
}

