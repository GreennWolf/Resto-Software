import {Schema,model} from 'mongoose'

const schemaGastos = new Schema({
    idgasto:Number,
    fecha:String,
    name:String,
    monto:Number
})

const gasto = model('gasto',schemaGastos)

export default gasto