import React, { useState , useEffect, Component} from "react";
import { View ,Text,TextInput, Pressable, Button, Switch} from "react-native";
import loginStyle from "../styles/loginStyle";
import axios from 'axios'
import { Redirect, useHistory, useRouteMatch } from "react-router-native";


export function Login({cuentas}){

    
    const [errorStyle,setErrorStyle] = useState(loginStyle.disabled)
    const [errors,setError] = useState('')
    let hist = useHistory()




    const [code,setCode] = useState('');

    function Send(){
        cuentas.map(cuenta =>{
            if(cuenta.codigo == code){
                const name = cuenta.empleado
                if(cuenta.admin == true){
                    hist.push(`/admin/${name}`)
                }else{
                    hist.push(`/mesaslist/${name}`)
                }
            }else{
                setErrorStyle(loginStyle.error)

                if(code.length != '4'){
                    setError('El codigo debe ser de 4 cifras')
                }else{
                    setError('El codigo es incorrecto')
                }
            }
        })
    }

    return <View style={loginStyle.container}>
        <Text style={loginStyle.titulo}>Login</Text>
        <View>
            <Text style={loginStyle.text}>Ingrese el Codigo</Text>
            <TextInput style={loginStyle.input} keyboardType={"number-pad"} onChangeText={(code)=>{
                setCode(code)
            }}></TextInput>
            <Text style={errorStyle}>{errors}</Text>
            <Pressable style={loginStyle.button} onPress={()=>{
                Send()
            }}><Text>Iniciar</Text></Pressable>
        </View>
    </View>
}
