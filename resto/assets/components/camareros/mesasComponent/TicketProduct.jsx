import React, { useEffect, useState } from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";

export function TicketProduct({producto,prodCant,subtotal,cantidad,setSelected,selected}){

    const [style , setStyle] = useState(pageStyle.ticketContent)
    const [newCant ,setNewCant] = useState(cantidad)

    useEffect(()=>{
        if(selected != producto._id){
            setStyle(pageStyle.ticketContent)
        }
    },[selected])

    return <View onTouchStart={()=>{

        if(style == pageStyle.ticketContent){
            setStyle(pageStyle.selected)
            setSelected(producto._id)
        }else{
            setStyle(pageStyle.ticketContent)
            setSelected()
        }
    }} style={style}>
    <Text style={pageStyle.ticketContentElement}>{cantidad}</Text>
    <Text style={pageStyle.ticketContentElement}>{producto.name}</Text>
    <Text style={pageStyle.ticketContentElement}>{producto.precio}</Text>
    <Text style={pageStyle.ticketContentElement}>{subtotal}</Text>
</View>
}