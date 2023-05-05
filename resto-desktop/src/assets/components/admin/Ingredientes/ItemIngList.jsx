import React ,{useState,useEffect} from "react";


export function ItemIngList({selected,setSelected,ingrediente,editable}){
    const [style , setStyle ] = useState('itemList')
    
    useEffect(()=>{
        if(selected != ingrediente._id){
            setStyle('itemList')
        }
    },[selected])

    useEffect(()=>{
        if(selected != ingrediente._id){
            setStyle('itemList')
        }else{
            setStyle('itemList-selected')
        }
    },[editable])

    return <div key={ingrediente._id} onClick={()=>{
        if(style == 'itemList'){
            setStyle('itemList-selected')
            setSelected(ingrediente._id)
        }else{
            setStyle('itemList')
            setSelected('')
        }
    }} className={style}>{ingrediente.name}</div>
}