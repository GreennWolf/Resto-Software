import {Schema,model, Types} from 'mongoose'

const schemaCajas = new Schema({
    idcaja:Number,
    fecha:String,
    idcuenta:Types.ObjectId,
    caja:Number,
    targetas:Number,
    mercadoPago:Number,
    total:Number
})

const caja = model('caja',schemaCajas)

export default caja