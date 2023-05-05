import React from "react";
import { useState , useEffect } from "react";
import '../../css/Impresoras.css'

export function Impresoras({socket,ip,setIp}){
    const [printers , setPrinters] = useState([])
    const [impresoraCocina , setImpresoraCocina] = useState('')
    const [impresoraBarra , setImpresoraBarra] = useState('')
    const [impresoraFinal , setImpresoraFinal] = useState('')
    const [impresoras,setImpresoras] = useState([])
    const [idimp , setIdImp] = useState('')


    const [selectedCocina , setSelectedCocina] = useState([])
    const [selectedBarra , setSelectedBarra] = useState([])
    const [selectedFinal , setSelectedFinal] = useState([])

    const [ipValue , setIpValue] = useState()

    async function getPrinters(){
        try{
            window.GetPrinter.send('GetPrinter')
            await window.GetPrinter.receive('GetPrinter', async (printers)=>{
                setPrinters(printers)
                console.log(printers)
            })
        }catch (error){
            getPrinters()
            console.log(error)
            
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

    useEffect(() => {
        getPrinters()
        getImpresoras()

    },[])
    
    useEffect(()=>{
        console.log(impresoras[0]?.ImpresoraBarra)
        setImpresoraBarra(impresoras[0]?.ImpresoraBarra)
        setImpresoraCocina(impresoras[0]?.ImpresoraCocina)
        setImpresoraFinal(impresoras[0]?.ImpresoraFinal)
        setIdImp(impresoras[0]?._id)
        var cocinaOptions = printers.filter((item) => item.displayName !== impresoraCocina)
        var barraOptions = printers.filter((item) => item.displayName !== impresoraBarra)
        var finalOptions = printers.filter((item) => item.displayName !== impresoraFinal)

        setSelectedCocina(cocinaOptions)
        setSelectedBarra(barraOptions)
        setSelectedFinal(finalOptions)
    },[impresoras])

    return <main>
        <header className="header-printers">
            <h1>Configurar Impresoras</h1>
        </header>
        <div className="body-printers">
            <div className="container-printers">
                <h2>Ip Principal</h2>
                <input type="text" onChange={(e)=>{
                    setIpValue(e.target.value)
                    console.log(ip)
                }} placeholder="IP"/>
                <h2>Impresora Cocina</h2>
                <select onChange={(e)=>{
                    setImpresoraCocina(e.target.value)
                }} name="impresoraCocina" id="impresoraCocina">
                    <option value={impresoraCocina}>{impresoraCocina}</option>
                    {
                        selectedCocina.map(printer=>{
                            return <option value={printer.displayName}>{printer.name}</option>
                        })
                    }
                </select>
                <h2>Impresora Barra</h2>
                <select onChange={(e)=>{
                    setImpresoraBarra(e.target.value)
                }} name="impresoraBarra" id="impresoraBarra">
                    <option value={impresoraBarra}>{impresoraBarra}</option>
                    {
                        selectedBarra.map(printer=>{
                            return <option value={printer.displayName}>{printer.name}</option>
                        })
                    }
                </select>
                <h2>Impresora Final</h2>
                <select onChange={(e)=>{
                    setImpresoraFinal(e.target.value)
                }} name="impresoraFinal" id="impresoraFinal">
                    <option value={impresoraFinal}>{impresoraFinal}</option>
                    {
                        selectedFinal.map(printer=>{
                            return <option value={printer.displayName}>{printer.name}</option>
                        })
                    }
                </select><br />
                <button className="btn-printers" onClick={()=>{
                    var data = {
                        idimp,
                        impresoraCocina,
                        impresoraBarra,
                        impresoraFinal,
                    }
                    setIp(`http://${ipValue}:5000`)
                    console.log(data)
                    
                    socket.emit('printerConfig',data)
                }}>Guardar Cambios</button>
            </div>
        </div>
    </main>
}