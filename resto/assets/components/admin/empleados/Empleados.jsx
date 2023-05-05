import React from "react";
import { View,Text } from "react-native";
import { Link, useLocation } from "react-router-native";
import empleadosStyle from "../../../styles/empleadosStyle";

export function Empleados(){

    let location = useLocation();

    const name = location.pathname.split('/')
    console.log(name)

    return <View style={empleadosStyle.container}>
        <View>
            <Link to={'/crear/empleados'}><Text style={empleadosStyle.options}>Agregar Empleado</Text></Link>
            <Link to={'/lista/empleados'}><Text style={empleadosStyle.options}>Lista de Empleados</Text></Link>
            <Link to={`/admin/${name[2]}`}><Text style={empleadosStyle.options}>Atras</Text></Link>
        </View>
    </View>
}