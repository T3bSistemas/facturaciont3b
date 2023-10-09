'use client'
import { createContext, useContext, useState } from 'react';
import Start from '../components/Start'

const FacContext = createContext();
const SetFacContext = createContext();

export function useFContext() {
  return useContext(FacContext);
}

export function useSetFContext() {
  return useContext(SetFacContext);
}

const questions =[
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
    question: 'Como puedo reenviar o reimprimir mi factura?',
    details: 'Desde la pantalla de "Inicio", pulsando la opción "Reimprimir Factura". Existen 2 opciones de búsqueda de facturas, por RFC o folio de factura.'
  },
  {
    id: 6,
    question: 'El sistema no me permite realizar mi facturación',
    details: 'En el caso de recibir algun mensaje de error por parte del sistema que no sea claro o simplemente no puede realizar su facturación, se puede poner en contacto con con nosotros al correo: <b>facturamicompra@t3b.com.mx'
  },
  {
    id: 7,
    question: '¿Qué debo usar en la opción Uso de CFDI?',
    details: 'Esta opción es para que el contribuyente defina el uso de esta factura o bajo que concepto va a comprobar el egreso'
  }
]

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

const usosCFDI= [
  {
      value:'G01',
      item:'ADQUISICIÓN DE MERCANCIAS'
  },
  {
      value:'G02',
      item:'DEVOLUCIONES, DESCUENTOS O BONIFICACIONES'
  },
  {
      value:'G03',
      item:'GASTOS EN GENERAL'
  },
  {
      value:'S01',
      item:'SIN EFECTOS FISCALES'
  }
]

const RegimenesFiscales= [
  {
      value:'601',
      item:'GENERAL DE LEY PERSONAS MORALES'
  },
  {
      value:'603',
      item:'PERSONAS MORALES CON FINES NO LUCRATIVOS'
  },
  {
      value:'605',
      item:'SUELDOS Y SALARIOS E INGRESOS ASIMILADOS A SALARIOS'
  },
  {
      value:'606',
      item:'ARRENDAMIENTO'
  },
  {
      value:'611',
      item:'INGRESOS POR DIVIDENDOS (SOCIOS Y ACCIONISTAS)'
  },
  {
      value:'612',
      item:'PERSONAS FÍSICAS CON ACTIVIDADES EMPRESARIALES Y PROFESIONALES'
  },
  {
      value:'620',
      item:'SOCIEDADES COOPERATIVAS DE PRODUCCIÓN QUE OPTAN POR DIFERIR SUS INGRESOS'
  },
  {
      value:'621',
      item:'INCORPORACIÓN FISCAL'
  },
  {
      value:'622',
      item:'ACTIVIDADES AGRÍCOLAS, GANADERAS, SILVÍCOLAS Y PESQUERAS'
  },
  {
      value:'623',
      item:'OPCIONAL PARA GRUPOS DE SOCIEDADES'
  },
  {
      value:'624',
      item:'COORDINADOS'
  },
  {
      value:'625',
      item:'RÉGIMEN DE LAS ACTIVIDADES EMPRESARIALES CON INGRESOS A TRAVÉS DE PLATAFORMAS TECNOLÓGICAS'
  },
  {
      value:'626',
      item:'RÉGIMEN SIMPLIFICADO DE CONFIANZA'
  }
]

const columsFactura=[
  {value: 'Fecha de Compra'},
  {value: 'Sucursal'},
  {value: 'Numero de Caja'},
  {value: 'Numero de Ticket'},
  {value: 'Total'},
  {value: 'Accion'},
]


export default function FacUserProvider() {
  const [fdata, setFdata]   = useState(
    {
      loading:false,
      usosCFDI:usosCFDI,
      RegimenesFiscales:RegimenesFiscales,
      columsFactura:columsFactura,
      questions:questions,
      header:header,
      snackbar:snackbar
    })
  
  return (
    <FacContext.Provider value={fdata}>
      <SetFacContext.Provider value={setFdata}>
        <Start />
      </SetFacContext.Provider>      
    </FacContext.Provider>
  )
}
