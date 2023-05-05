import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export function GastoCampo({gasto,gastoId,setGastoId}){
    const [gastoStyle , setGastoStyle] = useState("gasto-tr")

    useEffect(()=>{
        if(gastoId == gasto._id){
            setGastoStyle('gasto-tr-active')
        }else{
            setGastoStyle('gasto-tr')
        }
    },[gastoId])

    return <tr className={gastoStyle} onClick={()=>{
        if(gastoId == gasto._id){
            setGastoId()
        }else{
            setGastoId(gasto._id)
        }
    }} key={gasto._id}>
        <td>{gasto.name}</td>
        <td>{gasto.monto}</td>
    </tr>
}