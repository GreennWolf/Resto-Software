import {Schema,model} from 'mongoose'

const schemaIngredientes = new Schema({
    name:String,
    precio:Number,
    stock:Number,
})

const ingrediente = model('ingrediente',schemaIngredientes)

export default ingrediente