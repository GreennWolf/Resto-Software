import React, { useState,useEffect } from "react";
import { ScrollView,View,Text, Modal, TextInput, Pressable } from "react-native";
import pageStyle from "../../../styles/pageStyle";
import axios from "axios";

export function Options({selected,socket,Eliminar,addProduct,cuentas,setSelected}){

    const [modalVisible, setModalVisible] = useState(false);

    const [codigo,setCodigo] = useState('')

    const [error,setError] = useState('')

    useEffect(() => {
      setError('')
    },[modalVisible])
    

    const idproducto = selected

    return <View>
        <View style={pageStyle.options}>
            <ScrollView horizontal>
                    <Text onPress={()=>{
                        addProduct()
                    }} style={pageStyle.textOptions}>Imprimir Cocina</Text>
                    <Text style={pageStyle.textOptions}>Imprimir y Cobrar</Text>
                    <Text onPress={()=>{
                        if(selected != ''){
                            setModalVisible(!modalVisible)
                        }else{
                            alert('debes seleccionar una producto para eliminar')
                        }
                    }} style={pageStyle.textOptions}>Eliminar</Text>
            </ScrollView>
        </View>
        <Modal transparent={true} visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}><View style={pageStyle.modalContainer}>
                <View style={pageStyle.modalBlock}>
                    <Pressable onPress={()=>{
                        setModalVisible(!modalVisible)
                        setError('')
                    }} style={pageStyle.cross}><Text style={pageStyle.crossText}>X</Text></Pressable>
                    <Text style={pageStyle.modalTitle}>Admin Code</Text>
                    <TextInput keyboardType={"number-pad"} onChangeText={(code)=>{
                        setCodigo(code)
                    }} style={pageStyle.modalInput}></TextInput>
                    <Text style={pageStyle.error}>{error}</Text>
                    <Pressable style={pageStyle.modalBtn} onPress={()=>{
                        if(codigo != ''){
                            if(codigo.length == 4){
                                cuentas.map(cuenta =>{
                                    if(cuenta.codigo == codigo){
                                        if(cuenta.admin == '1'){
                                            Eliminar()
                                            setModalVisible(!modalVisible)
                                            setSelected('')
                                            setError('')
                                        }else{
                                            setError('Ingresa un codigo de Administrador')
                                        }
                                    }else{
                                        setError('Ingresa un codigo de Administrador')
                                    }
                                })
                            }else{
                                setError('Ingresa un codigo de 4 cifras')
                            }
                        }
                    }} ><Text style={pageStyle.btnText}>ELIMINAR</Text></Pressable>
                </View>
            </View></Modal>
    </View>
}