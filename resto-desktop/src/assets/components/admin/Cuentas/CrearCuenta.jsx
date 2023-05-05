import React from "react";
import { useState ,useEffect} from "react";
import '../../../css/CrearCuenta.css'
import { useNavigate } from "react-router-dom";


export function CrearCuenta({socket}){
    const [empleado,setName] = useState()
    const [direccion,setDireccion] = useState()
    const [cuil , setCuil] = useState()
    const [telefono,setTelefono] = useState()
    const [codigo,setCode] = useState()
    const [admin , setAdmin] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        setCode()
    },[])


    const  codeGen = (num) => {
        const characters ='1234567890';
        let result1= ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < num; i++ ) {
            result1 += Math.floor(Math.random() * charactersLength);
        }

        return result1
    }

    async function Send(){
        try{
            const data ={empleado,direccion,cuil,telefono,codigo,admin}
            socket.emit('addAccount',data)
        }catch(error){
            console.log(error)
        }
    }


    return <main>
        <div className="contenedor" onSubmit={(e)=>{
            e.preventDefault()
            Send()
        }}>
            <div className="form-container">
                <h1 className="crear-title">Crear Cuenta</h1>
                <form action="">
                    <input className="name-input" type="text" placeholder="Nombre Completo" onChange={(e)=>{
                        setName(e.target.value)
                    }}/><br />
                    <input className="name-input" type="text" placeholder="Direccion" onChange={(e)=>{
                        setDireccion(e.target.value)
                    }}/><br />
                    <input className="name-input" type="number" placeholder="Cuil" onChange={(e)=>{
                        setCuil(e.target.value)
                    }}/><br />
                    <input className="name-input" type="number" placeholder="Telefono" onChange={(e)=>{
                        setTelefono(e.target.value)
                    }}/><br />
                    <button className="code-btn" onClick={(e)=>{
                        e.preventDefault()
                        setCode(codeGen(4))
                    }}>Generar</button><input className="code-input" type="text" placeholder="Codigo" value={codigo}/><br />
                    <input className="admin-checkbox" checked={admin} onClick={()=>{
                        setAdmin(!admin)
                    }} type="checkbox" id="admin"/><label className="admin-label" htmlFor="admin">Admin mode</label><br />
                    <button className="btn-crear-acc">Crear</button>
                </form>
            </div>
        </div>
    </main>
}