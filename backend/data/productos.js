import {Schema,model,Types} from 'mongoose'

const schemaProductos = new Schema({
    name:String,
    precio:Number,
    categoria:Types.ObjectId,
    ingredientes:[{
        id:Types.ObjectId,
        usado:Number,
    }],
    zona:Number,
})

const producto = model('producto',schemaProductos)

export default producto