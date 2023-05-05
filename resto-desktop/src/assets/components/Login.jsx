import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'


export function Login({setFecha,logged,setLogged,fecha,cuentas,socket,setSesion,sesion}){

    const [codigo,setCodigo] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate();

    return <main>
        <div className="contenedor">
            <div className="login-center">
                <form className="login-form" action="" onSubmit={(e)=>{
                    e.preventDefault()
                    cuentas.map(cuenta =>{
                        if(codigo.length == 4){
                            if(codigo == cuenta.codigo){
                                console.log('correcto')
                                if(cuenta.admin == true){
                                    console.log('eres ADMIN')
                                    setLogged(cuenta._id)
                                    setError('')
                                    setSesion(true)
                                    console.log(cuenta._id)
                                    navigate(`/mesas/`)
                                    
                                }else{
                                    setError('Solo los administradores pueden ingresar')
                                }
                            }else{
                                setError('Codigo invalido')
                            }
                        }else{
                            setError('El codigo debe ser de 4 digitos')
                        }
                    })
                }}>
                    <h1 className="titulo">Iniciar Sesion</h1>
                    <input className="codigo" type="text" placeholder="Codigo" onChange={
                        (e)=>{
                            setCodigo(e.target.value)
                        }
                    } /><br></br>
                    <p className="error">{error}</p>
                    <h2 className="login-fecha">Fecha</h2>
                    <input className="codigo" type="date" required onChange={(e)=>{
                        setFecha(e.target.value)
                        console.log(fecha)
                    }} /><br /><br />
                    <button className="enviar">Inciar Sesion</button>
                </form>
            </div>
        </div>
    </main>
}