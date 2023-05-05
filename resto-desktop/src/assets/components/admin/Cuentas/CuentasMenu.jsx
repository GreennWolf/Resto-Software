import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function CuentasMenu(){

    // const navigate = useNavigate();

    return <main>
        <h1 className="admin-title">Cuentas</h1>
        <div className="contenedor">
            <div className="AdminMenu">
                <p className="link" onClick={()=>{
                    // navigate('/admin-menu/cuentas/crear')
                }}>Crear Cuentas</p>
                <p className="link">Lista de Cuentas</p>
                <p className="link" onClick={()=>{
                    // navigate('/admin-menu/')
                }}>Atras</p>
            </div>
        </div>
    </main>
}