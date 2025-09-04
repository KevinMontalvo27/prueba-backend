import { Especie } from "../model/models";
import connectDB from "../setup/dbconnection";



export async function obtenerEspecies(){
    return await Especie
    .find()
    .populate('planetaNatal', 'nombre')
    .select('-createdAt -updatedAt')
    .exec();
}  

export async function obtenerEspecie(id){
    return await Especie
    .findById(id)
    .populate('planetaNatal', 'nombre')
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerListaEspecies(){
    return await Especie
    .find()
    .select('id nombre')
    .exec();
}

export async function crearEspecie(data){
    const especie = new Especie(data);
    return await especie.save();
}

export async function actualizarEspecie(id, data){
    return await Especie.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarEspecie(id){
    return await Especie.findByIdAndDelete(id)
    .exec();
}

async function main(){
    const data = {
        nombre: "Especie de prueba2",
        clasificacion: "Clasificacion de prueba2",
        designacion: "Designacion de prueba2",
        estatura: 180,
        esperanzaVida: 120,
        colorOjos: "Azul2",
        planetaNatal: "68b73682c992ef001747e448"
    }
    const id = '68b9c53bd11f2aa9705439d9'
    connectDB();
    
    const especies = await obtenerEspecies();
    console.log(especies);

    process.exit();
}

main();