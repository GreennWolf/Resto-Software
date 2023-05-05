import React from "react";
import '../../../css/ListaProductos.css'
import { ItemList } from "./ItemList";
import { useState } from "react";
import { useEffect } from "react";
import { IngProdList } from "./IngProdList";
import { IngItem } from "./IngItem";

export function ListaProductos({productos,categorias,socket,ingredientes}){

    const [selected , setSelected] = useState('')
    const [ingList , setIngList] = useState()
    const [editable , setEditable] = useState(false)
    const [oculto , setOculto] = useState('oculto')
    const [productoName,setProductoName] = useState('')
    const [productoCat,setProductoCat] = useState('')
    const [productoPrice,setProductoPrice] = useState('')
    const [productoZona,setProductoZona] = useState('')
    const [catFilt ,setCatFilt] = useState('')
    const [newIngList , setNewIngList] = useState([])
    const [newName , setNewName] = useState('')
    const [newCat , setNewCat] = useState('')
    const [newPrice , setNewPrice] = useState('')
    const [newZona , setNewZona] = useState('')
    const producto = productos.find(producto => producto._id == selected)
    const categoria = categorias.find(categoria => categoria._id == producto?.categoria)

    useEffect(()=>{
       if(selected != ''){
        setOculto('')
        setProductoName(producto?.name)
        setProductoCat(producto?.categoria)
        setProductoPrice(producto?.precio)
        setProductoZona(producto?.zona)
        setNewName(producto?.name)
        setNewCat(producto?.cat)
        setNewPrice(producto?.precio)
        setNewZona(producto?.zona)
        var catFilter = categorias?.filter(cat => cat._id == productoCat)
        setCatFilt(catFilter)
        setNewIngList(ingList)
        }else{
        setOculto('oculto')
       }

       

    },[selected])
    

    if(editable == false){
        return <main>
        <header className="header-lista">
            <h1>Lista Productos</h1>
        </header>
        <div className="list-container">
            <div className="list-items">
                <div>
                    {
                        productos.map(producto =>{
                            return <ItemList key={producto._id} selected={selected} setIngList={setIngList} setSelected={setSelected} producto={producto}/>
                        })
                    }
                </div>
            </div>
            <div className="info-list-container">
                <div className="info-list">
                    <h1>{producto?.name}</h1>
                    <h2 className={oculto}>Categoria:{categoria?.name} </h2>
                    <h2 className={oculto}>Precio:{producto?.precio}</h2>
                    <h2 className={oculto}>Zona:{producto?.zona}</h2>
                    <h2 className={oculto}>Ingredientestes</h2>
                    <div className="ingrediente-list">
                        <table className={oculto}>
                            <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Ingrediente</th>
                                    <th>Utilizado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ingList?.map(ingrediente =>{
                                        
                                        const ing = ingredientes.find(ing => ing._id == ingrediente.id)
                                        return  <tr key={ingrediente._id}>
                                            <td>{ing?.stock}</td>
                                            <td>{ing?.name}</td>
                                            <td>{ingrediente?.usado}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div className="options-planilla">
                <div className="option-planilla" onClick={()=>{
                    window.api2.send('addProd')
                }}>Agregar Producto</div>
                <div className="option-planilla" onClick={()=>{
                    if(selected != ''){
                        setEditable(!editable)
                    }else{
                        alert('Selecciona un producto para editar')
                    }
                }}>Modificar Producto</div>
                <div className="option-planilla" onClick={()=>{
                    if(selected != ''){
                        if(window.confirm('Estas seguro que quieres eliminar este producto')){
                            socket.emit('deleteProd',selected)
                            setTimeout(()=>{
                                setSelected('')
                            },200)
                        }
                    }else{
                        alert('Debes seleccionar un producto')
                    }
                }}>Eliminar Producto</div>
            </div>
        </footer>
    </main>
    }else{
        return <main>
        <header className="header-lista">
            <h1>Lista Productos</h1>
        </header>
        <div className="list-container">
            <div className="list-items">
                <div>
                    {
                        productos.map(producto =>{
                            return <ItemList selected={selected} editable={editable} setIngList={setIngList} setSelected={setSelected} producto={producto}/>
                        })
                    }
                </div>
            </div>
            <div className="info-list-container">
                <div className="info-list"> 
                    <h1 className={oculto}><input className={'ing-input'} type="text" placeholder="Ingrediente" value={productoName} onChange={(e)=>{
                        setProductoName(e.target.value)
                        setNewName(e.target.value)
                    }} /></h1>
                    <div className="cat-container">
                        <h2 className={oculto}>Categoria:</h2>
                        <select onChange={(e)=>{
                            setNewCat(e.target.value)
                        }} className={oculto} name="categorias" id="categorias">
                            <option value={productoCat}>{categoria?.name}</option>
                            {
                                
                                catFilt?.map(categoria =>{
                                    return <option value={categoria?._id}>{categoria?.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <h2 className={oculto}>Precio: <input type="text" className="price-inp" onChange={(e)=>{
                        setNewPrice(e.target.value)
                    }} defaultValue={productoPrice} /></h2>
                    <h2 className={oculto}>Zona: <input type="text" className="price-inp" onChange={(e)=>{
                        setNewZona(e.target.value)
                    }} defaultValue={productoZona} /></h2>
                    <h2 className={oculto}>Ingredientestes</h2>
                    <div className="ingrediente-list">
                        <table className={oculto}>
                            <thead>
                                <tr>
                                    <th>Stock</th>
                                    <th>Ingrediente</th>
                                    <th>Utilizado</th>
                                    <th>Agregar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ingredientes.map(ingrediente =>{
                                        var ing = ingList.find(ing => ing.id == ingrediente._id)
                                        if(ing != undefined){
                                            return <IngItem key={ingrediente._id} newIngList={newIngList} setNewIngList={setNewIngList} usa={ing.usado} ingList={ingList} ingredientes={ingredientes} ing={ing} ingrediente={ingrediente} check={true}/>
                                        }else{
                                            return <IngItem key={ingrediente._id} newIngList={newIngList} setNewIngList={setNewIngList} usa={1} ingList={ingList} ingredientes={ingredientes}  ingrediente={ingrediente} check={false}/>
                                        }                                        
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div className="options-planilla-modify">
                <div className="option-planilla" onClick={()=>{
                    setNewIngList([...ingList])
                    setEditable(!editable)                    
                }}>Cancelar</div>
                <div className="option-planilla" onClick={()=>{
                    console.log(newIngList)
                    var data = {
                        idproducto:producto._id,
                        name:newName,
                        categoria:newCat,
                        precio:newPrice,
                        zona:newZona,
                        ingredientes:newIngList
                    }
                    socket.emit('editedProd',data)
                    console.log(data)
                    setEditable(!editable)
                }}>Aceptar</div>
            </div>
        </footer>
    </main>
    }
}