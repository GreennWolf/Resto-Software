import {Schema,model} from 'mongoose'

const schemaMesas = new Schema({
    numero:{
        type:Number,
        trim:true,
    },
    zona:Number,
})

const mesa = model('mesa',schemaMesas)

export default mesa