import {Schema,model} from 'mongoose'

const schemaCuentas = new Schema({
    empleado:{
        type:String,
        trim:true,
    },
    direccion:String,
    cuil:Number,
    telefono:Number,
    codigo:{
        type:Number,
        trim:true,
        unique:true,
    },
    admin:Boolean,
})

const cuenta = model('cuenta',schemaCuentas)

export default cuenta