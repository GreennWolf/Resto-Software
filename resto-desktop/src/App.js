import './App.css';
import { BrowserRouter,Routes,Route, HashRouter} from 'react-router-dom';
import { Login } from './assets/components/Login';
import { io } from 'socket.io-client';
import { useEffect ,useState } from 'react';
import { AdminMenu } from './assets/components/AdminMenu';
import {CuentasMenu} from './assets/components/admin/Cuentas/CuentasMenu'
import { CrearCuenta } from './assets/components/admin/Cuentas/CrearCuenta';
import {MesasList} from './assets/components/mesas/MesasList';
import { MesasPage } from './assets/components/mesas/MesasPage';
import { Main } from './Main';





function App() {

    const [mesas, setMesas] = useState([])
    const [cuentas, setCuentas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([])
    const [tickets, setTickets] = useState([])
    const [ingredientes, setIngredientes] = useState([])
    const [facturas, setFacturas] = useState([])
    const [ingprods, setIngprods] = useState([])
    const [fecha,setFecha] = useState()
    const [cajas,setCajas] = useState([])
    const [targetas,setTargetas] = useState([])
    const [planillas,setPlanillas] = useState([])
    const [gastos , setGastos] = useState([])
    const [cambio , setCambio] = useState(0)
    const [logged , setLogged] = useState()
    const [printers,setPrinters] = useState([])
    const [impresoras,setImpresoras] = useState([])
    const [ip,setIp] = useState('http://192.168.0.105:5000')
    const [sesion , setSesion] = useState(false)

    const socket = io(ip)

    useEffect(()=>{
        
        getMesas()
        getCuentas()
        getCategorias()
        getProductos()
        getIngredientes()
        // getIngprods()
        getTickets()
        getFacturas()
        getCajas()
        getTargetas()
        getPlanillas()
        getGastos()
        getPrinters()

        socket.on('created',()=>{
            getCuentas()
        })

        socket.on('editedIng',()=>{
            getIngredientes()
        }) 

        socket.on('editedProd',()=>{
            getProductos()
        })

        socket.on('facturaEdited',()=>{
            getFacturas()
            console.log('-----------EDITED FACTURAS--------------')
        })

        socket.on('ticketEdited', async ()=>{
            getTickets()
            console.log('-----------EDITED TICKET--------------')
        })

        socket.on('newTargeta',async ()=>{
            getTargetas()
        })

        socket.on('newCaja',()=>{
            getCajas()
        })

        socket.on('newGasto',async ()=>{
            getGastos()
        })

        socket.on('newPlanilla',()=>{
            getPlanillas()
        })

        socket.on('newCat',()=>{
            getCategorias()
        })
        
        socket.on('cocinaPrint',async (data)=>{
            window.printer.send('printer',await data)
        })

        socket.on('barraPrint',async (data)=>{
            
            window.printer.send('printer',await data)
        })

        socket.on('NewMesaAdding',async ()=>{
            getMesas()
        })

        
        return () =>{
            socket.off('ticketEdited')
            socket.off('facturaEdited')
            socket.off('created')
            socket.off('editedIng')
            socket.off('editedProd')
            socket.off('newTargeta')
            socket.off('newCaja')
            socket.off('newGasto')
            socket.off('newPlanilla')
            socket.off('newCat')
            socket.off('barraPrint')
            socket.off('cocinaPrint')
            socket.off('NewMesaAdding')
        }
    },[])
  



    

  
    async function getMesas(){
        try{
            socket.emit('getMesas')
            await socket.on('getMesas',(mesas)=>{
                setMesas(mesas)
                // 
            })
        }catch (error){
            getMesas()
            
        }
    }


    async function getCuentas(){
        try{
            socket.emit('getCuentas')
            
            await socket.on('getCuentas',(cuentas)=>{
            setCuentas(cuentas)
            
            })
            // 
            
        }catch (error){
            
            getCuentas()
        }
    }

    async function getCategorias(){
        try{
            socket.emit('getCategorias')
            
            await socket.on('getCategorias',(categorias)=>{
            setCategorias(categorias)
            
            
            })
            // 
            
        }catch (error){
            
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
            
            getProductos()
        }
    }

    async function getIngredientes(){
        try{
            socket.emit('getIngredientes')
            
            await socket.on('getIngredientes',(ingredientes)=>{
                
            setIngredientes(ingredientes)
            
            })
            
        }catch (error){
            
            getIngredientes()
        }
    }

    async function getTickets(){
        try{
            socket.emit('getTickets')
            
            await socket.on('getTickets',(tickets)=>{
            setTickets(tickets)
            
            })
            // 
            
        }catch (error){
            
            getTickets()
        }
    }

    async function getFacturas(){
        try{
            socket.emit('getFacturas')
            await socket.on('getFacturas',(facturas)=>{
                setFacturas(facturas)
                // 
            })
        }catch (error){
            getFacturas()
            
        }
    }

    async function getCajas(){
        try{
            socket.emit('getCajas')
            await socket.on('getCajas',(cajas)=>{
                setCajas(cajas)
                // 
            })
        }catch (error){
            getCajas()
            
        }
    }

    async function getTargetas(){
        try{
            socket.emit('getTargetas')
            await socket.on('getTargetas',(targetas)=>{
                setTargetas(targetas)
                // 
            })
        }catch (error){
            getTargetas()
            
        }
    }

    async function getGastos(){
        try{
            socket.emit('getGastos')
            await socket.on('getGastos',(gastos)=>{
                setGastos(gastos)
                // 
            })
        }catch (error){
            getGastos()
            
        }
    }

    async function getPlanillas(){
        try{
            socket.emit('getPlanillas')
            await socket.on('getPlanillas',(planillas)=>{
                setPlanillas(planillas)
            })
        }catch (error){
            getPlanillas()
            
        }
    }

    async function getPrinters(){
        try{
            window.GetPrinter.send('GetPrinter')
            await window.GetPrinter.receive('GetPrinter', async (printers)=>{
                setPrinters(printers)
                console.log(printers)
            })
        }catch (error){
            getPrinters()
            
        }
    }

    async function getImpresoras(){
        try{
            socket.emit('getImpresoras')
            await socket.on('getImpresoras',(impresoras)=>{
                setImpresoras(impresoras)
            })
        }catch(error){
            getImpresoras()
        }
    }

  return (
    <HashRouter basename='/'>
        <Main cuentas={cuentas} setIp={setIp} ip={ip} printers={printers} impresoras={impresoras} logged={logged} setLogged={setLogged} cambio={cambio} setCambio={setCambio} planillas={planillas} gastos={gastos} cajas={cajas} targetas={targetas} fecha={fecha} setFecha={setFecha} sesion={sesion} facturas={facturas} categorias={categorias} setSesion={setSesion} socket={socket} mesas={mesas} ingredientes={ingredientes}  productos={productos} tickets={tickets}/>
    </HashRouter>
  );
}

export default App;
