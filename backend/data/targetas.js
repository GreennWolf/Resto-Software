import {Schema,model, Types} from 'mongoose'

const schemaTargetas = new Schema({
    fecha:String,
    idcuenta:Types.ObjectId,
    targeta:Number,
    mercadoPago:Number,
})

const targeta = model('targeta',schemaTargetas)

export default targeta