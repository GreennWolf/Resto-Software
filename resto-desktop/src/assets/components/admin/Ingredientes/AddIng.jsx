import React from "react";
import '../../../css/AddIng.css'
import { useState } from "react";

export function AddIng({socket}){

    const [ingrediente,setIngrediente] = useState();
    const [stock , setStock] = useState();
    const [precio , setPrecio] = useState();



    return <main>
        <div className="contenedor">
            <div className="adding-container">
                <h1 className="title-adding">Agregar Ingrediente</h1>
                <form action="" onSubmit={(e)=>{
                    e.preventDefault()
                    var data = {
                        ing:ingrediente,
                        precio,
                        stock
                    }
                    socket.emit('addIng',data)
                }}>
                    <input className="input-adding" type="text" placeholder="Ingrediente" required onChange={(e)=>{
                        setIngrediente(e.target.value)
                    }}/><br />
                    <input className="input-adding" type="number" placeholder="Precio" required onChange={(e)=>{
                        setPrecio(e.target.value)
                    }}/><br />
                    <input className="input-adding" type="number" placeholder="Stock" required onChange={(e)=>{
                        setStock(e.target.value)
                    }}/><br />
                    <button className="btn-adding">Agregar</button>
                </form>
            </div>
        </div>
    </main>
}