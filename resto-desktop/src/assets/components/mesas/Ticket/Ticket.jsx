import React, { useState } from "react";
import { TicketProduct } from "./TicketProduct";
import { TicketIng } from "./TicketIng";
import { useEffect } from "react";

export function Ticket({cocinaList,setReaTotal,Comprobar,socket,productos,selected,setSelected,ingredientes,setCantidad,cantidad}){


    var total = []

    useEffect(()=>{
        socket.on('cocinaPrint',()=>{
            // window.print()
            // console.log('--------IMPRIMIENDO--------')
        })
        return () =>{
            socket.off('cocinaPrint')
        }
    },[])

    return <div className="ticket-container">
    <div className="ticket-top">
        <p>C</p>
        <p>Producto</p>
        <p>Precio Unitario</p>
        <p>Subtotal</p>
    </div>
    <div className="ticket-middle-container">
        {
            cocinaList?.map(items =>{
                
                const ingrediente = ingredientes.find(ingrediente => ingrediente._id == items.idIng)
                const producto = productos.find(producto => producto._id == items.idproducto)
                const ingPlus = ingredientes.find(ingPlus => ingPlus._id == items.idIngPlus)

                

                if(producto != undefined){
                    var cantidad = items.cant;
                    var name = producto.name
                    var price = producto.precio;
                    var subtotal = price * cantidad;
                    var id= producto._id;

                    var ticketData ={
                        id,    
                        cantidad,
                        name,
                        price,
                        subtotal
                    }
                    

                    total.push(subtotal)
                    // console.log(total)
                    return <TicketProduct key={producto._id} selected={selected} setSelected={setSelected} ticketData={ticketData}/>
                }
                if(ingrediente != undefined){
                    
                    return <TicketIng key={ingrediente._id + items.idprod} subtotal={0} texto={'Sin '} precio={0} selected={selected} setSelected={setSelected} cant={items.cant} id={ingrediente._id} ing={ingrediente.name}/>
                }

                if(ingPlus != undefined){
                    var subtotal = items.cant * ingPlus?.precio;
                    total.push(subtotal)
                    return <TicketIng key={ingPlus._id + items.idprod} texto={'Con '} subtotal={subtotal} precio={ingPlus.precio} selected={selected} setSelected={setSelected} cant={items.cant} id={ingPlus._id} ing={ingPlus.name}/>
                }
            })
        }
    </div>
    <div className="ticket-bot">
        <p>Total</p>
        <input type="number" className="cant-ticket-inp" placeholder="CANTIDAD" onChange={(e)=>{
            setCantidad(e.target.value)
        }} />
        <p>{total.reduce((a, b) => a + b, 0)}</p>
    </div>
</div>
}