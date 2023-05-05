import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ItemIngList } from "./ItemIngList";

export function ListaIngredientes({socket,ingredientes}){

    const [oculto , setOculto] = useState('oculto');
    const [editable , setEditable] = useState(false)
    const [selected,setSelected] = useState('')
    const [newName , setNewName] = useState('')
    const [newStock , setNewStock] = useState('')
    const [newPrecio , setNewPrecio] = useState('')
    const [ingName , setIngName] = useState('')
    const [ingStock , setIngStock] = useState('')
    const [ingPrecio , setIngPrecio] = useState('')


    const ingrediente = ingredientes.find(ingrediente => ingrediente._id == selected)
    console.log(ingrediente)


    useEffect(()=>{
        if(selected != ''){
            setOculto('')
            setIngName(ingrediente?.name)
            setIngStock(ingrediente?.stock)
            setIngPrecio(ingrediente?.precio)
        }else{
            setOculto('oculto')
        }
    },[selected])


    useEffect(()=>{
        if(editable == true){
            setNewName(ingrediente?.name)
            setNewPrecio(ingrediente?.precio)
            setNewStock(ingrediente?.stock)
        }
    },[editable])

    if(editable == false){
        return <main>
        <header className="header-lista">
            <h1>Lista Ingredientes</h1>
        </header>
        <div className="list-container">
            <div className="list-items">
                <div>
                    {
                        ingredientes.map(ingrediente =>{
                            return <ItemIngList ingrediente={ingrediente} setSelected={setSelected} selected={selected} editable={editable}/>
                        })
                    }
                </div>
            </div>
            <div className="info-list-container">
                <div className="info-list">
                    <h1>{ingrediente?.name}</h1>
                    <h2 className={oculto}>Stock:{ingrediente?.stock} </h2>
                    <h2 className={oculto}>Precio:{ingrediente?.precio}</h2>
                </div>
            </div>
        </div>
        <footer>
            <div className="options-planilla">
                <div className="option-planilla" onClick={()=>{
                    window.api3.send('addIng')
                }}>Agregar Ingrediente</div>
                <div className="option-planilla" onClick={()=>{
                    if(selected != ''){
                        setEditable(!editable)
                    }else{
                        alert('Selecciona un Ingrediente para editar')
                    }
                }}>Modificar Ingrediente</div>
                <div className="option-planilla" onClick={()=>{
                    if(selected != ''){
                        if(window.confirm('Estas seguro que quieres eliminar este Ingrediente')){
                            socket.emit('deletedIng',selected)
                            setTimeout(()=>{
                                setSelected('')
                            },200)
                        }
                    }else{
                        alert('Debes seleccionar un Ingrediente')
                    }
                }}>Eliminar Ingrediente</div>
            </div>
        </footer>
    </main>
    }else{
        return <main>
        <header className="header-lista">
            <h1>Lista Ingredientes</h1>
        </header>
        <div className="list-container">
            <div className="list-items">
                <div>
                    {
                        ingredientes.map(ingrediente =>{
                            return <ItemIngList ingrediente={ingrediente} setSelected={setSelected} selected={selected} editable={editable}/>
                        })
                    }
                </div>
            </div>
            <div className="info-list-container">
                <div className="info-list">
                    <h1>{<input type='text' placeholder='Ingrediente' className={'ing-input'} value={ingName} onChange={(e)=>{
                        setIngName(e.target.value)
                        setNewName(e.target.value)
                    }}/>}</h1>
                    <h2 className={oculto}>Stock:<input type='text' className={'ing-input'} placeholder='Stock' value={ingStock} onChange={(e)=>{
                        setIngStock(e.target.value)
                        setNewStock(e.target.value)
                    }} /></h2>
                    <h2 className={oculto}>Precio:<input type='text' className={'ing-input'} placeholder='Precio' value={ingPrecio} onChange={(e)=>{
                        setIngPrecio(e.target.value)
                        setNewPrecio(e.target.value)
                    }} /></h2>
                </div>
            </div>
        </div>
        <footer>
            <div className="options-planilla-modify">
                <div className="option-planilla" onClick={()=>{
                    setEditable(!editable)                    
                }}>Cancelar</div>
                <div className="option-planilla" onClick={()=>{
                    var data = {
                        idIng:ingrediente._id,
                        name:newName,
                        stock:newStock,
                        precio:newPrecio,
                    }
                    socket.emit('editedIng',data)
                    console.log(data)
                    setEditable(!editable)
                }}>Aceptar</div>
            </div>
        </footer>
    </main>
    }
}