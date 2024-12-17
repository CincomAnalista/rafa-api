import mongoose, { Types } from "mongoose";


const ClientSchema = new mongoose.Schema({
    Vendedor: {
        type: String,
        required: true,
    },
    Cliente: {
        type: String,
        required: true,
    },
    Boletas: {
        type: Number,
        required: true,
    },
    Subtotal: {
        type: Number,
        required: true,
    },
    Falta_para_boleta: {
        type: Number,
        required: true,
    },
    Numeros: {
        type: Array,
        require: true
    },
    lastUpdate: {
        type: String,
        required: false,
    },
})

const clientNameSchema = new mongoose.Schema({
    Cliente: {
        type: String,
        required: true
    },
})

const numbersSchema = new mongoose.Schema({
    Cliente: {
        type: String,
        required: true
    },
    Numeros: {
        type: Array,
        required: true
    }
})

export const ClientModel = mongoose.model("clientes", ClientSchema);
export const NumbersModel = mongoose.model("numeros", numbersSchema);
export const ClientNameModel = mongoose.model("nombres", clientNameSchema);