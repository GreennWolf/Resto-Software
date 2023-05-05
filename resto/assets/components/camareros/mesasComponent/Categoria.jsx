import React, { useState } from "react";
import {Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";


export function Categoria({categoria,getIdCategoria}){

    return <Text onPress={()=>{
        getIdCategoria(categoria)
    }} style={pageStyle.menuElements}>{categoria.name}</Text>
}
