import {Schema,model} from 'mongoose'

const schemaPlanillas = new Schema({
    fecha:String,
    cambio:Number,
    cajas:Number,
    targetas:Number,
    mercadoPago:Number,
    gastos:Number,
    total:Number,
})

const planilla = model('planilla',schemaPlanillas)

export default planilla