import { Personaje } from "../model/models";
import  connectDB  from "../setup/dbconnection.js";

export async function obtenerPersonajes(){
    return await Personaje.find()
    .populate('peliculas', 'titulo')
    .populate('planetaNatal', 'nombre')
    .populate('especie', 'nombre')
    .populate('naves', 'nombre')
    .populate('vehiculos', 'nombre')
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerPersonaje(id){
    return await Personaje.findById(id)
    .populate('peliculas', 'titulo')
    .populate('planetaNatal', 'nombre')
    .populate('especie', 'nombre')
    .populate('naves', 'nombre')
    .populate('vehiculos', 'nombre')
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerListaPersonajes(){
    return await Personaje.find()
    .select('id nombre')
    .exec();
}

export async function crearPersonaje(data){
    const personaje = new Personaje(data);
    return await personaje.save();
}

export async function actualizarPersonaje(id, data){
    return await Personaje.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarPersonaje(id){
    return await Personaje.findByIdAndDelete(id)
    .exec();
}



