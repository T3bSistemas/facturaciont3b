'use client'
import {useEffect}                              from 'react'
import axios                                    from 'axios';
import { createContext, useContext, useState }  from 'react';
import Start                                    from '../components/Start'



const FacContext = createContext();
const SetFacContext = createContext();

export function useFContext() {
  return useContext(FacContext);
}

export function useSetFContext() {
  return useContext(SetFacContext);
}

/*const questions =[ 
  {
    id: 1,
    question: '¿Cuánto tiempo tengo para facturar?',
    details: 'Cuenta con 30 días naturales desde el momento de su compra para poder facturar su ticket'
  },
  {
    id: 2,
    question: '¿Puedo facturar sin Ticket?',
    details: 'Para poder identificar la compra necesitamos algunos datos que contiene el ticket, lo que hace imposible poder facturar si no contamos con esa información'
  },
  {
    id: 3,
    question: '¿Qué necesito para visualizar mi factura en PDF?',
    details: 'Necesita tener instalado en su equipo (PC o Móvil) Acrobat Reader para poder visualizar el formato PDF de su factura'
  },
  {
    id: 4,
    question: 'La factura no llega a mi correo electrónico',
    details: 'En el caso de no recibir su factura en su correo electrónico, puede intentar reenviar su factura en el apartado de reenvío o enviar un correo electrónico a la cuenta facturamicompra@t3b.com.mx, indicando las siguiente información: # Ticket, Fecha de Compra, # Tienda, # Caja, Importe de Compra y Datos fiscales.'
  },
  {
    id: 5,
    question: '¿Cómo puedo reenviar o reimprimir mi factura?',
    details: 'Desde la pantalla de "Inicio", pulsando la opción "Reimprimir Factura". Existen 2 opciones de búsqueda de facturas, por RFC o folio de factura.'
  },
  {
    id: 6,
    question: 'El sistema no me permite realizar mi facturación',
    details: 'En el caso de recibir algun mensaje de error por parte del sistema que no sea claro o simplemente no puede realizar su facturación, se puede poner en contacto con con nosotros al correo: facturamicompra@t3b.com.mx'
  },
  {
    id: 7,
    question: '¿Qué debo usar en la opción Uso de CFDI?',
    details: 'Esta opción es para que el contribuyente defina el uso de esta factura o bajo que concepto va a comprobar el egreso'
  } 
]*/

const header ={
  headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      'referrerPolicy': "unsafe_url"                  
  }  
}

const snackbar = {
    tipo: '',
    open:false,
    anchorOrigin:{
      vertical: 'bottom', 
      horizontal: 'right'
    },
    message:'',
    severity:'info'
}


const columsFactura=[
  {value: 'Fecha de Compra'},
  {value: 'Sucursal'},
  {value: 'Número de Caja'},
  {value: 'Número de Ticket'},
  {value: 'Total'},
  {value: 'Acción'},
]


export default function FacUserProvider() {
  const [fdata, setFdata]   = useState(
    {
      loading:false,
      usosCFDI:[],
      RegimenesFiscales:[],
      columsFactura:columsFactura,
      questions:[],
      header:header,
      snackbar:snackbar
    })
  
    useEffect(()=>{
      async function catalogos(){
        await axios.post(process.env.NEXT_PUBLIC_API_DASH+'/t3b-fact-das/catalogos',{} ,header)
        .then(function (response) {
          setFdata({...fdata, questions:response.data.questions, usosCFDI:response.data.usoscfdi, RegimenesFiscales:response.data.regimenesfiscales} )
        })
      }

      if(fdata.usosCFDI.length === 0 || fdata.RegimenesFiscales.length === 0 || fdata.questions.length === 0){
        catalogos() 
      }
    })
  return (
    <FacContext.Provider value={fdata}>
      <SetFacContext.Provider value={setFdata}>
        {(fdata.usosCFDI.length > 0 || fdata.RegimenesFiscales.length > 0 || fdata.questions.length > 0)&&
          <Start />
        }        
      </SetFacContext.Provider>      
    </FacContext.Provider>
  )
}
