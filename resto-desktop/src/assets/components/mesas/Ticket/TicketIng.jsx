import React from "react";
import { useState , useEffect } from "react";


export function TicketIng({cant,ing,precio,subtotal,texto,id,selected,setSelected}){
    
    const [style , setStyle] = useState('ticket-middle')
    
    useEffect(()=>{
        if(selected != id){
            setStyle('ticket-middle')
        }
    },[selected])


    return <div key={ing} onClick={()=>{
        // console.log(selected)
        if(style == 'ticket-middle'){
            setStyle('ticket-middle-selected')
            setSelected(id)
        }else{
            setStyle('ticket-middle')
            setSelected('')
        }
    }} className={style}>
        <p>{cant}</p>
        <p>{texto + '' + ing}</p>
        <p>{precio}</p>
        <p>{subtotal}</p>
    </div>
}


