
export function getNumberAlet(max, min, num){
    return Math.floor(  (Math.random() * (max - min) + min) * num );
}


export function colocarCero(numero){
    if(numero){
        if(numero > 0){
            if(numero < 10 ){
                return '0'+numero
            }
        }
    }
    return numero;
}