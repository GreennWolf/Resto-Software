import React, { useEffect } from "react";
import '../../../css/ModalAddIng.css'
import { useState } from "react";
import { Ingrediente } from "./Ingrediente";


export function ModalAddIng({open,setOpen,ingredientes,addLocalIngredient,addLocalIngredientPlus}){
    console.log(open)
    const [style , setStyle] = useState('inactive')

    useEffect(() => {
      if(open == true){
        setStyle('modal-ing')
      }else{
        setStyle('inactive')
      }
    }, [open])
    

    return <div className={style}>
        <div className="modal-container">
            <div className="header-modal">
                <h1>Añadir Ingredientes</h1>
                <button className="close-btn" onClick={()=>{
                    setOpen(!open)
                }}>&times;</button>
            </div>
            <div className="body-modal">
                <input type="text" className="search-modal" placeholder="Buscar Ingrediente" />
                <div className="ingredient-modal-list">
                {
                    ingredientes.map(ingrediente =>{
                        return <div className="ing-modal">
                            <Ingrediente key={ingrediente._id + ingrediente} texto={''} addLocalIngredientPlus={addLocalIngredientPlus} addLocalIngredient={addLocalIngredient} ingredientes={ingredientes} ingrediente={ingrediente._id}/>
                        </div>
                    })
                }
                </div>
            </div>
            <div className="footer-modal">

            </div>
        </div>
    </div>
}