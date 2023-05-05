import React, { useEffect } from "react";
import { useState } from "react";
import { View,Text, TextInput, Pressable } from "react-native";
import crearStyle from "../../../styles/crearStyle";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios'



export function CrearEmpleados({socket}){

    const [empleado,setName] = useState()
    const [codigo,setCode] = useState()
    const [admin , setAdmin] = useState(false)

    useEffect(()=>{
        setCode()
    },[])


    const  codeGen = (num) => {
        const characters ='1234567890';
        let result1= ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < num; i++ ) {
            result1 += Math.floor(Math.random() * charactersLength);
        }

        return result1
    }

    async function Send(){
        try{
            const data ={empleado,codigo,admin}
            socket.emit('addAccount',data)
        }catch(error){
            console.log(error)
        }
    }

    return <View style={crearStyle.container} >
        <Text style={crearStyle.title}>Agregar Empleado</Text>
        <View>
            <TextInput style={crearStyle.input} onChangeText={(name)=>{
                setName(name)
            }} placeholder="Nombre Compleato"></TextInput>
            <View style={crearStyle.codeContainer}><Pressable style={crearStyle.button} onPress={()=>{
                setCode(codeGen(4))
            }}><Text style={crearStyle.buttonText}>Generar codigo</Text></Pressable><Text style={crearStyle.codeText}>{codigo}</Text></View>
            <BouncyCheckbox isChecked={admin} onPress={()=>{
                setAdmin(!admin)
            }} style={crearStyle.check} textStyle={{textDecorationLine:'none',}} text="Dar Admin"></BouncyCheckbox>

            <Pressable style={crearStyle.btn} onPress={()=>{
                Send()
            }}><Text>Agregar</Text></Pressable>
        </View>
    </View>
}