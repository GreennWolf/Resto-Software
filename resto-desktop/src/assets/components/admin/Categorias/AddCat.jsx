import React from "react";
import { useState } from "react";

export function AddCat({socket}){

    const [name,setName] = useState('')
    const [inpValue , setInpValue] = useState('')

    return <main>
        <header className="addcat-header">
            <h1>Agregar Categoria</h1>
        </header>
        <div className="contenedor">
            <form onSubmit={()=>{
                socket.emit('addCat',name)
                setInpValue('')
            }} className="form-cat" >
                <h2>Categoria:</h2>
                <input onChange={(e)=>{
                    setName(e.target.value)
                    setInpValue(e.target.value)
                }} className="input-addprod" value={inpValue} type="text" placeholder="Nombre de la Categoria" /><br />
                <button className="addcat-btn">Agregar</button>
            </form>
        </div>
    </main>
}