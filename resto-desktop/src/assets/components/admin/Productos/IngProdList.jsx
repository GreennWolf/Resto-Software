import React from "react";
import { useState } from "react";

export function IngProdList({ing ,ingList,setIngList}){

    const [checked , setChecked] = useState(false);
    const [usado , setUsado] = useState(1)


    return <div className="ingprod-element">
        <p>{ing.stock}</p>
        <p>{ing.name}</p>
        <input type="number" placeholder="usado" onChange={(e)=>{
            setUsado(e.target.value)
        }} value={usado}/>
        <input type="checkbox" onClick={()=>{
            setChecked(!checked)
            var id = ing._id
            var ingComplete ={
                id,
                usado,
            }
            if(checked){
                const filteredLibraries = ingList.filter((item) => item.id !== id)
                // console.log(filteredLibraries)
                setIngList(filteredLibraries)
            }else{
                
                ingList.push(ingComplete)
            }
        }}/>
    </div>
}