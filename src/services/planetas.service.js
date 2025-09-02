import { Planeta } from "../model/models";

export async function obtenerPlanetas(){
    return await Planeta.find()
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerPlaneta(id){
    return await Planeta.findById(id)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function crearPlaneta(data){
    const planeta = new Planeta(data);
    return await planeta.save();
}   

export async function actualizarPlaneta(id, data){
    return await Planeta.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarPlaneta(id){
    return await Planeta.findByIdAndDelete(id)
    .exec();
}

export async function listarPlanetas(){
    return await Planeta.find()
    .select('id nombre')
    .exec();
}