import React, { useEffect, useState } from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";
import { Ingredientes } from "./Ingredientes";

export function IngredientsList({productos,prodId,openModal,setOpenModal,addIngredient,ingredientes}){

    const [style ,setStyle] = useState(pageStyle.inactive)
    const [ingre , setIngre] = useState([])
    const producto = productos.find(producto => producto._id == prodId)
    
    useEffect(()=>{
        if(prodId != ''){
            setStyle(pageStyle.active)
        }else{
            setStyle(pageStyle.inactive)
        }

        

    },[prodId])


    

    // console.log(producto,'xd')






    return <View style={pageStyle.menuIngredients}>
    <ScrollView horizontal style={style} >
        {
            productos.map(producto =>{
                if(prodId != ''){
                    if(producto._id == prodId){
                        const ingre = producto.ingredientes
                        var i
                        var len
                        var ing = []
                        for(i=0, len=ingre.length; i<len; i++){
                            // console.log(ingre[i])
                            ing.push(<Ingredientes key={ingre[i].id} texto={'Sin '} addIngredient={addIngredient} ingredientes={ingredientes} ingrediente={ingre[i].id}/>) 

                        }
                        return ing                        
                    }
                }
                
            })

        }
        <Text style={pageStyle.menuListElementsAdd} onPress={()=>{
            setOpenModal(!openModal)
        }}>Añadir Ingrediente</Text>
    </ScrollView>
</View>
}