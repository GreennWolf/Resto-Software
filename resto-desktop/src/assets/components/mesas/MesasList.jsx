import React from "react";
import '../../css/MesasList.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Mesa } from "./Mesa";


export function MesasList({mesas,logged,socket,sesion,setSesion,tickets}){

    const navigation = useNavigate();
    const idcuenta = logged
    console.log(idcuenta)
    useEffect(()=>{
        setSesion('true')
        console.log(sesion)
    },[])

    return <main className="main-mesaslist">
        <header className="mesasList-header">
            <h1 className="sitges-title">Sitges</h1>
        </header>
        <h2 className="mesas-title">Mesas</h2>
        <h2 className="mesas-title">Adentro</h2>
        <div className="mesas-list-container">
            {
                mesas.map(mesa =>{
                    if(mesa.zona == 0){
                        return <Mesa key={mesa._id} idcuenta={idcuenta} tickets={tickets} mesa={mesa} navigation={navigation}/>
                    }
                })
            }
        </div>
        <h2 className="mesas-title">21</h2>
        <div className="mesas-list-container">
            {
                mesas.map(mesa =>{
                    if(mesa.zona == 1){
                        return <Mesa key={mesa._id} idcuenta={idcuenta} tickets={tickets} mesa={mesa} navigation={navigation}/>
                    }
                })
            }
        </div>
        <h2 className="mesas-title">22</h2>
        <div className="mesas-list-container">
            {
                mesas.map(mesa =>{
                    if(mesa.zona == 2){
                        return <Mesa key={mesa._id} idcuenta={idcuenta} tickets={tickets} mesa={mesa} navigation={navigation}/>
                    }
                })
            }
        </div>
    </main>
}