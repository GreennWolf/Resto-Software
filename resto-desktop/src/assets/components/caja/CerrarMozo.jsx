import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../css/CerrarMozo.css'
import { TarjetaCampo } from "./TarjetaCampo";


export function CerrarMozo({cuentas,fecha,socket,facturas,targetas,mesas,productos}){
    const {idcuenta} = useParams()

    const cuenta = cuentas.find(cuenta => cuenta._id == idcuenta)

    const total = []
    const [targeta,setTargeta] = useState()
    const [mercadoPago , setMercadoPago] = useState()
    const [pagos , setPagos] = useState([])
    const [monto , setMonto] = useState(0)

    const [valorMercado , setValorMercado] = useState()
    const [valorTargeta , setValorTargeta] = useState()

    const [selected , setSelected] = useState()
    
    const totalPago = []
    const totalTargetas = []
    const totalMP = []



    function newTargeta(data){
        socket.emit('newTargeta',data)
    }

    // console.log(fecha)

    useEffect(()=>{
        var sumaTargetas = totalTargetas.reduce((a, b) => a + b, 0)
        var sumaMP = totalMP.reduce((a, b) => a + b, 0)

        // console.log(totalMP,totalTargetas)

        var suma = sumaTargetas + sumaMP

        // console.log(suma)
        setMonto(suma)
    })

    facturas.map(factura =>{
        if(factura.fecha == fecha){
            factura.ticket.map(ticket =>{
                if(ticket.idcuenta == idcuenta){
                    ticket.productos.map(items =>{
                        const producto = productos.find(producto => producto._id == items.idproducto)
    
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
                        }
                    })
                }
            })
        }
    })
    // console.log(totalPago)
    // console.log(monto)

    return <main>
        <header className="cerrar-header">
            <h1>Cerrar Caja De {cuenta.empleado}</h1>
        </header>
        <div className="facturas-mozos-container">
            <table>
                <thead>
                    <tr>
                        <th>Caja</th>
                        <th>Tarjetas</th>
                        <th>Mercado Pago</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        targetas.map(pago=>{
                            if(pago.idcuenta == idcuenta && pago.fecha == fecha){
                                if(pago.targeta != '' && pago.targeta != undefined){
                                    totalTargetas.push(parseInt(pago.targeta))
                                }
                                if(pago.mercadoPago != '' && pago.mercadoPago != undefined){
                                    totalMP.push(parseInt(pago.mercadoPago))
                                }
                                return <tr>
                                    <td></td>
                                    <TarjetaCampo selected={selected} setSelected={setSelected} monto={pago.targeta} id={pago._id}/>
                                    <TarjetaCampo selected={selected} setSelected={setSelected} monto={pago.mercadoPago} id={pago._id}/>
                                    <td></td>
                                </tr>
                            }
                        })
                    }
                    <tr>
                        <td>{total.reduce((a, b) => a + b, 0)}</td>
                        <td><input value={valorTargeta} onChange={(e)=>{
                            setTargeta(e.target.value)
                            setValorTargeta(e.target.value)
                        }} type="number" placeholder="Tarjetas"/></td>
                        <td><input onChange={(e)=>{
                            setMercadoPago(e.target.value)
                            setValorMercado(e.target.value)
                        }} type="number" value={valorMercado} placeholder="Mercado Pago" /></td>
                        <td>{total.reduce((a,b)=> a+b , 0) -  monto  }</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer>
            <div className="options-planilla">
                <div className="option-planilla" onClick={()=>{
                    if(targeta != undefined || mercadoPago != undefined ){
                        setPagos([...pagos,{
                            targeta:targeta,
                            mercadopago:mercadoPago
                        }])

                        setValorMercado('')
                        setValorTargeta('')
                    }
                    if(targeta != undefined){
                        
                        totalPago.push(parseInt(targeta))
                        // console.log(totalPago)
                        totalTargetas.push(parseInt(targeta))
                    }

                    if(mercadoPago != undefined ){
                        totalPago.push(parseInt(mercadoPago))
                        totalMP.push(parseInt(mercadoPago))
                    }



                    var sumaTargetas = totalTargetas.reduce((a, b) => a + b, 0)
                    var sumaMP = totalMP.reduce((a, b) => a + b, 0)

                    // console.log(totalMP,totalTargetas)

                    var suma = sumaTargetas + sumaMP

                    // console.log(suma)
                    setMonto(suma)
                    
                    var data = {
                        targetas:targeta,
                        mercadoPago,
                        idcuenta,
                        fecha,
                    }

                    newTargeta(data)

                    setTargeta('')
                    setMercadoPago('')
                    
                }}>Cargar Targeta/Mercado Pago</div>
                <div className="option-planilla" onClick={()=>{
                    socket.emit('deleteTarjeta' , selected)
                }}>Borrar Targeta/Mercado Pago</div>
                <div className="option-planilla" onClick={()=>{
                    var sumaTargetas = totalTargetas.reduce((a, b) => a + b, 0)
                    var sumaMP = totalMP.reduce((a, b) => a + b, 0)
                    var cajaTotal = total.reduce((a, b) => a + b, 0)
                    var totally = cajaTotal - monto;
                    var data = {
                        fecha,
                        idcuenta,
                        cajaMonto:cajaTotal,
                        targetas:sumaTargetas,
                        mercadoPago:sumaMP,
                        total:totally

                    }
                    socket.emit('closeCaja',data)
                }}>Cerrar Caja</div>
            </div>
        </footer>
    </main>
}