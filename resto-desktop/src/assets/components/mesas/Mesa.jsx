import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export function Mesa({mesa ,tickets, idcuenta,navigation}){

    const [style , setStyle] = useState("mesa")

    useEffect(()=>{
        tickets.map(ticket =>{
            if(ticket.idmesa == mesa._id){
                if(ticket.productos != ''){
                    setStyle("mesaOpen")
                }
            }
        })
    },[tickets])

    return <div key={mesa.numero} className={style} onClick={
        ()=>{
            navigation(`/mesas/${mesa._id}/${idcuenta}`)
        }
    } >{mesa.numero}</div> 
}