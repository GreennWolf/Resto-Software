import React, { useEffect, useState } from "react";
import { View,Text, ScrollView, Modal, Pressable, TextInput, FlatList } from "react-native";
import { useParams } from "react-router-native";
import pageStyle from "../../styles/pageStyle";
import { Options } from "./mesasComponent/Options";
import { Numpad } from "./mesasComponent/Numpad";
import { Ticket } from "./mesasComponent/Ticket";
import { IngredientsList } from "./mesasComponent/IngredientsList";
import { CategoriasList } from "./mesasComponent/CategoriasList";
import { Menulist } from "./mesasComponent/Menulist";
import { Ingredientes } from "./mesasComponent/Ingredientes";

export function MesaPage({socket,mesas,cuentas,categorias,productos,tickets,ingredientes,ingprods}){
    const {idmesa,name} = useParams()
    
    const mesa = mesas.find(mesa => mesa._id == idmesa)
    const cuenta = cuentas.find(cuenta => cuenta.empleado == name)
    const idcuenta = cuenta._id
    
    const [prodId , setProdId] = useState()
    const [idcategoria , setIdCategoria] = useState()
    const [cantidad,setCant] = useState(1)
    const [prodCant,setProdCant] = useState()
    const [selected , setSelected] = useState()
    const [ingCant,setIngCant] = useState()
    const [cocinaList,setCocinaList] = useState([])
    const [realTicket , setRealTicket] = useState()
    const [cocinaCant,setCocinaCant] = useState()
    const ticket = tickets?.find(ticket => ticket.idmesa == idmesa)
    const idticket = ticket?._id
    const [openModal,setOpenModal] = useState(false)
    const [newList,setNewList] = useState([])
    const [barraList,setBarraList] = useState([])
    const [cocinaRealList,setCocinaRealList] = useState([])
    
    useEffect(()=>{
        setCant(1)
        setProdId('')
        setIdCategoria('')
        setSelected('')
        setProdCant('')

    },[])

    useEffect(()=>{
        var data ={
            idmesa,
            idcuenta
        }
        if(tickets != ''){
            // console.log(tickets)
            tickets.map(ticket =>{
                if(ticket.idmesa == idmesa){
                    
                    setCocinaList(ticket.productos)
                    // console.log(ticket.productos)

                }else{
                    socket.emit('newTicket',data)
                    
                }
            })
        }else{
            socket.emit('newTicket',data)

        }
        setBarraList([])
        setCocinaRealList([])
    },[tickets])

    useEffect(()=>{
        Comprobar()
    },[selected])

    function getProdId(producto){
        const prodId =  producto._id

        setProdId(prodId)
    }
    
    
    
    function getIdCategoria(categoria){
        const idcategoria = categoria._id
        
        setIdCategoria(idcategoria)
    }
    
    function localAddProduct(idproducto){
        tickets.map(ticket =>{
            if(ticket.idmesa == idmesa){
                const realProduct = productos.find(realProduct => realProduct._id == idproducto)
                const producto = ticket.productos.find( producto => producto.idproducto == idproducto );
                if(producto != undefined){
                    cocinaList.map(prod =>{
                        if(prod.idproducto == idproducto){
                            let cant = parseInt(cantidad)
                            let newCant = prod.cant + cant 
                            prod.cant = newCant;
                            setProdCant(newCant +idproducto)
                        }
                    })
                }else{
                    cocinaList.push({
                        idproducto,
                        cant:cantidad
                    })
                }


                if(realProduct.zona == 1){
                
                    const barraProd = barraList.find(barraProd => barraProd.idproducto == idproducto)
    
    
                    
                    if(barraProd != undefined){
                        barraList.map(prod =>{
                            if(prod.idproducto == idproducto){
                                let cant = parseInt(cantidad)
                                let newCant = prod.cant + cant 
                                prod.cant = newCant;
                                setProdCant(newCant + idproducto)
                                // console.log(cantidad)
                            }
                        })
                    }else{
                        barraList.push({
                            idproducto,
                            cant:cantidad
                        })
                    }
                    console.log(barraList,'153')
                }
                
                if(realProduct.zona == 2){
                    const cocinaRealProd = cocinaRealList.find(cocinaRealProd => cocinaRealProd.idproducto == idproducto)
    
                    console.log(cocinaRealProd , 'cocinaProood')
    
                    if(cocinaRealProd != undefined){
                        cocinaRealList.map(prod =>{
                            if(prod.idproducto == idproducto){
                                let cant = parseInt(cantidad)
                                let newCant = prod.cant + cant 
                                prod.cant = newCant;
                                setProdCant(newCant + idproducto)
                                // console.log(cantidad)
                            }
                        })
                    }else{
                        cocinaRealList.push({
                            idproducto,
                            cant:cantidad
                        })
                    }
                    console.log(cocinaRealList , '176 cocinaReallist')
    
                }
            }
        })
    }

    function addIngredient(ing){
        tickets.map(ticket =>{
            if(ticket.idmesa == idmesa){
                if(cocinaList != ''){
                    
                    const ingrediente = cocinaList.find(ingrediente => ingrediente.idIng === ing) 
                    
                    // console.log(ingrediente , 'xddd')
                    if(ingrediente != undefined ) {
                        cocinaList.map(cocinaIng =>{
                            if(cocinaIng.idIng == ing && cocinaIng.idprod == prodId){
                                var newCant = cocinaIng.cant + 1
                                setCocinaCant(newCant)
                                cocinaIng.cant = newCant
                            }
                        })
                        
                    }else{
                        setCocinaCant(ing)
                        
                        cocinaList.push({
                            idIng:ing,
                            cant:1,
                        })
                    }

                    const newIng = newList.find(newIng => newIng.idIng === ing) 
                    
                    // console.log(newIng , 'xddd')
                    if(newIng != undefined ) {
                        newList.map(cocinaIng =>{
                            if(cocinaIng.idIng == ing && cocinaIng.idprod == prodId){
                                var newCant = cocinaIng.cant + 1
                                setCocinaCant(newCant)
                                cocinaIng.cant = newCant
                            }
                        })
                        
                    }else{
                        setCocinaCant(ing)
                        
                        newList.push({
                            idIng:ing,
                            cant:1,
                        })
                    }
                    
                    console.log(newList)
                }else{
                    setCocinaCant(ing)
                    
                    cocinaList.push({
                        idIng:ing,
                        cant:1,
                    })
                    
                }

                const cocinaRealIng = cocinaRealList.find(cocinaRealIng => cocinaRealIng.idIng == ing)

                console.log(cocinaRealIng , 'cocinaProood')

                if(cocinaRealIng != undefined){
                    cocinaRealList.map(prod =>{
                        if(prod.idIng == ing){
                            let cant = parseInt(cantidad)
                            let newCant = prod.cant + cant 
                            prod.cant = newCant;
                            setProdCant(newCant)
                            // console.log(cantidad)
                        }
                    })
                }else{
                    cocinaRealList.push({
                        idIng:ing,
                        cant:cantidad
                    })
                }

            }
        })
    }
    

    function addIngredientPlus(ing){
        tickets.map(ticket =>{
            if(ticket.idmesa == idmesa){
                const ingP = ingredientes.find(ingP => ingP._id == ing)
                if(cocinaList != ''){
                    
                    const ingrediente = cocinaList.find(ingrediente => ingrediente.idIngPlus == ing) 
                    // console.log(ingrediente , 'xddd')
                    if(ingrediente != undefined ) {
                        cocinaList.map(cocinaIng =>{
                            if(cocinaIng.idIngPlus == ing){
                                var newCant = cocinaIng.cant + 1
                                setCocinaCant(newCant)
                                cocinaIng.cant = newCant
                            }
                        })
                        
                    }else{
                        setCocinaCant(ing)
                        
                        cocinaList.push({
                            idIngPlus:ing,
                            precio:ingP.precio,
                            cant:1,
                        })
                    }
                    
                    const newIngPLus = newList.find( newIngPLus => newIngPLus.idIngPlus == idIngPlus );
                    // console.log(newIngPLus)
                    if(newIngPLus != undefined){
                        newList.map(ing =>{
                            // console.log(ing.idIngPlus)
                            if(ing.idIngPlus == idIngPlus){
                                let cant = parseInt(cantidad)
                                let newCant = ing.cant + cant 
                                ing.cant = newCant;
                                // console.log(newCant)
                                setingCant(newCant)
                                
                                // console.log(newList)
                            }
                        })
                    }else{
                        
                        newList.push({
                            idIngPlus,
                            precio:ing?.precio,
                            cant:cantidad
                        })

                        // console.log(cantidad)
                        setingCant(idIngPlus)
                        setTimeout(() => {
                            setingCant('')
                        }, 200);
                        // console.log(cocinaList)
                    }

                    
                    const cocinaRealIng = cocinaRealList.find(cocinaRealIng => cocinaRealIng.idIngPlus == idIngPlus)

                    console.log(cocinaRealIng , 'cocinaProood')

                    if(cocinaRealIng != undefined){
                        cocinaRealList.map(prod =>{
                            if(prod.idIngPlus == idIngPlus){
                                let cant = parseInt(cantidad)
                                let newCant = prod.cant + cant 
                                prod.cant = newCant;
                                setProdCant(newCant)
                                // console.log(cantidad)
                            }
                        })
                    }else{
                        cocinaRealList.push({
                            idIngPlus,
                            cant:cantidad
                        })
                    }

                }else{
                    setCocinaCant(ing)
                    
                    cocinaList.push({
                        idIngPlus:ing,
                        precio:ingP.precio,
                        cant:1,
                    })
                    
                }
            }
        })
    }
    
    function addProduct(){
        const data = {
            idmesa,
            idcuenta,
            cocinaList
        }
        
        const notiData ={
            idmesa,
            idcuenta
            
        }

        
        socket.emit('postTickets',data)
        socket.emit('ticketNotification',notiData)


        if(barraList != ''){
            var dataBarra = {
                idmesa,
                idcuenta,
                cocinaList:barraList,
            }
            dataBarra = JSON.stringify(dataBarra)

            socket.emit('barraPrint',dataBarra)
            console.log(dataBarra , 'barra')
        }

        if(cocinaRealList != ''){
            var cocinaData = {
                idmesa,
                idcuenta,
                cocinaList:cocinaRealList,
            }
            cocinaData = JSON.stringify(cocinaData)
            socket.emit('cocinaPrint',cocinaData)
        }

        setTimeout(() => {
            setCocinaRealList([])
            setBarraList([])
        }, 100);

        socket.emit('countIng',cocinaList)
    }


    



    // async function AddToTicket(idproducto){
    //     try{
    //         const ticketData = await {idcuenta,idmesa,cantidad,idproducto}
    //         socket.emit('AddToTicket',ticketData)           
    //     }catch(error){
    //         
    //         AddToTicket(idproducto)
    //     }
    // }

    async function Comprobar(){
        
        if(selected != undefined){
            
            socket.emit('deleteTicketProductInfo',idticket)
            await socket.on('deleteTicketProductInfo',(data)=>{
                setRealTicket(data[0])
                // console.log(realTicket)
            })
        }
    }


    async function Eliminar(){
        
        if(selected != undefined){
            const ticketProd = realTicket.productos.find(ticketProd => ticketProd.idproducto == selected)
            // console.log(ticketProd)
            const ticketIng = realTicket.productos.find(ticketIng => ticketIng.idIng == selected)
            const ticketIngPlus = realTicket.productos.find(ticketIngPlus => ticketIngPlus.idIngPlus == selected)
            if(ticketProd == undefined){
                const newList = cocinaList.filter(item => item.idproducto != selected)
                // console.log(newList)

                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
            }else{
                
                const newList = cocinaList.filter(item => item.idproducto != selected)
                // console.log(newList)
                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
                var datos = {
                    newList,
                    idmesa,
                }
                socket.emit('DeleteTicketProduct',datos)

            }

            if(ticketIng == undefined){
                const newList = cocinaList.filter(item => item.idIng != selected)
                // console.log(newList)

                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
            }else{
                
                const newList = cocinaList.filter(item => item.idIng != selected)
                // console.log(newList)
                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
                var datos = {
                    newList,
                    idmesa,
                }
                socket.emit('DeleteTicketProduct',datos)

            }

            if(ticketIngPlus == undefined){
                const newList = cocinaList.filter(item => item.idIngPlus != selected)
                // console.log(newList)

                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
            }else{
                
                const newList = cocinaList.filter(item => item.idIngPlus != selected)
                // console.log(newList)
                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
                var datos = {
                    newList,
                    idmesa,
                }
                socket.emit('DeleteTicketProduct',datos)

            }

        }
    }
     
    
    return <View>
        <View style={pageStyle.container}>
            <Text style={pageStyle.title}>MESA {mesa?.numero}</Text>
        </View>

        <CategoriasList categorias={categorias} getIdCategoria={getIdCategoria} />

        <Menulist productos={productos} idcategoria={idcategoria} localAddProduct={localAddProduct} getProdId={getProdId}/>

        <IngredientsList setOpenModal={setOpenModal} openModal={openModal} ingredientes={ingredientes} productos={productos} addIngredient={addIngredient} prodId={prodId}/>

        <Modal style={pageStyle.modalContainer} transparent={true} visible={openModal} onRequestClose={()=>{
            setOpenModal(!openModal)
        }}>
            <View style={pageStyle.modalIngContainer}>
                <View  style={pageStyle.modalInterior}>
                    <View style={pageStyle.modalHeader}>
                        <Text style={pageStyle.modalTitleIng}>Añadir Ingredientes</Text>
                    </View>
                    <FlatList numColumns={4} style={pageStyle.modalBody} data={ingredientes} renderItem={
                        ({item:ingrediente})=>(
                            <Ingredientes key={ingrediente._id} texto={''} addIngredientPlus={addIngredientPlus} addIngredient={addIngredient} ingredientes={ingredientes} ingrediente={ingrediente._id}/>

                        )
                    }>
                    </FlatList>
                    <View style={pageStyle.modalFooter}>
                        <Text style={pageStyle.modalCancelBtn} onPress={()=>{
                            setOpenModal(!openModal)
                        }}>Cancelar</Text>
                    </View>
                </View>
            </View>
        </Modal>

        <View style={pageStyle.formContainer} >
            <Ticket cocinaList={cocinaList} tickets={tickets} prodCant={prodCant} selected={selected} setSelected={setSelected} ingredientes={ingredientes} productos={productos} idmesa={idmesa}/>
            <Numpad setCant={setCant} cant={cantidad}/>
        </View>
        <Options socket={socket} Eliminar={Eliminar} addProduct={addProduct} cuentas={cuentas} setSelected={setSelected} selected={selected}/>
    </View>
}