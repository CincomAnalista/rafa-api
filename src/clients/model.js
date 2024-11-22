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
    lastUpdate: {
        type: Date,
        required: false,
    },
})

export const ClientModel = mongoose.model("clientes", ClientSchema);