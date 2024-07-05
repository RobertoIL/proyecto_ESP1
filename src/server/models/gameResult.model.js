import mongoose from "mongoose";
import bcrypt from "bcrypt";

const gResultSchema = new mongoose.Schema({
    ganador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    perdedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    claseGanadora: {
        type: String,
        required: true,
    },
    clasePerdedora:{
        type: String,
        required: true,
    },
    tiempo:{
        type: Number,
        required: true,
    },
    hp: {
        type: Number,
        required: true,
    }
});

const GResult = mongoose.model('GResult', gResultSchema);

export default GResult;