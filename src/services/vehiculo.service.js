import { Vehiculo } from "../model/models";

export async function obtenerVehiculos(){
    return await Vehiculo.find()
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerVehiculo(id){
    return await Vehiculo.findById(id)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function crearVehiculo(data){
    const nave = new Vehiculo(data);
    return await nave.save();
}

export async function actualizarVehiculo(id, data){
    return await Vehiculo.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarVehiculo(id){
    return await Vehiculo.findByIdAndDelete(id)
    .exec();
}

export async function listarVehiculos(){
    return await Vehiculo.find()
    .select('id nombre')
    .exec();
}

