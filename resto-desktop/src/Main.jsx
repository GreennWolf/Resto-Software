import React from "react";
import { AdminMenu } from './assets/components/AdminMenu';
import {CuentasMenu} from './assets/components/admin/Cuentas/CuentasMenu'
import { CrearCuenta } from './assets/components/admin/Cuentas/CrearCuenta';
import {MesasList} from './assets/components/mesas/MesasList';
import { MesasPage } from './assets/components/mesas/MesasPage';
import { Login } from './assets/components/Login';
import {Routes,Route} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { AddIng } from "./assets/components/admin/Ingredientes/AddIng";
import { AddProd } from "./assets/components/admin/Productos/AddProd";
import { PlanillaDiaria } from "./assets/components/caja/PlanillaDiaria";
import { Mozo } from "./assets/components/caja/Mozo";
import { CerrarMozo } from "./assets/components/caja/CerrarMozo";
import { MozosList } from "./assets/components/historial/MozoList";
import { VerMesas } from "./assets/components/historial/VerMesas";
import { ListaProductos } from "./assets/components/admin/Productos/ListProductos";
import { TicketCocinaPrint } from "./assets/components/mesas/Ticket/TicketCocinaPrint";
import {Impresoras} from './assets/components/printer/Impresoras'
import { AddCat } from "./assets/components/admin/Categorias/AddCat";
import { TicketBarraPrint } from "./assets/components/mesas/Ticket/TicketBarraPrint";
import { AddMesa } from "./assets/components/admin/mesas/AddMesa";
import { ListaIngredientes } from "./assets/components/admin/Ingredientes/ListaIngredientes";
import { ListaCuentas } from "./assets/components/admin/Cuentas/ListaCuentas";


export function Main({setIp,ip,planillas,printers,impresoras,cuentas,logged,setLogged,gastos,cambio,setCambio,cajas,targetas,socket,mesas,fecha,setFecha,productos,tickets,setSesion,sesion,ingredientes,categorias,facturas}){

    const navigation = useNavigate()
    //
    const [cambios , setCambios] = useState([])

    useEffect(()=>{

        window.api.receive("link", (link) => {
            navigation(link)
           
        });

        socket.on('ticketNotification', (datos)=>{
           
            if(sesion){
                const {id,mesa_ticket , cuenta_ticket} = datos
                const NOTIFICATION_TITLE = cuenta_ticket[0].empleado
                const NOTIFICATION_BODY = 'Modifico la mesa' + ' ' + mesa_ticket[0].numero
        
               
        
                new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
                .onclick = () => {
                    navigation(`/mesas/${id}/${cuenta_ticket[0]._id}`)
                }
            }
        })

        return () =>{
            socket.off('ticketNotification')
        }
       
    },[])


    return <>
    <Routes>
        <Route path='/'  element={<Login cuentas={cuentas} logged={logged} setLogged={setLogged} fecha={fecha} setFecha={setFecha} socket={socket} sesion={sesion} setSesion={setSesion}/>}/>
        <Route path='/admin-menu' element={<AdminMenu/>}/>
        <Route path='/admin-menu/cuentas' element={<CuentasMenu/>}/>
        <Route path='/admin-menu/cuentas/crear' element={<CrearCuenta socket={socket}/>}/>
        <Route path='/admin-menu/cuentas/list' element={<ListaCuentas socket={socket} cuentas={cuentas}/>}/>
        <Route path='/admin-menu/productos/crear' element={<AddProd ingredientes={ingredientes} categorias={categorias} socket={socket}/>}/>
        <Route path='/admin-menu/productos/list' element={<ListaProductos categorias={categorias} productos={productos} ingredientes={ingredientes} socket={socket}/>}/>
        <Route path='/admin-menu/ingredientes/crear' element={<AddIng ingredientes={ingredientes} socket={socket}/>}/>
        <Route path='/admin-menu/ingredientes/list' element={<ListaIngredientes ingredientes={ingredientes} socket={socket}/>}/>
        <Route path='/admin-menu/categorias/crear' element={<AddCat socket={socket}/>}/>
        <Route path='/admin-menu/categorias/list' element={<AddIng socket={socket}/>}/>
        <Route path='/admin-menu/mesas/crear' element={<AddMesa socket={socket}/>}/>
        <Route path='/admin-menu/mesas/list' element={<AddIng socket={socket}/>}/>
        <Route path='/planilla-diaria' element={<PlanillaDiaria planillas={planillas} cambios={cambios} setCambios={setCambios} cambio={cambio} setCambio={setCambio} gastos={gastos} fecha={fecha} cajas={cajas} socket={socket}/>}/>
        <Route path='/planilla-diaria/mozo/:idcuenta' element={<CerrarMozo socket={socket} cajas={cajas} targetas={targetas} fecha={fecha} mesas={mesas} cuentas={cuentas} productos={productos} ingredientes={ingredientes}  facturas={facturas}/>}/>
        <Route path='/planilla-diaria/mozos' element={<Mozo fecha={fecha} cuentas={cuentas}/>}/>
        <Route path='/impresoras' element={<Impresoras setIp={setIp} ip={ip} socket={socket} impresoras={impresoras}/>}/>
        <Route path='/historial-mesas/mozos' element={<MozosList fecha={fecha} cuentas={cuentas}/>}/>
        <Route path='/historial-mesas/:idcuenta' element={<VerMesas mesas={mesas} fecha={fecha} facturas={facturas} tickets={tickets} productos={productos} cuentas={cuentas} ingredientes={ingredientes} />}/>
        <Route path='/mesas/' element={<MesasList tickets={tickets} logged={logged} mesas={mesas} setSesion={setSesion} socket={socket} sesion={sesion}/>}/>
        <Route path='/mesas/:idmesa/:idcuenta' element={<MesasPage fecha={fecha} cuentas={cuentas} categorias={categorias} mesas={mesas} ingredientes={ingredientes} socket={socket} sesion={sesion} productos={productos} tickets={tickets}/>}/>
     </Routes>
    <TicketCocinaPrint socket={socket} cuentas={cuentas} ingredientes={ingredientes} mesas={mesas} productos={productos}/>
    <TicketBarraPrint socket={socket} cuentas={cuentas} ingredientes={ingredientes} mesas={mesas} productos={productos}/>
    </>
}