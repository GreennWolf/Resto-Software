import React, { useEffect, useState } from "react";
import '../../../css/ListaCuentas.css'
import { ItemAcc } from "./ItemAcc";

export function ListaCuentas({socket , cuentas}){
    const [selected , setSelected] = useState('')
    const [oculto , setOculto] = useState('oculto')
    const [editable , setEditable] = useState(false)
    const [accName , setAccName] = useState()
    const [accDireccion , setAccDireccion] = useState()
    const [accCuil , setAccCuil] = useState()
    const [accTelefono , setAccTelefono] = useState()
    const [accCode , setAccCode] = useState()
    const [accAdmin , setAccAdmin] = useState()

    const [newAccName , setNewAccName] = useState()
    const [newAccDireccion , setNewAccDireccion] = useState()
    const [newAccCuil , setNewAccCuil] = useState()
    const [newAccTelefono , setNewAccTelefono] = useState()
    const [newAccCode , setNewAccCode] = useState()
    const [newAccAdmin , setNewAccAdmin] = useState()


    useEffect(()=>{
        if(selected != ''){
            const cuenta = cuentas?.find(cuenta => cuenta._id == selected)
            
            setAccName(cuenta?.empleado)
            setAccDireccion(cuenta?.direccion)
            setAccCuil(cuenta?.cuil)
            setAccTelefono(cuenta?.telefono)
            setAccCode(cuenta?.codigo)

            setNewAccName(cuenta?.empleado)
            setNewAccDireccion(cuenta?.direccion)
            setNewAccCuil(cuenta?.cuil)
            setNewAccTelefono(cuenta?.telefono)
            setNewAccCode(cuenta?.codigo)


            if(cuenta.admin == true){
                setAccAdmin('Si')
            }else{
                setAccAdmin('No')
            }
            
            setOculto('')
        }else{
            setOculto('oculto')
        }
    },[selected])

    const  codeGen = (num) => {
        const characters ='1234567890';
        let result1= ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < num; i++ ) {
            result1 += Math.floor(Math.random() * charactersLength);
        }
        let result2 = parseInt(result1)
        console.log(result2)
        return result2
    }


    if(!editable){
        return <main>
        <header className="header-acc-list">
            <h1>Lista de Cuentas</h1>
        </header>
        <div className="body-acc-list">
            <div className="acc-list">
                {
                    cuentas.map(cuenta =>{
                        return <ItemAcc selected={selected} setSelected={setSelected} cuenta={cuenta}/>
                    })
                }
            </div>
            <div className="acc-detalles">
                <h2 className={oculto}>Nombre:{accName}</h2>
                <h3 className={oculto}>Direccion:{accDireccion}</h3>
                <h3 className={oculto}>Cuil:{accCuil}</h3>
                <h3 className={oculto}>Telefono:{accTelefono}</h3>
                <h3 className={oculto}>Codigo:{accCode}</h3>
                <h3 className={oculto}>Es Admin:{accAdmin}</h3>
            </div>
        </div>
        <footer>
        <div className="options-planilla">
                <div className="option-planilla" onClick={()=>{
                    window.api4.send('addAcc')
                }}>Agregar Cuenta</div>
                <div className="option-planilla" onClick={()=>{
                    if(selected != ''){
                        setEditable(!editable)
                    }else{
                        alert('Selecciona una cuenta para editar')
                    }
                }}>Modificar Cuenta</div>
                <div className="option-planilla" onClick={()=>{
                    if(selected != ''){
                        if(window.confirm('Estas seguro que quieres eliminar esta cuenta')){
                            socket.emit('deletedAcc',selected)
                            setTimeout(()=>{
                                setSelected('')
                            },200)
                        }
                    }else{
                        alert('Debes seleccionar una cuenta')
                    }
                }}>Eliminar Cuenta</div>
            </div>
        </footer>
    </main>
    }else{
        return <main>
        <header className="header-acc-list">
            <h1>Lista de Cuentas</h1>
        </header>
        <div className="body-acc-list">
            <div className="acc-list">
                {
                    cuentas.map(cuenta =>{
                        return <ItemAcc selected={selected} setSelected={setSelected} cuenta={cuenta}/>
                    })
                }
            </div>
            <div className="acc-detalles">
                <h2 className={oculto}>Nombre:<input type="text" onChange={(e)=>{
                    setNewAccName(e.target.value)
                }} defaultValue={accName} placeholder="Nombre" /></h2>
                <h3 className={oculto}>Direccion:<input  onChange={(e)=>{
                    setNewAccDireccion(e.target.value)
                }}type="text" defaultValue={accDireccion} placeholder="Direccion" /></h3>
                <h3 className={oculto}>Cuil:<input onChange={(e)=>{
                    setNewAccCuil(e.target.value)
                }} type="number" defaultValue={accCuil} placeholder="Cuil" /></h3>
                <h3 className={oculto}>Telefono:<input onChange={(e)=>{
                    setNewAccTelefono(e.target.value)
                }} type="number" defaultValue={accTelefono} placeholder="Telefono" /></h3>
                <h3 className={oculto}>Codigo:<input type="number" onChange={(e)=>{
                    setNewAccCode(e.target.value)
                }} value={newAccCode} placeholder="Codigo" /><button onClick={()=>{
                    setNewAccCode(codeGen(4))
                }}>Generar Codigo</button></h3>
                <h3 className={oculto}>Es Admin:<input onChange={(e)=>{
                    setNewAccCode(e.target.value)
                }} type="checkbox" defaultChecked={accAdmin}/></h3>
            </div>
        </div>
        <footer>
        <div className="options-planilla-modify">
                <div className="option-planilla" onClick={()=>{
                    setEditable(!editable) 
                    setNewAccCode(accCode)                   
                }}>Cancelar</div>
                <div className="option-planilla" onClick={()=>{
                    console.log()
                    var data = {
                        id:selected,
                        empleado:newAccName,
                        direccion:newAccDireccion,
                        cuil:newAccCuil,
                        telefono:newAccTelefono,
                        codigo:newAccCode,
                        admin:newAccAdmin,
                    }
                    socket.emit('editedAcc',data)
                    console.log(data)
                    setEditable(!editable)
                }}>Aceptar</div>
            </div>
        </footer>
    </main>
    }
}