import React, { useEffect } from "react";
import { useState } from "react";
import '../../css/PlanillaDiaria.css'
import { GastoCampo } from "./GastoCampo";

export function PlanillaDiaria({socket ,planillas,cambio,setCambio,cambios,setCambios,gastos,fecha, cajas}){

    
    const [gastosLocal , setGastosLocal] = useState([])
    const [gastoName , setGastoName] = useState()
    const [gastoMonto , setGastoMonto] = useState()
    const [planillaId , setPlanillaId] = useState()

    const [valorMonto , setValorMonto] = useState()
    const [valorName , setValorName] = useState()
    const [total , setTotal] = useState()
    
    const [cambioValue , setCambioValue] = useState()
    const [gastoId , setGastoId] = useState()
    
    const gastoTotal = [0]
    
    const cajaTotal =[]
    const targetas = []
    const MP = []
    

    useEffect(()=>{
        var MpTotal = MP.reduce((a,b)=> a + b ,0)
        var targetasTotal = targetas.reduce((a,b)=> a + b ,0)
        var cajaSuma = cajaTotal.reduce((a,b)=> a+b,0)
        var cambioTotal = cambios.reduce((a,b)=> a+b,0)
        var gastoMontoTotal = gastoTotal.reduce((a, b) => a + b);

        // console.log(cajaSuma,MpTotal,targetasTotal,cambioTotal,gastoMontoTotal)
    
        var totally = cambioTotal + cajaSuma - targetasTotal - MpTotal - gastoMontoTotal
        setTotal(totally)
    },[cajaTotal])

    useEffect(()=>{
        planillas.map(planilla =>{
            if(planilla.fecha == fecha){
                setPlanillaId(planilla._id)
            }
        })
    },[])


    return <main>
        
        <header className="header-planilla">
            <h1 className="title-planilla">Planilla Diaria</h1>
        </header>
        <div className="table-planilla">
            <table>
                <thead>
                    <tr><th>Cambio</th></tr>
                </thead>
                <tbody>
                    {
                        cambios.map(change =>{
                            return <tr>
                                <td>{change}</td>
                            </tr>
                        })
                    }
                    <tr>
                        <td><input type="number" value={cambioValue} placeholder="Cambio"  onChange={(e)=>{
                            setCambio(parseInt(e.target.value))
                            setCambioValue(e.target.value)
                        }}/></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Cajas</th>
                        <th>Tarjetas</th>
                        <th>Mercado Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cajas.map(caja =>{
                            if(caja.fecha == fecha){
                                targetas.push(parseInt(caja.targetas))
                                MP.push(caja.mercadoPago)
                                cajaTotal.push(caja.caja)
                                return <tr key={caja._id}>
                                <td>{caja.caja}</td>
                                <td>{caja.targetas}</td>
                                <td>{caja.mercadoPago}</td>
                            </tr>
                            }
                        })
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Gasto</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                 {
                        gastos.map(gasto =>{
                            if(gasto.fecha == fecha){
                                gastoTotal.push(parseInt(gasto.monto))
                                return <GastoCampo gasto={gasto} gastoId={gastoId} setGastoId={setGastoId}/>
                            }
                        })

                        
                    }
                    <tr>
                        <td><input type="text" value={valorName} placeholder="Nombre Del Gasto" onChange={(e)=>{
                            setGastoName(e.target.value)
                            setValorName(e.target.value)
                        }}/></td>
                        <td><input type="number" value={valorMonto} placeholder="Monto Del Gasto" onChange={(e)=>{
                            setGastoMonto(e.target.value)
                            setValorMonto(e.target.value)
                        }} /></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr><th>Total</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer>
            <div className="options-planilla">
                <div className="option-planilla" onClick={()=>{
                    setCambios([...cambios,cambio])
                    setCambioValue('')
                }}>Guardar Cambio</div>
                <div className="option-planilla" onClick={()=>{
                    if(gastoName != undefined  && gastoMonto != undefined){
                        setGastosLocal([...gastosLocal,{
                            idgasto:gastos.length,
                            gasto:gastoName,
                            monto:gastoMonto,
                        }])
                        setValorMonto('')
                        setValorName('')
                        gastoTotal.push(parseInt(gastoMonto))
                    }
                    var data = {
                        fecha,
                        name:gastoName,
                        monto:gastoMonto
                    }
                    socket.emit('newGasto',data)
                    setGastoName('')
                    setGastoMonto('')
                }}>Cargar Gasto</div>
                <div className="option-planilla" onClick={()=>{
                    socket.emit('deleteGasto',gastoId)
                }}>Eliminar Gasto</div>
                <div className="option-planilla" onClick={()=>{
                    var data = {
                        planillaId,
                        fecha,
                        cambio:cambios.reduce((a,b)=> a+b,0),
                        cajas:cajaTotal.reduce((a,b)=> a+b ,0),
                        targetas:targetas.reduce((a,b)=> a+b ,0),
                        mercadoPago:MP.reduce((a,b)=> a+b ,0),
                        gastos:gastoTotal.reduce((a,b)=>a+b,0),
                        total:total,
                    }
                    socket.emit('newPlanilla',data)
                }}>Guardar Planilla</div>
            </div>
        </footer>
    </main>
}