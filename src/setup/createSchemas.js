import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { Pelicula, Planeta, Especie, Nave, Vehiculo, Personaje } from '../model/models.js';

async function createSchemas() {

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Conectado a la base de datos para crear esquemas');

        await Promise.all([
            Pelicula.createCollection(),
            Planeta.createCollection(),
            Especie.createCollection(),
            Nave.createCollection(),
            Vehiculo.createCollection(),
            Personaje.createCollection(),
            
        ]);
        console.log('Esquemas creados correctamente');
        process.exit(0);

    } catch(error){
        console.error(`Error creando esquemas: ${error.message}`);
        process.exit(1);
    }
}

createSchemas();