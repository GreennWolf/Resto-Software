import React, { useEffect } from "react";
import { View,Text,Image,TouchableNativeFeedback,FlatList,ScrollView, TouchableWithoutFeedback} from "react-native";
import { useState } from "react";
import header from "../../styles/header";
import mesaStyle from "../../styles/mesaStyle"
import pageStyle from "../../styles/pageStyle";
import { Link, useParams } from "react-router-native";
import axios from 'axios'
import { Mesa } from "./mesasComponent/Mesa";



export function MesaList({mesas,cuentas,tickets}){

    const {name} = useParams()
    
    const cuenta = cuentas.find(cuenta => cuenta.empleado == name)

    const nombre = cuenta.empleado.split(' ')


    return(
        <ScrollView style={mesaStyle.container}>
            <Text style={mesaStyle.title}>Bienvenido {nombre[0]}</Text>
            <Text style={mesaStyle.subtitle}>Adentro</Text>
        <ScrollView style={pageStyle.active} contentContainerStyle={pageStyle.row}>
            {
                mesas.map(mesa =>{
                    if(mesa.zona == 0){
                        return <Mesa key={mesa._id} mesa={mesa} tickets={tickets} name={name}/>
                    }
                })
            }
        </ScrollView>
        <Text style={mesaStyle.subtitle}>21</Text>
        <ScrollView style={pageStyle.active} contentContainerStyle={pageStyle.row}>
            {
                mesas.map(mesa =>{
    
                    if(mesa.zona == 1){
                        return <Mesa key={mesa._id} mesa={mesa} tickets={tickets} name={name}/>
                    }
                })
            }
        </ScrollView>
        <Text style={mesaStyle.subtitle}>22</Text>
        <ScrollView style={pageStyle.active} contentContainerStyle={pageStyle.row}>
            {
                mesas.map(mesa =>{
                    if(mesa.zona == 2){
                        return <Mesa key={mesa._id} mesa={mesa} tickets={tickets} name={name}/>
                    }
                })
            }
        </ScrollView>
        </ScrollView>

        )


}