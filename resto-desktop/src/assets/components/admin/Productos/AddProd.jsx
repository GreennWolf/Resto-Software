import React, { useEffect } from "react";
import { useState } from "react";
import '../../../css/AddProd.css'
import { IngProdList } from "./IngProdList";

export function AddProd({socket,ingredientes,categorias}){


    const [name , setName] = useState();
    const [precio , setPrecio] = useState();
    const [categoria , setCategoria] = useState();
    const [ingList , setIngList] = useState([])
    const [zona , setZona] = useState()

    useEffect(()=>{
        setIngList([])
    },[])

    useEffect(()=>{
        setCategoria(categorias[0])
        setZona(1)
        console.log(categoria)
    },[categorias])
    console.log(precio)
    
    return <main>
        <div className="contenedor">
            <div className="addprod-container">
                <h1 className="title-addprod">Agregar Producto</h1>
                <form action="" onSubmit={(e)=>{
                    
                    var data = {
                        name,
                        precio,
                        categoria,
                        ingList,
                        zona,
                    }

                    socket.emit('addProd',data)
                }}>
                    <input className="input-addprod" type="text" placeholder="Producto" onChange={(e)=>{
                        setName(e.target.value)
                    }} /><br />
                    <label htmlFor="categorias">Categoria</label><br />
                    <select className="select-addprod" name="categorias" id="categorias" onChange={(e)=>{
                        setCategoria(e.target.value)
                    }}>
                        {categorias.map(cat =>{
                            return <option key={cat._id} value={cat._id}>{cat.name}</option>
                        })}
                    </select><br />
                    <input className="input-addprod" type="number" placeholder="Precio" onChange={(e)=>{
                        setPrecio(e.target.value)
                    }} /><br />
                    <div className="select-container">
                        <p>Zona:</p><select name="zona" id="zona" onChange={(e)=>{
                            setZona(e.target.value)
                        }}>
                            <option value="1">Barra</option>
                            <option value="2">Cocina</option>
                        </select>
                    </div>
                    <div className="addprod-ing-container">
                        <input className="search-addprod" type="text" placeholder="Buscar" />
                        <div className="addprop-ing">
                            {
                                ingredientes.map(ing =>{
                                    return <IngProdList key={ing._id} ing={ing} setIngList={setIngList} ingList={ingList}/>
                                })
                            }
                        </div>
                    </div>
                    <button className="addprod-btn">Agregar</button>
                </form>
            </div>
        </div>
    </main>
}
