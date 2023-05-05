import React from "react";
import { useState , useEffect} from "react";

export function MesaItem({mesa,ticket,selectMesa,factura , setSelectMesa,setticketTemp}){
    console.log(mesa)
    const [style , setStyle] = useState('mesa-factura')
    
    useEffect(()=>{
        if(selectMesa != factura._id){
            setStyle('mesa-factura')
        }
    },[selectMesa])
    return <div key={factura._id} onClick={()=>{
        if(style == 'mesa-factura'){
            setStyle('mesa-factura-selected')
            setSelectMesa(factura._id)
        }else{
            setStyle('mesa-factura')
            setSelectMesa('')
        }
        setticketTemp(ticket)
    }} className={style}>Mesa: {mesa.numero}</div>
}