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
  {value: 'Sucursal'},
  {value: 'Núm. Ticket'},
  {value: 'Caja'},
  {value: 'Total de Compra'},
  {value: 'Fecha de Compra'},  
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
