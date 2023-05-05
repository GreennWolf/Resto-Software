import React from "react"
import { ScrollView,View,Text } from "react-native"
import pageStyle from "../../../styles/pageStyle"

export function Numpad({setCant,cant}){
    return <View style={pageStyle.numpad}>
    <ScrollView style={{marginLeft:10,marginTop:10,}} contentContainerStyle={pageStyle.row} >
        <Text onPress={()=>{
            setCant(cant + '1')
        }} style={pageStyle.numpadElement}>1</Text>
        <Text onPress={()=>{
            if(cant == 1){
                setCant(2)
            }else{
                setCant(cant + '2')
            }
        }} style={pageStyle.numpadElement}>2</Text>
        <Text onPress={()=>{
            if(cant == 1){
                setCant(3)
            }else{
                setCant(cant + '3')
            }
        }} style={pageStyle.numpadElement}>3</Text>
        <Text onPress={()=>{
            if(cant == 1){
                setCant(4)
            }else{
                setCant(cant + '4')
            }
        }}  style={pageStyle.numpadElement}>4</Text>
        <Text onPress={()=>{
            if(cant == 1){
                setCant(5)
            }else{
                setCant(cant + '5')
            }
        }}  style={pageStyle.numpadElement}>5</Text>
        <Text style={pageStyle.numpadElement}>6</Text>
        <Text style={pageStyle.numpadElement}>7</Text>
        <Text style={pageStyle.numpadElement}>8</Text>
        <Text style={pageStyle.numpadElement}>9</Text>
        <Text style={pageStyle.numpadCant}>{cant}</Text>
        <Text style={pageStyle.numpadElement}>0</Text>
        <Text onPress={()=>{
            if(cant.length >1){
                setCant(cant.substr(0, cant.length - 1))
            }
            if(cant.length == '1'){
                setCant(1)
            }
            if(cant == ''){
                setCant(0)
            }

        }} style={pageStyle.numpadElement}>{'<-'}</Text>
    </ScrollView>
    </View>
}