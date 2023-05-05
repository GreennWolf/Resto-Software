import {Schema,model, Types} from 'mongoose'

const schemaTickets = new Schema({
    idmesa:Types.ObjectId,
    idcuenta:Types.ObjectId,
    productos:[
        {
            idproducto:Types.ObjectId,
            idIng:Types.ObjectId,
            idIngPlus:Types.ObjectId,
            precio:Number,
            cant:Number,
        }
    ],
})

const ticket = model('ticket',schemaTickets)

export default ticket