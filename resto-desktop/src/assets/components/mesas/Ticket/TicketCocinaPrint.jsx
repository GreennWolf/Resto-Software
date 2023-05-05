import React from "react";
import { useParams } from "react-router-dom";
import logo from '../../printer/LOGO_SITGES.png'
import '../../../css/MesasPage.css'
import { useState } from "react";


export function TicketCocinaPrint({socket,productos,ingredientes,cuentas,mesas}){

    const [idmesa , setIdMesa] = useState()
    const [idcuenta , setIdCuenta] = useState()

    const [cocinaList , setCocinaList] = useState()
    const [datos , setDatos] = useState()

    socket.on('cocinaPrint',async (data)=>{

        console.log(data , 'xd')

    
        var datas = JSON.parse(data)

        const {idmesa,idcuenta,cocinaList,printer} = datas


        setIdMesa(idmesa)
        setIdCuenta(idcuenta)
        setCocinaList(cocinaList)
        setDatos(datas)


        

        setTimeout(() => {
            setDatos()
        }, 200);

    })    

    // console.log(datos)
    

    const mesa = mesas.find(mesa => mesa._id == idmesa)
    const mozo = cuentas.find(mozo => mozo._id == idcuenta)
    const total = []

    if(datos != undefined){
        return <div className="ticket-print">
        <div className="info-print-ticket">
            <p>MESA:{mesa.numero}</p>
            <p>MOZO:{mozo.empleado}</p>
        </div>
        <img className="ticket-print-img" src={logo} alt="" />
        <div className="ticket-print-container">
            <p>ARTICULO</p>
            <p>CANT</p>
            <p>P.U</p>
            <p>SUBTOTAL</p>
        </div>
        <div className="ticket-print-middle">
        {
            cocinaList?.map(items =>{
                
                const ingrediente = ingredientes.find(ingrediente => ingrediente._id == items.idIng)
                const producto = productos.find(producto => producto._id == items.idproducto)
                const ingPlus = ingredientes.find(ingPlus => ingPlus._id == items.idIngPlus)

                console.log(items)

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
                    
                    
                    return <div key={producto._id} className="ticket-print-art"><p>{producto.name}</p><p>{items.cant}</p><p>{producto.precio}</p><p>{subtotal}</p></div>
                }
                if(ingrediente != undefined){
                    
                    return <div key={ingrediente._id} className="ticket-print-art"><p>Sin {ingrediente.name}</p><p>{items.cant}</p><p>{0}</p><p>{0}</p></div>
                }

                if(ingPlus != undefined){
                    var subtotal = items.cant * ingPlus.precio;
                    total.push(subtotal)
                    return <div key={ingPlus._id} className="ticket-print-art"><p>Con {ingPlus.name}</p><p>{items.cant}</p><p>{ingPlus.precio}</p><p>{subtotal}</p></div>
                }
            })
        }
        </div>
        <div className="ticket-print-total">
            <p>TOTAL</p>
            <p>{total.reduce((a,b) => a+b,0)}</p>
        </div>
        <div className="ticket-print-msg">
            <b>Si acabas de llegar BIENENIDO</b><br />
            <b>si ya te vas vuelve PRONTO</b><br /><br />
            <p>*** NO VALIDO COMO FACTURA ***</p>
            <p>Cocina</p>
        </div>
    </div>
    }


    
}