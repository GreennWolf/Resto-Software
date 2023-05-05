import {Schema,model} from 'mongoose'

const schemaImpresoras = new Schema({
    ImpresoraCocina:String,
    ImpresoraBarra:String,
    ImpresoraFinal:String,
})

const impresora = model('impresora',schemaImpresoras)

export default impresora