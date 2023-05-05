import React from "react";
import '../css/AdminMenu.css'
import { useNavigate } from "react-router-dom";

export function AdminMenu(){

    const navigate = useNavigate();

    return <main>
        <h1 className="admin-title">Bienvenido Administrador</h1>
        <div className="contenedor">
            <div className="AdminMenu">
                <p className="link" onClick={()=>{
                    navigate('/admin-menu/cuentas')
                }}>Cuentas</p>
                <p className="link">Productos</p>
                <p className="link">Mesas</p>
                <p className="link" onClick={()=>{
                    navigate('/')
                }}>LogOut</p>
            </div>
        </div>
    </main>
}