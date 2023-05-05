import React, { useEffect, useState } from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";

export function TicketIng({ing,selected,subtotal,id,precio,texto,setSelected,cant}){

    const [style , setStyle] = useState(pageStyle.ticketContent)
    // const [newCant ,setNewCant] = useState(cantidad)

    useEffect(()=>{
        if(selected != id){
            setStyle(pageStyle.ticketContent)
        }
    },[selected])

    return <View onTouchStart={()=>{

        if(style == pageStyle.ticketContent){
            setStyle(pageStyle.selected)
            setSelected(id)
        }else{
            setStyle(pageStyle.ticketContent)
            setSelected()
        }
    }} style={style}>
    <Text style={pageStyle.ticketContentElement}>{cant}</Text>
    <Text style={pageStyle.ticketContentElement}>{texto + '' + ing}</Text>
    <Text style={pageStyle.ticketContentElement}>{precio}</Text>
    <Text style={pageStyle.ticketContentElement}>{subtotal}</Text>
</View>
}