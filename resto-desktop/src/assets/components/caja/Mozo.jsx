import React from "react";
import { useNavigate } from "react-router-dom";
import '../../css/CerrarMozo.css'

export function Mozo({cuentas}){
    const navigation = useNavigate()
    return <main>
        
        <header className="cerrar-header-pre">
            <h1>Cerrar Caja Mozo</h1>
            <h2>Elije un Mozo</h2>
        </header>
        
        <div className="mozos-container">
            {
                cuentas.map(cuenta =>{
                    if(cuenta.admin != true){
                        return <div key={cuenta._id} className="mozo-cube" onClick={()=>{
                            navigation(`/planilla-diaria/mozo/${cuenta._id}/`)
                        }}>{cuenta.empleado}</div>
                    }
                })
            }
        </div>
    </main>
}