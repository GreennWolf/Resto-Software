import React from "react";
import { View ,Text} from "react-native";
import { Link, useParams } from "react-router-native";
import adminStyle from "../../styles/adminStyle";

export function AdminMenu({cuentas}){
    const {name} = useParams()
    
    const cuenta = cuentas.find(cuenta => cuenta.empleado == name)

    return <View style={adminStyle.container}>
        <Text style={adminStyle.title}>Bienvenido {cuenta?.empleado}</Text>
        <View>
            <Link to={'/empleados'}><Text style={adminStyle.options}>Administrar Empleados</Text></Link>
            <Link to={'/productos'}><Text style={adminStyle.options}>Administrar Productos</Text></Link>
            <Link to={'/ventas'}><Text style={adminStyle.options}>Administrar Ventas</Text></Link>
            <Link to={'/'}><Text style={adminStyle.options}>Log Out</Text></Link>
        </View>
    </View>
}