import React, { useEffect, useState } from "react";

export function ItemAcc({cuenta,selected,editable,setSelected}){

    const [style,setStyle] = useState('acc-item')


    useEffect(()=>{
        if(selected != cuenta._id){
            setStyle('acc-item')
        }
    },[selected])

    useEffect(()=>{
        if(selected != cuenta._id){
            setStyle('acc-item')
        }else{
            setStyle('acc-item-selected')
        }
    },[editable])


    return <div className={style} onClick={()=>{
        if(style == 'acc-item'){
            setStyle('acc-item-selected')
            setSelected(cuenta._id)
        }else{
            setStyle('acc-item')
            setSelected('')
        }
    }}>{cuenta.empleado}</div>
}