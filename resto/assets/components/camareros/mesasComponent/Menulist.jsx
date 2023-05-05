import React from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";
import { Productos } from "./Productos";

export function Menulist({productos,getProdId,idcategoria,localAddProduct}){
    return <View style={pageStyle.menuList}>
        <ScrollView style={pageStyle.active} contentContainerStyle={pageStyle.row} >
            {productos.map(producto =>{
                if(producto.categoria == idcategoria){
                    return <Productos key={producto._id} localAddProduct={localAddProduct} producto={producto} getProdId={getProdId}/>
                }
            })}
        </ScrollView>
    </View>
}