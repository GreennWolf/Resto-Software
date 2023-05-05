import React, { useEffect } from "react";
import { View,Text,TouchableWithoutFeedback} from "react-native";
import { Link, useParams } from "react-router-native";
import mesaStyle from "../../../styles/mesaStyle"
import { useState } from "react";

export function Mesa({mesa,name , tickets}){

    const [style , setStyle ] = useState(mesaStyle.card)
 
    useEffect(()=>{
        tickets.map(ticket =>{
            if(ticket.idmesa == mesa._id){
                if(ticket.productos != ''){
                    setStyle(mesaStyle.cardOpen)
                }
            }
        })
    },[tickets])

    return <Link to={`/mesa/${mesa._id}/${name}`} component={TouchableWithoutFeedback}>
            <View style={style} key={mesa._id}>
                <Text style={mesaStyle.text}>{mesa.numero}</Text>
            </View>
        </Link>
}