import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from "socket.io"
import http from 'http'
import cuenta from '../data/cuentas.js'
import mesa from '../data/mesas.js'
import producto from '../data/productos.js'
import ticket from '../data/tickets.js'
import categoria from '../data/categorias.js'
import ingrediente from '../data/ingredientes.js'
import factura from '../data/facturas.js'
import targeta from '../data/targetas.js'
import caja from '../data/cajas.js'
import planilla from '../data/planillas.js'
import gasto from '../data/gastos.js'
import impresora from '../data/impresoras.js'

const CON = "mongodb://127.0.0.1:27017/emege"
const PORT = process.env.PORT || 5000


const app = express()

mongoose.connect(CON, { useNewUrlParser: true},{useCreateIndex:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    // 
})

const server = http.createServer(app)
const io = new Server(server,{cors:{
    origin:'*',
}})

app.use(cors())
app.use(express.json())



async function getMesas(io){
    const mesas = await mesa.find()
    io.emit('getMesas',mesas)

    
}

async function getCuentas(io){

    const cuentas = await cuenta.find()
    io.emit('getCuentas',cuentas)
}

async function getCategorias(io){
    const categorias = await categoria.find()
    
    io.emit('getCategorias',categorias)

}

async function getProductos(io){
    const productos = await producto.find()
    
    io.emit('getProductos',productos)

}

async function getTickets(io){
    const tickets = await ticket.find()
    io.emit('getTickets',tickets)
}

async function getFacturas(io){

    const facturas = await factura.find()
    io.emit('getFacturas',facturas)
}

async function getIngredientes(io){
    const ingredientes = await ingrediente.find()
    
    io.emit('getIngredientes',ingredientes)
}

async function postTicket(io){
    const tickets = await ticket.find()
    io.emit('ticketEdited', tickets)
    // 
}



io.on('connection',(socket)=>{
    // 

    socket.on('getMesas',()=>{
        getMesas(socket)
    })

    socket.on('getCuentas',()=>{
        getCuentas(socket)
    })

    socket.on('getCategorias',()=>{
        getCategorias(socket)
    })

    socket.on('getProductos',()=>{
        getProductos(socket)
    })

    socket.on('getIngredientes',()=>{
        getIngredientes(socket)
    })

    socket.on('getTickets',async ()=>{
        // getTickets(socket)
        const tickets = await ticket.find()
        io.emit('getTickets',tickets)

    })

    socket.on('getFacturas',async ()=>{
        const facturas = await factura.find()
        io.emit('getFacturas',facturas)
    })

    socket.on('getCajas',async ()=>{
        const cajas = await caja.find()
        io.emit('getCajas',cajas)
    })

    socket.on('getTargetas',async ()=>{
        const targetas = await targeta.find()
        io.emit('getTargetas',targetas)
    })

    socket.on('getGastos',async ()=>{
        const gastos = await gasto.find()
        io.emit('getGastos',gastos)
    })

    socket.on('getPlanillas',async ()=>{
        const planillas = await planilla.find()
        io.emit('getPlanillas',planillas)
    })

    socket.on('getImpresoras',async ()=>{
        const impresoras = await impresora.find()
        io.emit('getImpresoras',impresoras)
    })

    socket.on('addProd', async (data)=>{
        const {name,precio,categoria,ingList,zona} = data

        const newProducto = new producto({
            name,
            categoria,
            precio,
            ingredientes:ingList,
            zona
        })
        // 
        await newProducto.save()
        io.emit('editedProd')
    })

    socket.on('editedProd', async (data)=>{
        const {idproducto ,name,categoria,precio,zona, ingredientes} = data
        // 
        var edited = await producto.updateOne({ '_id': { $eq: idproducto } }, { $set: { 'name':name,'categoria':categoria,'precio':precio,'zona':zona,'ingredientes':ingredientes}}) 
        // 
        io.emit('editedProd')

    })

    socket.on('editedIng', async (data)=>{
        const {idIng ,name,stock,precio} = data
        // 
        var edited = await ingrediente.updateOne({ '_id': { $eq: idIng } }, { $set: { 'name':name,'stock':stock,'precio':precio}}) 
        // 
        io.emit('editedIng')

    })

    socket.on('deletedIng',async (id)=>{
        const borrado = await ingrediente.deleteOne({_id:id})
        // 
        io.emit('editedIng')
    })

    socket.on('deleteProd',async (id)=>{
        const borrado = await producto.deleteOne({_id:id})
        // 
        io.emit('editedProd')
    })

    socket.on('addIng', async (data)=>{
        const {ing ,precio, stock} = data

        const newIngredient = new ingrediente({
            name:ing,
            precio,
            stock,
        })
        // 
        await newIngredient.save()
        io.emit('editedIng')
    })

    socket.on('newTicket', async (data)=>{
        const {idmesa,idcuenta} = data
        const tickets = await ticket.find({idmesa:idmesa})
        // 
        if(tickets == ''){
            const newTicket = new ticket({
                idmesa,
                idcuenta,
                productos:[]
            })
            
            await newTicket.save()
            const tick = await ticket.find()
            io.emit('ticketEdited',tick)
            // 
        }else{
            
        }
    })

    socket.on('ticketNotification',async (data)=>{
        const {idmesa,idcuenta} = data

        const mesa_ticket = await mesa.find({_id:idmesa})
        const cuenta_ticket = await cuenta.find({_id:idcuenta})

        var datos ={
            id:idmesa,
            mesa_ticket,
            cuenta_ticket
        }
        
        
        io.emit('ticketNotification',datos)
        
        // 
    })


    socket.on('postTickets', async (data)=>{
        const {idmesa ,cocinaList,idcuenta,idCuentaTicket} = data
        if(idCuentaTicket != undefined){
            // 
            // 
            await ticket.updateOne({ 'idmesa': { $eq: idmesa } }, { $set: { 'productos': cocinaList , 'idcuenta':idCuentaTicket} }) 
            const tickets = await ticket.find()  
            socket.broadcast.emit('ticketEdited',tickets)
        }else{
            // 
            // 
            await ticket.updateOne({ 'idmesa': { $eq: idmesa } }, { $set: { 'productos': cocinaList , 'idcuenta':idcuenta} }) 
            const tickets = await ticket.find()  
            socket.broadcast.emit('ticketEdited',tickets)
        }

    })

    socket.on('addAccount',async (data)=>{
        const {empleado,direccion,cuil,telefono,codigo,admin} = data

        const newCuenta = new cuenta({
            empleado:empleado,
            direccion,
            cuil,
            telefono,
            codigo:codigo,
            admin:admin
        })
        
        await newCuenta.save()
        io.emit('created')
    })

    socket.on('deletedAcc',async (id)=>{
        const borrado = await cuenta.deleteOne({_id:id})
        // 
        io.emit('created')
    })


    socket.on('editedAcc', async (data)=>{
        const {id ,empleado,direccion,cuil,telefono, codigo,admin} = data
        // 
        var edited = await cuenta.updateOne({ '_id': { $eq: id } }, { $set: { 'empleado':empleado,'direccion':direccion,'cuil':cuil,'telefono':telefono,'codigo':codigo,'admin':admin}}) 
        // 
        io.emit('created')

    })

    socket.on('addCat',async (name)=>{

        const newCat = new categoria({
            name
        })
        
        await newCat.save()
        io.emit('newCat')
    })

    socket.on('Cobrar',async (data)=>{
        const {idmesa,idcuenta,idCuentaTicket,cocinaList,fecha,idticket} = data
        // 
        if(idCuentaTicket != undefined){
            const newFactura = new factura({
                fecha,
                ticket:[
                    {
                        idmesa,
                        idcuenta:idCuentaTicket,
                        productos:cocinaList,
                    }
                ]
            })
            const borrado = await ticket.deleteOne({_id:idticket})
            console.log(borrado)    
            io.emit('ticketEdited')

            await newFactura.save()
            const fact = await factura.find()
            io.emit('facturaEdited',fact)
         

        }else{
            const newFactura = new factura({
                fecha,
                ticket:[
                    {
                        idmesa,
                        idcuenta,
                        productos:cocinaList,
                    }
                ]
            })
            
            await newFactura.save()
            const fact = await factura.find()
            io.emit('facturaEdited',fact)
            // 
            const borrado = await ticket.deleteOne({_id:idticket})
            // 
            socket.emit('ticketEdited')
        }

    })

    socket.on('deleteTicketProductInfo',async (idticket)=>{
        
        const finalTicket = await ticket.find({_id:idticket})
        io.emit('deleteTicketProductInfo',finalTicket)
    })

    socket.on('DeleteTicketProduct',async (data)=>{
        const {newList , idmesa} = data
        await ticket.updateOne({ 'idmesa': { $eq: idmesa } }, { $set: { 'productos': newList } }) 
        const tickets = await ticket.find()  

        io.emit('ticketEdited',tickets)

    })

    socket.on('cocinaPrint',async (data)=>{
        
        const impresoras = await impresora.find()
        var impresoraCocina = impresoras[0].ImpresoraCocina
        var datos = JSON.parse(data)
        console.log('printtting cocina' , data)
        const {idmesa , idcuenta , cocinaList} = datos

        var datas = {
            idmesa,
            idcuenta,
            cocinaList,
            printer:impresoraCocina
        }
        
        datas = JSON.stringify(datas)
        io.emit('cocinaPrint',datas)
    })

    socket.on('barraPrint',async (data)=>{
        
        const impresoras = await impresora.find()
        var impresoraBarra = impresoras[0].ImpresoraBarra
        var datos = JSON.parse(data)
        console.log('printing' , data)
        const {idmesa , idcuenta , cocinaList} = datos

        var datas = {
            idmesa,
            idcuenta,
            cocinaList,
            printer:impresoraBarra
        }


        datas = JSON.stringify(datas)
        io.emit('barraPrint',datas)
    })



    socket.on('newTargeta', async (data)=>{
        const {targetas,mercadoPago,fecha,idcuenta} = data

        if(targetas != undefined && targetas != '' && mercadoPago != undefined && mercadoPago != ''){
            const newTargeta = new targeta({
                fecha,
                idcuenta,
                targeta:targetas,
                mercadoPago,
            })
            
            await newTargeta.save()
            // 
        }else{
            if(targetas != undefined && targetas != ''){
                const newTargeta = new targeta({
                    fecha,
                    idcuenta,
                    targeta:targetas
                })
                
                await newTargeta.save()
                // 
            }
    
            if(mercadoPago != undefined && mercadoPago != ''){
                const newTargeta = new targeta({
                    fecha,
                    idcuenta,
                    mercadoPago:mercadoPago
                })
                
                await newTargeta.save()
                // 
            }
        }

        const targ = await targeta.find()
        // 
        io.emit('newTargeta',targ)

    })

    socket.on('closeCaja',async (data)=>{
        const {fecha,idcuenta,cajaMonto,targetas,mercadoPago,total} = data
        const cajas = await caja.find()
        const newCaja = new caja({
            idcaja:cajas.length,
            fecha,
            idcuenta,
            caja:cajaMonto,
            targetas,
            mercadoPago,
            total,
        })
        
        await newCaja.save()
        // 
        const cajax = await caja.find()
        // 
        io.emit('newCaja',cajax)
    })

    socket.on('newGasto',async (data)=>{
        // 
        const {fecha,name,monto} = data
        const gastos = await gasto.find()
        if(name != undefined && name != '' && monto != undefined && monto != ''){
            const newGasto = new gasto({
                idgasto:gastos.length,
                fecha,
                name,
                monto,
            })
            
            await newGasto.save()
            io.emit('newGasto')
        }
    })

    socket.on('deleteGasto',async (gastoId)=>{
        const gastoBorrado = await gasto.deleteOne({_id:gastoId})
        // 
        io.emit('newGasto')
    })

    socket.on('deleteTarjeta',async (id)=>{
        const tarjetaBorrada = await targeta.deleteOne({_id:id})
        // 
        io.emit('newTargeta')
    })


    socket.on('newPlanilla',async (data)=>{
        // 
        const {planillaId,fecha,cambio,cajas,targetas,mercadoPago,gastos,total} = data 
        const plan = await planilla.find({_id:planillaId})
        if(plan == undefined){
            const newPlanilla = new planilla({
                fecha,
                cambio,
                cajas,
                targetas,
                mercadoPago,
                gastos,
                total
            })
            // 
            await newPlanilla.save()
        }else{
            const update = await planilla.updateOne({ '_id': { $eq: planillaId } }, { $set: { 'cambio': cambio , 'cajas': cajas ,  'targetas': targetas  ,  'mercadoPago': mercadoPago  , 'total': total } })  
            // 
        }

        io.emit('newPlanilla')
    })


    socket.on('countIng',async (cocinaList)=>{
        
        cocinaList.map(async (items)=>{
            var prod = await producto.find({_id:items.idproducto})
            if(prod != undefined && prod != ''){
                prod[0].ingredientes.map(async ingre =>{
                    var ingreComplete = await ingrediente.find({_id:ingre.id})
                    if(ingreComplete != undefined && ingreComplete != ''){
                        var usado = ingre.usado * items.cant
                        var newStock = ingreComplete[0].stock - usado
                        
                        var updated = await ingrediente.updateOne({'_id':{$eq:ingreComplete[0]._id}},{$set:{'stock':newStock}})
                        
                    
                    }
                })
            }
            setTimeout(async () => {
                var ing = await ingrediente.find({_id:items.idIng})
                if(ing != undefined && ing != ''){
                    var newStock = ing[0].stock + items.cant
                    
                    
                    var updated = await ingrediente.updateOne({'_id':{$eq:ing[0]._id}},{$set:{'stock':newStock}})
                    // 
                }
            }, 500);
        })
    })    

    socket.on('printerConfig',async (data)=>{
        const {idimp,impresoraCocina,impresoraBarra,impresoraFinal} = data
        const impresoras = await impresora.find()
        // 

        if(impresoras == ''){
            const newImpresoras = new impresora({
                ImpresoraCocina:impresoraCocina,
                ImpresoraBarra:impresoraBarra,
                ImpresoraFinal:impresoraFinal
            })
            // 
            await newImpresoras.save()
        }else{
            const update = await impresora.updateOne({ '_id': { $eq: idimp } }, { $set: { 'ImpresoraCocina': impresoraCocina , 'ImpresoraBarra': impresoraBarra ,  'ImpresoraFinal': impresoraFinal } })  
            // 
        }
    })


    socket.on('AddMesa',async (data)=>{
        const {numero , zona} = data
        const newMesa = new mesa({
            numero,
            zona
        })
        // 
        await newMesa.save()
        io.emit('NewMesaAdding')
    })

})



server.listen(PORT,function (){
    // 
})



