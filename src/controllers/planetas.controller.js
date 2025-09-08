import { actualizarPlaneta, eliminarPlaneta, listarPlanetas, obtenerPlaneta, obtenerPlanetas, crearPlaneta } from '../services/planetas.service.js';

export async function getPlanetas(req, res){
    try{
        const planetas = await obtenerPlanetas();
        res.json(planetas);
    } catch(error){
        console.error('Error obteniendo planetas', error);
        res.json({message: 'Error obteniendo planetas'});
    }       
}

export async function getPlaneta(req, res){
    const { id } = req.paramsS;
    try{
        const planeta = await obtenerPlaneta(id);
        res.json(planeta);     
    }
    catch(error){
        console.error(`Error obteniendo planeta con ID ${id}`, error);
        res.send(`Error obteniendo planeta con ID ${id}`);
    }
}

export async function postPlaneta(req, res){
    try{
        const nuevoPlaneta = await crearPlaneta(req.body);
        res.status(201).json(nuevoPlaneta);
    } catch(error){
        console.error('Error creando planeta', error);
        res.send('Error creando planeta');
    }
}

export async function putPlaneta(req, res){
    try{
        const { id } = req.params;
        const planetaActualizado = await actualizarPlaneta(id, req.body);
        res.json(planetaActualizado);
    }catch(error){
        console.error('Error actualizando planeta', error);
    }
}

export async function deletePlaneta(req, res){
    try{
        const { id } = req.params;
        await eliminarPlaneta(id);
        res.send(`Planeta eliminado correctamente`);
    }catch(error){
        console.error('Error eliminando planeta', error);
    }
}

export async function getListaPlanetas(req, res){
    try{
        const planetas = await listarPlanetas();
        res.json(planetas);
    } catch(error){
        console.error('Error obteniendo lista de planetas', error);
        res.json({message: 'Error obteniendo lista de planetas'});
    }   
}

