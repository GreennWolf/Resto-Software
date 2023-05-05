import React, { useState } from "react";
import { useEffect } from "react";

export function IngItem({ingList ,ing,newIngList ,usa, setNewIngList, ingredientes,ingrediente,check}){

    const [checked , setChecked]  = useState(check)
    const [selected , setSelected] = useState()
    const [usado , setUsado] = useState(1)
    const [usadoValue,setUsadoValue] = useState(usa)
    
    const id = ingrediente._id
    const ingComplete ={
        id,
        usado:usado,
    }

    useEffect(()=>{
        newIngList.map(item =>{
            if(item.id == ingComplete.id){
                item.usado = usado
                console.log(item.usado)
            }
        })
    },[usado])


    return <tr key={ingrediente._id}>
        <td>{ingrediente.stock}</td>
        <td>{ingrediente.name}</td>
        <td><input className="usado-input" type="number" defaultValue={usadoValue}  onChange={(e)=>{
            setUsado(e.target.value)
            setUsadoValue(e.target.value)
        }}/></td>
        <td><input className="check-input" onClick={()=>{
            setChecked(!checked)
            if(checked){
                const filteredLibraries = newIngList.filter((item) => item.id !== id)
                // console.log(filteredLibraries)
                setNewIngList(filteredLibraries)
            }else{
                
                setNewIngList([...newIngList,ingComplete])
            }

        }} type="checkbox" defaultChecked={checked}/></td>
    </tr>
}