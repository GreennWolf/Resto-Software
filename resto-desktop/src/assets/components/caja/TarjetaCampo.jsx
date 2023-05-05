import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export function TarjetaCampo({monto,id,selected , setSelected}){
    const [style , setStyle] = useState('td')
    
    useEffect(()=>{
        if(selected != id){
            setStyle('td')
        }
    },[selected])
    return <td className={style} onClick={()=>{
        console.log(selected)
        if(style == 'td'){
            setStyle('td-selected')
            setSelected(id)
        }else{
            setStyle('td')
            setSelected('')
        }
    }}>{monto}</td>
}