import React, { useState } from "react";
import '../../../css/AddMesa.css'

export function AddMesa({socket}){

    const [numero , setNumero] = useState()
    const [zona , setZona] = useState(0)

    return <main>
        <header className="header-addmesas">
            <h1>Añadir Mesa</h1>
        </header>
        <div className="contenedor">
            <form action="" onSubmit={()=>{
                var data = {
                    numero,
                    zona,
                }
                socket.emit('AddMesa',data)
            }}>
                <h2 className="h2-addmesa">Numero de mesa</h2>
                <input onChange={(e)=>{
                    setNumero(e.target.value)
                }} className="inp-addmesa" type="number" placeholder="Numero de mesa" /><br />
                <select className="select-addmesa" onChange={(e)=>{
                    setZona(e.target.value)
                }} name="zona" id="">
                    <option value="0">Adentro</option>
                    <option value="1">21</option>
                    <option value="2">22</option>
                </select><br />
                <button className="addmesa-btn">Agregar Mesa</button>
            </form>
        </div>
    </main>
}