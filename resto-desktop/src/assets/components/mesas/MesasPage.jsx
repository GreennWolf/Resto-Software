import React, { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import '../../css/MesasPage.css'
import arrow from '../../img/arrow.png'
import { Ticket } from "./Ticket/Ticket";
import { useState } from "react";
import { Menu } from "./menu/Menu";
import { Options } from "./options/Options";
import { ModalAddIng } from "./menu/ModalAddIng";


export function MesasPage({mesas,tickets,fecha,cuentas,productos,categorias,sesion,socket,ingredientes}){

    const navigation = useNavigate()

    const {idmesa,idcuenta} = useParams()
    const mesa = mesas.find(mesa => mesa._id == idmesa)
    const [cantidad,setCantidad] = useState()
    const ticket = tickets.find(ticket => ticket.idmesa == idmesa)

    const [selected , setSelected] = useState('')
    const [cocinaList , setCocinaList] = useState(ticket?.productos)
    const [prodCant , setProdCant] = useState()
    const [ingCant , setingCant] = useState()
    const [realTicket , setRealTicket] = useState()
    const [realTotal , setReaTotal] = useState()
    const idticket = ticket?._id;
    const idCuentaTicket = ticket?.idcuenta
    const mozo = cuentas.find(mozo => mozo._id == idCuentaTicket)
    const [open,setOpen] = useState(false)
    const [newList , setNewList] = useState([])
    const [barraList,setBarraList] = useState([])
    const [cocinaRealList,setCocinaRealList] = useState([])

    var total = []

    // console.log(mozo)
    
    useEffect(()=>{
        setCocinaList(ticket?.productos)
        console.log(ticket)
        setCantidad(1)
        setNewList([])
        setBarraList([])
        setCocinaRealList([])
    },[tickets])


    useEffect(()=>{
        Comprobar()
    },[selected])

    function addLocalProduct(idproducto){
        
        if(ticket.idmesa == idmesa){
            const realProduct = productos.find(realProduct => realProduct._id == idproducto)

            const producto = ticket.productos.find( producto => producto.idproducto == idproducto );
            if(producto != undefined){
                cocinaList.map(prod =>{
                    if(prod.idproducto == idproducto){
                        let cant = parseInt(cantidad)
                        let newCant = prod.cant + cant 
                        prod.cant = newCant;
                        setProdCant(newCant)
                        // console.log(cantidad)
                    }
                })
            }else{
                
                cocinaList.push({
                    idproducto,
                    cant:cantidad
                })
                setProdCant(idproducto + cocinaList)
                // console.log(cantidad)
            }

            const newProd = newList.find( newProd => newProd.idproducto == idproducto );

            if(newProd != undefined){
                newList.map(prod =>{
                    if(prod.idproducto == idproducto){
                        let cant = parseInt(cantidad)
                        let newCant = prod.cant + cant 
                        prod.cant = newCant;
                        setProdCant(newCant)
                        // console.log(cantidad)
                    }
                })
            }else{
                
                newList.push({
                    idproducto,
                    cant:cantidad
                })
                setProdCant(idproducto + cocinaList)
                // console.log(cantidad)
            }

            if(realProduct.zona == 1){
                
                const barraProd = barraList.find(barraProd => barraProd.idproducto == idproducto)


                console.log(barraProd , 'BARRA PROD')
                if(barraProd != undefined){
                    barraList.map(prod =>{
                        if(prod.idproducto == idproducto){
                            let cant = parseInt(cantidad)
                            let newCant = prod.cant + cant 
                            prod.cant = newCant;
                            setProdCant(newCant)
                            // console.log(cantidad)
                        }
                    })
                }else{
                    barraList.push({
                        idproducto,
                        cant:cantidad
                    })
                }
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
                            setProdCant(newCant)
                            // console.log(cantidad)
                        }
                    })
                }else{
                    cocinaRealList.push({
                        idproducto,
                        cant:cantidad
                    })
                }
                console.log(cocinaRealList , '144 cocinaReallist')

            }
        }
        
    }

    async function Comprobar(){
        
        if(selected != undefined){
    
            socket.emit('deleteTicketProductInfo',idticket)
            await socket.on('deleteTicketProductInfo',(data)=>{
                setRealTicket(data[0])
                // console.log(realTicket)
            })
        }
    }

    function addLocalIngredient(idIng){
        
        if(ticket.idmesa == idmesa){
            
            const ingrediente = cocinaList.find( ingrediente => ingrediente.idIng == idIng );
            // console.log(ingrediente)
            if(ingrediente != undefined){
                cocinaList.map(ing =>{
                    // console.log(ing.idIng)
                    if(ing.idIng == idIng){
                        let cant = parseInt(cantidad)
                        let newCant = ing.cant + cant 
                        ing.cant = newCant;
                        // console.log(newCant)
                        setingCant(newCant)
                        
                        // console.log(cocinaList)
                    }
                })
            }else{
                
                cocinaList.push({
                    idIng,
                    cant:cantidad
                })

                // console.log(cantidad)
                setingCant(idIng)
                setTimeout(() => {
                    setingCant('')
                }, 200);
                // console.log(cocinaList)
            }

            const newIng = newList.find( newIng => newIng.idIng == idIng );
            
            if(newIng != undefined){
                newList.map(ing =>{
                    // console.log(ing.idIng)
                    if(ing.idIng == idIng){
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
                    idIng,
                    cant:cantidad
                })

                // console.log(cantidad)
                setingCant(idIng)
                setTimeout(() => {
                    setingCant('')
                }, 200);
                // console.log(cocinaList)
            }

            const cocinaRealIng = cocinaRealList.find(cocinaRealIng => cocinaRealIng.idIng == idIng)

                console.log(cocinaRealIng , 'cocinaProood')

                if(cocinaRealIng != undefined){
                    cocinaRealList.map(prod =>{
                        if(prod.idIng == idIng){
                            let cant = parseInt(cantidad)
                            let newCant = prod.cant + cant 
                            prod.cant = newCant;
                            setProdCant(newCant)
                            // console.log(cantidad)
                        }
                    })
                }else{
                    cocinaRealList.push({
                        idIng,
                        cant:cantidad
                    })
                }
        }
        
    }

    function addLocalIngredientPlus(idIngPlus){
        
        if(ticket.idmesa == idmesa){
            
            const ingrediente = cocinaList.find( ingrediente => ingrediente.idIngPlus == idIngPlus );
            // console.log(ingrediente)
            const ing = ingredientes.find(ing => ing._id == idIngPlus)
            if(ingrediente != undefined){
                cocinaList.map(ing =>{
                    // console.log(ing.idIngPlus)
                    if(ing.idIngPlus == idIngPlus){
                        let cant = parseInt(cantidad)
                        let newCant = ing.cant + cant 
                        ing.cant = newCant;
                        // console.log(newCant)
                        setingCant(newCant)
                        
                        // console.log(cocinaList)
                    }
                })
            }else{
                
                cocinaList.push({
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
        }
        
    }
    

    function addProduct(){
        var datos = {
            idmesa,
            idCuentaTicket,
            idcuenta,
            cocinaList
        }
        socket.emit('postTickets',datos)

        socket.emit('countIng',cocinaList)

        console.log(cocinaRealList , '323 cocinaReallist')


        if(cocinaRealList != ''){
            console.log(cocinaRealList , '326 cocinaReallist')
            var dataCocina = {
                idmesa,
                idcuenta:idCuentaTicket,
                cocinaList:cocinaRealList
            }
    
            dataCocina = JSON.stringify(dataCocina)

            socket.emit('cocinaPrint',dataCocina)
            console.log(dataCocina,'Cocinaaa')


        }
        
        if(barraList != ''){
            var dataBarra = {
                idmesa,
                idcuenta:idCuentaTicket,
                cocinaList:barraList,
            }
            dataBarra = JSON.stringify(dataBarra)

            socket.emit('barraPrint',dataBarra)
            console.log(dataBarra , 'barra')
        }
        setTimeout(() => {
            setCocinaRealList([])
            setBarraList([])
        }, 100);
    }

    async function Eliminar(){
        if(selected != undefined){
            const ticketProd = realTicket.productos.find(ticketProd => ticketProd.idproducto == selected)
            const ticketIng = realTicket.productos.find(ticketIng => ticketIng.idIng == selected)
            const ticketIngPlus = realTicket.productos.find(ticketIng => ticketIng.idIngPlus == selected)
            // console.log(ticketIng)
            // console.log(ticketProd)
            if(ticketProd == undefined){
                const newList = cocinaList.filter(item => item.idproducto != selected)
                // console.log(newList)

                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
            }else{
                if(window.confirm('Estas seguro que quieres eliminar este producto?')){
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
            }

            if(ticketIng == undefined){
                const newList = cocinaList.filter(item => item.idIng != selected)
                // console.log(newList)

                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
            }else{
                if(window.confirm('Estas seguro que quieres eliminar este Ingrediente?')){
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
            }

            if(ticketIngPlus == undefined){
                const newList = cocinaList.filter(item => item.idIngPlus != selected)
                // console.log(newList)

                ticket.productos = newList
                setCocinaList(newList)
                setSelected()
            }else{
                if(window.confirm('Estas seguro que quieres eliminar este Ingrediente?')){
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

        }else{
            alert('SELECCIONA UN PRODUCTO')
        }
    }

    async function Cobrar(){
        var data = {
            idmesa,
            idCuentaTicket,
            idcuenta,
            cocinaList,
            fecha,
            idticket
        }

        socket.emit('Cobrar',data)
    }



    if(ticket == undefined){
        return <main>
            <header className="mesasPage-header">
            <div className="arrow-container" onClick={()=>{
                navigation(`/mesas/`)
            }}><img className="arrow-mesasPage" src={arrow} alt="" /></div>
            <h1>Mesa {mesa?.numero}</h1>
        </header>
        <div className="contenedor">
            {

                cuentas.map(cuenta =>{
                    if(cuenta.admin != true){
                        return <div key={cuenta._id} className="mozo-cube" onClick={()=>{
                            var data ={
                                idcuenta:cuenta._id,
                                idmesa,
                            }
                            socket.emit('newTicket',data)
                        }}>{cuenta.empleado}</div>
                    }
                })
            }
        </div>
        </main>
    }else{
        return <main>
        <div className="mesas-page-content">
            <header className="mesasPage-header">
                <div className="arrow-container" onClick={()=>{
                    navigation(`/mesas/`)
                }}><img className="arrow-mesasPage" src={arrow} alt="" /></div>
                <h1>Mesa {mesa.numero}({mozo.empleado})</h1>
            </header>
            <div className="contenedor">
                <Menu productos={productos} addLocalIngredientPlus={addLocalIngredientPlus} setOpen={setOpen} open={open} addLocalIngredient={addLocalIngredient} addLocalProduct={addLocalProduct} categorias={categorias} ingredientes={ingredientes}/>
                <Ticket cocinaList={cocinaList} setReaTotal={setReaTotal} selected={selected} socket={socket} setCantidad={setCantidad} cantidad={cantidad} ingredientes={ingredientes} setSelected={setSelected} productos={productos}/>
                <Options addProduct={addProduct} Cobrar={Cobrar} Eliminar={Eliminar}/>
                <ModalAddIng setOpen={setOpen} addLocalIngredientPlus={addLocalIngredientPlus} addLocalIngredient={addLocalIngredient} ingredientes={ingredientes} open={open}/>
            </div>
        </div>
    </main>
    }
}