import mongoose from 'mongoose';


const baseSchema = {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}


const peliculaSchema = {
    titulo: { type: String, required: true },
    director: { type: String, required: true },
    productor: { type: String, required: true },
    ...baseSchema
}


const planetaSchema = {
    nombre: { type: String, required: true, unique: true},
    periodoRotacion: { type: Number, required: false},
    periodoOrbital: { type: Number, required: false},
    diametro: { type: Number, required: false},
    gravedad: { type: String, required: false},
    clima: { type: String, required: false},
    terreno: { type: String, required: false},
    agua: { type: Number, required: false},
    poblacion: { type: Number, required: false},
    ...baseSchema
}

const especieSchema = {
    nombre: { type: String, required: true},
    clasificacion: { type: String, required: false},
    designacion: { type: String, required: false},
    estatura: { type: Number, required: false},
    color: { type: String, required: false},
    colorCabello: { type: String, required: false},
    ojos: { type: String, required: false},
    esperanzaVida: { type: Number, required: false},
    lenguaje: { type: String, required: false},
    ...baseSchema
}

const naveSchema = {
    nombre: { type: String, required: true, unique: true},
    modelo: { type: String, required: true},
    
}