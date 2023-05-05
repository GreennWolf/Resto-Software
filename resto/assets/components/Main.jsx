import React from "react";
import axios from "axios";
import { View ,Text} from "react-native";
import { useState, useEffect } from "react";
import { Switch,Route, useLocation ,NativeRouter} from "react-router-native";
import { Login } from "./Login";
import { AdminMenu } from "./admin/AdminMenu";
import { Empleados } from "./admin/empleados/Empleados";
import { CrearEmpleados } from "./admin/empleados/CrearEmpleados";
import { MesaPage } from "./camareros/MesaPage";
import { MesaList } from "./camareros/MesaList";
import io from 'socket.io-client'




export function Main(){

    const [mesas, setMesas] = useState([])
    const [cuentas, setCuentas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([])
    const [tickets, setTickets] = useState([])
    const [ingredientes, setIngredientes] = useState([])
    const [ingprods, setIngprods] = useState([])
    const [ip,setIp] = useState('http://192.168.0.107:5000')  
  
    const socket = io(ip)

    useEffect(()=>{
        getMesas()
        getCuentas()
        getCategorias()
        getProductos()
        getIngredientes()
        // getIngprods()
        getTickets()

        socket.on('created',()=>{
            getCuentas()
        })

        socket.on('editedIng',()=>{
            getIngredientes()
        }) 

        socket.on('editedProd',()=>{
            getProductos()
        })

        socket.on('ticketEdited', async (tickets)=>{
            await getTickets()
        })

        socket.on('newCat',()=>{
            getCategorias()
        })

        socket.on('NewMesaAdding',async ()=>{
            getMesas()
        })
        
        return () =>{
            socket.off('ticketEdited')
            socket.off('created')
            socket.off('editedIng')
            socket.off('editedProd')
            socket.off('newCat')
            socket.off('NewMesaAdding')
        }
    },[])
  
    socket.on('created',()=>{
      getCuentas()
    })

    socket.on('ticketEdited', ()=>{

        getTickets()
        // console.log(tickets)
    })
  
    socket.on('editedProd',()=>{
        getProductos()
    })
  
    async function getMesas(){
        try{
            socket.emit('getMesas')
            await socket.on('getMesas',(mesas)=>{
                setMesas(mesas)
                // console.log(mesas)
            })
        }catch (error){
            getMesas()
            console.log(error)
        }
    }
  
    async function getCuentas(){
        try{
            socket.emit('getCuentas')
            
            await socket.on('getCuentas',(cuentas)=>{
            setCuentas(cuentas)
            // console.log(cuentas)
            
            })
            // console.log(res.data)
            
        }catch (error){
            console.log(error , 'Cuentas')
            getCuentas()
        }
    }

    async function getCategorias(){
        try{
            socket.emit('getCategorias')
            
            await socket.on('getCategorias',(categorias)=>{
            setCategorias(categorias)
            // console.log(categorias)
            
            })
            // console.log(res.data)
            
        }catch (error){
            console.log(error , 'categorias')
            getCategorias()
        }
        
    }

    
    async function getProductos(){
        try{
            socket.emit('getProductos')
            
            await socket.on('getProductos',(productos)=>{
                
            setProductos(productos)
            
            })
            
        }catch (error){
            console.log(error , 'productos')
            getProductos()
        }
    }

    async function getIngredientes(){
        try{
            socket.emit('getIngredientes')
            
            await socket.on('getIngredientes',(ingredientes)=>{
                
            setIngredientes(ingredientes)
            // console.log(ingredientes)
            })
            
        }catch (error){
            console.log(error , 'ingredientes')
            getIngredientes()
        }
    }

    async function getIngprods(){
        try{
            const res = await axios.get('http://192.168.1.42:3000/ingprod')
            setIngprods(res.data)
            
        }catch (error){
            console.log(error, 'Ingprod')
        getIngprods()}
    }

    async function getTickets(){
        try{
            socket.emit('getTickets')
            
            await socket.on('getTickets',(tickets)=>{
            setTickets(tickets)
            
            })
            // console.log(res.data)
            
        }catch (error){
            console.log(error , 'tickets')
            getTickets()
        }
    }


    return <View>
        <Switch>
            <Route path={'/'} exact>
                <Login cuentas={cuentas}/>
            </Route>
            <Route path={'/mesaslist/:name'} exact>
                <MesaList mesas={mesas} cuentas={cuentas} tickets={tickets}/>
            </Route>
            <Route path={'/mesa/:idmesa/:name'} exact>
                <MesaPage socket={socket} mesas={mesas} cuentas={cuentas} categorias={categorias} productos={productos} tickets={tickets} ingredientes={ingredientes} ingprods={ingprods}/>
            </Route>
        </Switch>
    </View>
}