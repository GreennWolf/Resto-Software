import React from "react";

export function Options({addProduct,Cobrar,Eliminar}){
    return <div className="mesas-options">
        <div className="options" onClick={()=>{
            addProduct()
        }}>Imprimir cocina</div>
        <div className="options">Actualizar Ticket</div>
        <div className="options" onClick={()=>{
            Cobrar()
        }}>Imprimir Final</div>
        <div className="options" onClick={()=>{
            Eliminar()
        }}>Eliminar</div>
    </div>
}