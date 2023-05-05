import React, { useState } from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";


export function Ingredientes({ingrediente ,addIngredientPlus,texto,ingredientes,addIngredient}){
    
    const ing = ingredientes.find(ing => ing._id == ingrediente)

    return <Text style={pageStyle.menuListElements} onPress={()=>{
        if(texto != ''){
            addIngredient(ingrediente)
        }else{
            addIngredientPlus(ingrediente)
        }
    }}>{texto + ing.name }</Text>
}