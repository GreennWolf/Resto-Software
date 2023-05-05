import React, { useEffect, useState } from "react";
import { Producto } from "./Producto";
import '../../../css/Menu.css'
import { Ingrediente } from "./Ingrediente";

export function Menu({addLocalProduct,productos,setOpen,open,ingredientes,categorias,addLocalIngredient,addLocalIngredientPlus}){

    const [style , setStyle] = useState('disabled')
    const [categoria , setCategoria ] = useState()
    const [producto , setProducto] = useState()
    
    useEffect(() => {
        if(producto != undefined){
            setStyle("ingrediente-menu")
        }else{
            setStyle('disabled')
        }
    }, [producto])
    

    return <div className="menu-container">
        <div className="categorias-menu-container">
            {
                categorias.map(categoria =>{
                    return <div onClick={()=>{
                        setCategoria(categoria._id)
                        
                    }} className="categoria-menu">
                        {categoria.name}
                    </div>
                })
            }
        </div>
        <div className={'productos-menu-container'}>
            {
                productos.map(producto =>{
                    if(producto.categoria == categoria){
                        return <Producto key={producto._id} setProducto={setProducto} addLocalProduct={addLocalProduct} producto={producto}/>
                    }
 
                })
            }
        </div>
        <div className={'ingredientes-menu-container'}>
            {
                productos.map(prod =>{
                    if(producto != ''){
                        if(prod._id == producto){
                            const ingre = prod.ingredientes
                            var i
                            var len
                            var ing = []
                            for(i=0, len=ingre.length; i<len; i++){
                                // console.log(ingre[i])
                                ing.push(<Ingrediente texto={'Sin'} key={ingre[i].id} addLocalIngredientPlus={addLocalIngredientPlus} addLocalIngredient={addLocalIngredient} ingredientes={ingredientes} ingrediente={ingre[i].id}/>) 

                            }
                            // console.log(ing)
                            return ing                        
                        }
                    }
                    
                })
            }
            <div className={style} onClick={()=>{
                setOpen(!open)
            }}>Agregar Ingrediente</div>
        </div>
    </div>
}