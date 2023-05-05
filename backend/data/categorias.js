import {Schema,model} from 'mongoose'

const schemaCategorias = new Schema({
    name:String,
})

const categoria = model('categoria',schemaCategorias)

export default categoria