import { Nave } from "../model/models";

export async function obtenerNaves(){
    return await Nave.find()
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerNave(id){
    return await Nave.findById(id)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function crearNave(data){
    const nave = new Nave(data);
    return await nave.save();
}

export async function actualizarNave(id, data){
    return await Nave.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarNave(id){
    return await Nave.findByIdAndDelete(id)
    .exec();
}

export async function listarNaves(){
    return await Nave.find()
    .select('id nombre')
    .exec();
}

