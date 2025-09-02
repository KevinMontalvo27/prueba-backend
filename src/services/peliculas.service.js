import { Pelicula } from "../model/models";

export async function obtenerPeliculas(){
    return await Pelicula.find()
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerPelicula(id){
    return await Pelicula.findById(id)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function crearPelicula(data){
    const pelicula = new Pelicula(data);
    return await pelicula.save();
}

export async function actualizarPelicula(id, data){
    return await Pelicula.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarPelicula(id){
    return await Pelicula.findByIdAndDelete(id)
    .exec();
}

export async function listarPeliculas(){
    return await Pelicula.find()
    .select('id titulo')
    .exec();
}

