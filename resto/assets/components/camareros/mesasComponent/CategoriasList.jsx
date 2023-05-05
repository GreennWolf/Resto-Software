import React from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";
import { Categoria } from "./Categoria";

export function CategoriasList({categorias,getIdCategoria}){

    return <View style={pageStyle.menuContainer}>
    <ScrollView horizontal>
        {categorias.map(categoria =>{
            return <Categoria key={categoria._id} getIdCategoria={getIdCategoria} categoria={categoria}/>
        })}
    </ScrollView>
</View>
}