import React, { useEffect } from "react";
import { View,Text,Image,TouchableNativeFeedback} from "react-native";
import { useState } from "react";
import header from "../styles/header";
import menu from '../img/menu.png'
import { VirtualizedList } from "react-native-web";
import { Link, Router,useLocation, useParams } from "react-router-native";
import { Main } from "./Main";


export function Header(){
    const [style,setStyle] = useState(header.submenu)
    const [active,setActive] = useState(false)

    let location = useLocation();

    const name = location.pathname.split('/')

     function Head(){
        return <View style={header.container}>
            <Text style={header.text}>EMEGE</Text>
            <TouchableNativeFeedback onPress={()=>{
                setActive(true)
                if(!active){
                    setStyle(header.active)
                    setActive(true)
                }else{
                    setStyle(header.submenu)
                    setActive(false)
                }
            }}><Image style={header.img} source={menu}/></TouchableNativeFeedback>
        </View> 
    }
    
     function SubMenu(){
        return <View style={style}>
            <Link to={'/'}><Text style={header.option}>Atras</Text></Link>
            <Link to={`/mesasList/${name[3]}`}><Text style={header.option}>Mesas</Text></Link>
            <Link to={'/admin'}><Text style={header.option}>Admin</Text></Link>
        </View>
    }

    useEffect(()=>{
        setStyle(header.submenu)
        setActive(false)
       
    },[location])

    return <View>
        <Head></Head>
        <SubMenu></SubMenu>
    </View>
}




