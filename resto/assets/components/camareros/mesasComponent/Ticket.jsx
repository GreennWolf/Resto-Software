import React, { useEffect, useState } from "react";
import { ScrollView,View,Text } from "react-native";
import pageStyle from "../../../styles/pageStyle";
import { TicketProduct } from "./TicketProduct";
import {TicketIng} from "./TicketIng"


export function Ticket({tickets,productos,prodCant,idmesa,selected,setSelected,ingredientes,cocinaList}){

    const total = []

    // const [realList,setRealList] = useState([]);
    
    return <View style={pageStyle.ticket}>
    <View style={pageStyle.ticketRow}>
        <Text style={pageStyle.ticketRowElement}>C</Text>
        <Text style={pageStyle.ticketRowElement}>Product</Text>
        <Text style={pageStyle.ticketRowElement}>P.U</Text>
        <Text style={pageStyle.ticketRowElement}>SubTotal</Text>
    </View>
    <ScrollView>
        {       

            cocinaList.map(items =>{
                const ingrediente = ingredientes.find(ingrediente => ingrediente._id == items.idIng)
                const producto = productos.find(producto => producto._id == items.idproducto)
                const ingPlus = ingredientes.find(ingPlus => ingPlus._id == items.idIngPlus)
                // console.log(items.idproducto , items.idIng ,)

                if(producto != undefined){
                    var subtotal = items.cant * producto.precio;
                    total.push(subtotal)
                    return <TicketProduct key={producto._id} selected={selected} setSelected={setSelected} prodCant={prodCant} cantidad={items.cant} producto={producto} subtotal={subtotal}/>
                }
                if(ingrediente != undefined){
                    return <TicketIng key={ingrediente._id + items.idprod} texto={'Sin '} precio={0} subtotal={0} selected={selected} id={ingrediente._id} setSelected={setSelected} cant={items.cant} ing={ingrediente.name}/>
                }
                if(ingPlus != undefined){
                    var subtotal = items.cant * ingPlus?.precio;
                    total.push(subtotal)
                    return <TicketIng key={ingPlus._id + items.idprod} subtotal={subtotal} precio={ingPlus.precio} texto={'Con '} selected={selected} setSelected={setSelected} cant={items.cant} id={ingPlus._id} ing={ingPlus.name}/>
                }
            })
            
            
            
            
        }
    </ScrollView>
    <View style={pageStyle.endBar}>
        <Text style={pageStyle.totalText}>Total</Text>
        <Text style={pageStyle.totalCant}>{ total.reduce((a, b) => a + b, 0)}</Text>
    </View>
</View>
}