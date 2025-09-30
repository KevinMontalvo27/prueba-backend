import mongoose from 'mongoose';

const baseSchema =      {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}

const peliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    director: { type: String, required: true },
    productor: { type: String, required: true },
    ...baseSchema
})

const planetaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true},
    diametro: { type: Number, required: false},
    periodoRotacion: { type: Number, required: false},
    periodoOrbital: { type: Number, required: false},
    gravedad: { type: String, required: false},
    poblacion: { type: Number, required: false},
    clima: { type: String, required: false},
    terreno: { type: String, required: false},
    porcentajeSuperficieAgua: { type: Number, required: false},
    ...baseSchema
})

const especieSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    clasificacion: { type: String, required: false},
    designacion: { type: String, required: false},
    estatura: { type: Number, required: false},
    esperanzaVida: { type: Number, required: false},
    colorOjos: { type: String, required: false},
    colorCabello: { type: String, required: false},
    colorPiel: { type: String, required: false},
    lenguaje: { type: String, required: false},
    planetaNatal: { type: mongoose.Schema.Types.ObjectId, ref: 'Planeta', required: false},
    ...baseSchema
})

const naveSchema =  new mongoose.Schema({
    nombre: { type: String, required: true, unique: true},
    modelo: { type: String, required: true},
    tamanio : { type: String, required: false},
    velocidadAtmosfericaMaxima: { type: String, required: false},
    hiperimpulsor: { type: String, required: false},
    numeroPasajeros: { type: Number, required: false},
    capacidadCarga: { type: Number, required: false},
    consumibles: { type: String, required: false},
    mglt: { type: Number, required: false},
    ...baseSchema
})

const vehiculoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true},
    modelo: { type: String, required: true},
    clase: { type: String, required: false},
    tamanio: { type: String, required: false},
    numeroPasajeros: { type: Number, required: false},
    velocidadAtmosfericaMaxima: { type: String, required: false},
    capacidadCarga: { type: Number, required: false},
    consumibles: { type: String, required: false},
    ...baseSchema
})

const personajeSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    fechaNacimiento: { type: String, required: false},
    colorOjos: { type: String, required: false},
    genero: { type: String, required: false},
    colorCabello: { type: String, required: false},
    estatura: { type: Number, required: false},
    masa: { type: Number, required: false},
    colorPiel: { type: String, required: false},
    peliculas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pelicula'}],
    planetaNatal: { type: mongoose.Schema.Types.ObjectId, ref: 'Planeta'},
    especie: { type: mongoose.Schema.Types.ObjectId, ref: 'Especie'},
    naves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nave'}],
    vehiculos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo'}],
    ...baseSchema   
})



const Pelicula = mongoose.model('Pelicula', peliculaSchema);
const Planeta = mongoose.model('Planeta', planetaSchema);
const Especie = mongoose.model('Especie', especieSchema);
const Nave = mongoose.model('Nave', naveSchema);
const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
const Personaje = mongoose.model('Personaje', personajeSchema);

export { Pelicula, Planeta, Especie, Nave, Vehiculo, Personaje };