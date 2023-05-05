import React from "react";
import { useState , useEffect } from "react";


export function TicketProduct({ticketData,selected,setSelected}){
    const {id,cantidad , name , price , subtotal} = ticketData
    const [style , setStyle] = useState('ticket-middle')
    
    useEffect(()=>{
        if(selected != id){
            setStyle('ticket-middle')
        }
    },[selected])


    return <div key={id} onClick={()=>{
        if(style == 'ticket-middle'){
            setStyle('ticket-middle-selected')
            setSelected(id)

        }else{
            setStyle('ticket-middle')
            setSelected('')
        }
    }} className={style}>
        <p>{cantidad}</p>
        <p>{name}</p>
        <p>{price}</p>
        <p>{subtotal}</p>
    </div>
}