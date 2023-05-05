import React, { useState } from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";


export function Productos({producto,getProdId,localAddProduct}){

    return <Text onPress={()=>{
        getProdId(producto)
        localAddProduct(producto._id)
    }} style={pageStyle.menuListElements}>{producto.name}</Text>

}