import React from "react";

export function Producto({addLocalProduct,producto,setProducto}){
    return <div onClick={()=>{
        setProducto(producto._id)
        addLocalProduct(producto._id)
    }} className="producto-menu">{producto.name}</div>
}