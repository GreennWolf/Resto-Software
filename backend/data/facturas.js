import {Schema,model, Types} from 'mongoose'

const schemaFacturas = new Schema({
    fecha:String,
    ticket:[{
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
    }]
})

const factura = model('factura',schemaFacturas)

export default factura