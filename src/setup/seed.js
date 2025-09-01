import mongoose from 'mongoose';
import axios from 'axios';
import connectDB from './dbconnection.js';


let BASE_URL = 'https://swapi.info/api';

import { Pelicula, Planeta, Especie, Nave, Vehiculo, Personaje } from '../model/models.js';

async function getData(endpoint){
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}/`);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo datos de ${endpoint}: ${error.message}`);
        return [];
    }
}

async function obtenerRecursoPorUrl(url) {
    try {
        if (!url) return null;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error obteniendo recurso de ${url}: ${error.message}`);
        return null;
    }
}

function buscarIdPorNombre(arrayDocs, nombre, campo = "nombre") {
    const encontrado = arrayDocs.find(d => d[campo] === nombre);
    return encontrado?._id || null;
}

function asegurarNumero(value) {
    if (value === undefined || value === null) return null;
    const clean = String(value).replace(/,/g, '');
    const num = Number(value);
    return isNaN(num) ? null : num;
}


function convertirPelicula(film){
    return {
        titulo: film.title,
        director: film.director,
        productor: film.producer,
    }
}

function convertirPlaneta(planet){
    return{
        nombre: planet.name,
        diametro: planet.diameter ? asegurarNumero(planet.diameter) : null,
        periodoRotacion: planet.rotation_period ? asegurarNumero(planet.rotation_period) : null,
        periodoOrbital: planet.orbital_period ? asegurarNumero(planet.orbital_period) : null,
        gravedad: planet.gravity,
        poblacion: planet.population ? asegurarNumero(planet.population) : null,
        clima : planet.climate,
        terreno : planet.terrain,
        porcentajeSuperficieAgua: planet.surface_water ? asegurarNumero(planet.surface_water) : null,
    }
}

function convertirNave (starship){
    return {
        nombre: starship.name,
        modelo: starship.model,
        tamanio : starship.length ? starship.length : null,
        velocidadAtmosfericaMaxima: starship.max_atmosphering_speed,
        hiperimpulsor: starship.hyperdrive_rating ? starship.hyperdrive_rating : null,
        numeroPasajeros: starship.passengers ? asegurarNumero(starship.passengers) : null,
        capacidadCarga: starship.cargo_capacity ? asegurarNumero(starship.cargo_capacity) : null,
        consumibles: starship.consumables,
        mglt: starship.MGLT ? asegurarNumero(starship.MGLT) : null,
    }
}

function convertirVehiculo (vehicle){
    return {
        nombre: vehicle.name,
        modelo: vehicle.model,
        clase: vehicle.vehicle_class,
        tamanio: vehicle.length ? vehicle.length : null,
        numeroPasajeros: vehicle.passengers ? asegurarNumero(vehicle.passengers) : null,
        velocidadAtmosfericaMaxima: vehicle.max_atmosphering_speed,
        capacidadCarga: vehicle.cargo_capacity ? asegurarNumero(vehicle.cargo_capacity) : null,
        consumibles: vehicle.consumables,
    }
}

async function convertirEspecie (species, planetas){
    let planetaObjectId = null;
    
    if (species.homeworld) {
        const planetaData = await obtenerRecursoPorUrl(species.homeworld);
        const planetaEncontrado = planetas.find(p => p.nombre === planetaData?.name);
        planetaObjectId = planetaEncontrado?._id || null;
    }
    
    return {
        nombre: species.name,
        clasificacion: species.classification,
        designacion: species.designation,
        estatura: species.average_height ? asegurarNumero(species.average_height) : null,
        esperanzaVida: species.average_lifespan ? asegurarNumero(species.average_lifespan) : null,
        colorOjos: species.eye_colors,
        colorCabello: species.hair_colors,
        colorPiel: species.skin_colors,
        lenguaje: species.language,
        planetaNatal: planetaObjectId
    };
}

async function convertirPersonaje (people, planetas, peliculas, especies, naves, vehiculos){
    let planetaObjectId = null;
    let especieObjectId = null;
    let peliculasIds = [];
    let navesIds = [];
    let vehiculosIds = [];

    if (people.homeworld) {
        const planetaData = await obtenerRecursoPorUrl(people.homeworld);
        planetaObjectId = buscarIdPorNombre(planetas, planetaData?.name);
    }

    if (people.species && people.species.length > 0) {
        const especieData = await obtenerRecursoPorUrl(people.species[0]);
        especieObjectId = buscarIdPorNombre(especies, especieData?.name);
    }

    if (people.films && people.films.length > 0) {
        for (const filmUrl of people.films) {
            const filmData = await obtenerRecursoPorUrl(filmUrl);
            const filmId = buscarIdPorNombre(peliculas, filmData?.title, "titulo");
            if (filmId) peliculasIds.push(filmId);
        }
    }

    if (people.starships && people.starships.length > 0) {
        for (const starshipUrl of people.starships) {
            const starshipData = await obtenerRecursoPorUrl(starshipUrl);
            const naveId = buscarIdPorNombre(naves, starshipData?.name);
            if (naveId) navesIds.push(naveId);
        }
    }

    if (people.vehicles && people.vehicles.length > 0) {
        for (const vehicleUrl of people.vehicles) {
            const vehicleData = await obtenerRecursoPorUrl(vehicleUrl);
            const vehiculoId = buscarIdPorNombre(vehiculos, vehicleData?.name);
            if (vehiculoId) vehiculosIds.push(vehiculoId);
        }
    }


    return {
        nombre: people.name,
        fechaNacimiento: people.birth_year,
        colorOjos: people.eye_color,
        genero: people.gender,
        colorCabello: people.hair_color,
        estatura: people.height ? asegurarNumero(people.height) : null,
        masa: people.mass ? asegurarNumero(people.mass) : null,
        colorPiel: people.skin_color,
        peliculas: peliculasIds, 
        planetaNatal: planetaObjectId,
        especie: especieObjectId,
        naves: navesIds,
        vehiculos: vehiculosIds,
    }
}

connectDB();

async function limpiarDatos(){
    try{
        await Promise.all([
            Pelicula.deleteMany({}),
            Planeta.deleteMany({}),
            Especie.deleteMany({}),
            Nave.deleteMany({}),
            Vehiculo.deleteMany({}),
            Personaje.deleteMany({}),
        ]);
        console.log('Datos existentes eliminados correctamente');
    } catch (error){
        console.error(`Error eliminando datos existentes: ${error.message}`);
    }
}

async function poblarDB(){
    
    try{

        console.log('Limpiando datos existentes');
        await limpiarDatos();
        console.log('Iniciando proceso de poblacion de la base de datos');

        console.log('Obteniendo datos')

        const [films, planets, species, starships, vehicles, people] = await Promise.all([
            getData('films'),
            getData('planets'),
            getData('species'),
            getData('starships'),
            getData('vehicles'),
            getData('people'),
        ]);

        console.log(`Datos obtenidos - Films: ${films.length}, Planets: ${planets.length}, Species: ${species.length}, Starships: ${starships.length}, Vehicles: ${vehicles.length}, People: ${people.length}`);

        console.log('Insertando peliculas');
        const peliculasData = films.map(convertirPelicula);
        const peliculas = await Pelicula.insertMany(peliculasData);
        

        console.log('Insertando planetas');
        const planetasData = planets.map(convertirPlaneta);
        const planetas = await Planeta.insertMany(planetasData);

        console.log('Insertando especies');
        const especiesConPlaneta = []
        for (const specie of species) {
            const especieConvertida = await convertirEspecie(specie, planetas);
            especiesConPlaneta.push(especieConvertida);
        }
        const especiesGuardadas = await Especie.insertMany(especiesConPlaneta);

        console.log('Insertando naves');
        const navesData = starships.map(convertirNave);
        const naves = await Nave.insertMany(navesData);
        
        console.log('Insertando vehiculos');
        const vehiculosData = vehicles.map(convertirVehiculo);
        const vehiculos = await Vehiculo.insertMany(vehiculosData);

        console.log('Insertando personajes');
        const personajesConvertidos = [];
        for (const person of people) {
            const personajeConvertido = await convertirPersonaje(person, 
                planetas,
                peliculas,
                especiesGuardadas,
                naves,
                vehiculos
            );
            personajesConvertidos.push(personajeConvertido);
        }

        await Personaje.insertMany(personajesConvertidos);
        
    } catch (error){
        console.error(`Error poblando la base de datos: ${error.message}`);
    }

}

poblarDB().then(() => {
    console.log('Proceso de poblacion de la base de datos completado');
    mongoose.connection.close();
});

