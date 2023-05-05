import React, { useState } from "react";
import { useEffect } from "react";

export function ItemList({producto,selected,setSelected,setIngList,editable}){
    const [style , setStyle ] = useState('itemList')
    
    useEffect(()=>{
        if(selected != producto._id){
            setStyle('itemList')
        }
    },[selected])

    useEffect(()=>{
        if(selected != producto._id){
            setStyle('itemList')
        }else{
            setStyle('itemList-selected')
        }
    },[editable])

    return <div key={producto._id} onClick={()=>{
        if(style == 'itemList'){
            setStyle('itemList-selected')
            setSelected(producto._id)
        }else{
            setStyle('itemList')
            setSelected('')
        }
        setIngList(producto.ingredientes)
    }} className={style}>{producto.name}</div>
}