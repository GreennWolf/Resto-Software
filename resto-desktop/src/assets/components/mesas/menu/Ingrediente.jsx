import React from "react";

export function Ingrediente({ingrediente,texto ,addLocalIngredient,addLocalIngredientPlus, ingredientes}){
    const ing = ingredientes.find(ing => ing._id == ingrediente)
    // console.log(ing)

    return <div className="ingrediente-menu" onClick={()=>{
        if(texto != ''){
            addLocalIngredient(ing?._id)
        }else{
            addLocalIngredientPlus(ing?._id)
        }
        // console.log(ing?._id)
    }}>{texto} {ing?.name}</div>
}