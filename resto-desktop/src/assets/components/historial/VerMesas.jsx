import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import '../../css/VerMesas.css'
import { TicketIng } from "../mesas/Ticket/TicketIng";
import { TicketProduct } from "../mesas/Ticket/TicketProduct";
import { MesaItem, MesaObejet } from "./MesaItem";


export function VerMesas({cuentas,fecha,facturas,mesas,ingredientes,productos}){
    const {idcuenta} = useParams()

    const cuenta = cuentas.find(cuenta => cuenta._id == idcuenta)

    const total = []
    const [ticketTemp , setticketTemp ] = useState()
    const [selected,setSelected] = useState()
    const [selectMesa , setSelectMesa] = useState()
 

    return <main>
        
        <header className="cerrar-header">
            <h1>Historial de {cuenta.empleado}</h1>
        </header>
        <div className="facturas-historial-container">
            <div className="mesas-mozos">
                {
                    facturas.map(factura =>{
                        var content = []
                        if(factura.fecha == fecha){
                            factura.ticket.map(ticket =>{
                                if(ticket.productos != '' && ticket.productos != undefined){
                                    if(ticket.idcuenta == idcuenta){
                                        const mesa = mesas.find(mesa => mesa._id == ticket.idmesa)
                                        console.log(mesa)
                                    
                                        content.push(<MesaItem factura={factura} ticket={ticket} setSelectMesa={setSelectMesa} selectMesa={selectMesa} mesa={mesa} setticketTemp={setticketTemp}/>)
                                    }
                                }
                            })
                        }
                        return content
                    })
                }
            </div>
            <div className="ticket-container-vermesas">
                    <div className="ticket-top">
                        <p>C</p>
                        <p>Producto</p>
                        <p>Precio Unitario</p>
                        <p>Subtotal</p>
                    </div>
                    <div className="ticket-middle-container-vermesas">
                        {
                            ticketTemp?.productos?.map(items =>{
                                
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
                                    console.log(total)
                                    return <TicketProduct key={producto._id} selected={selected} setSelected={setSelected} ticketData={ticketData}/>
                                }
                                if(ingrediente != undefined){
                                    
                                    return <TicketIng key={ingrediente._id + items.idprod} subtotal={0} precio={0} texto={'Sin '} selected={selected} setSelected={setSelected} cant={items.cant} id={ingrediente._id} ing={ingrediente.name}/>
                                }

                                if(ingPlus != undefined){
                                    var subtotal = items.cant * ingPlus?.precio
                                    total.push(subtotal)
                                    return <TicketIng key={ingPlus._id + items.idprod} texto={'Con '} subtotal={subtotal} precio={ingPlus.precio} selected={selected} setSelected={setSelected} cant={items.cant} id={ingPlus._id} ing={ingPlus.name}/>
                                }
                            })
                        }
                    </div>
                    <div className="ticket-bot">
                        <p>Total</p>
                        <p>{total.reduce((a, b) => a + b, 0)}</p>
                    </div>
                </div>
            </div>

    </main>
}