import { actualizarPlaneta, 
    eliminarPlaneta, 
    listarPlanetas, 
    obtenerPlaneta, 
    obtenerPlanetas, 
    crearPlaneta, } 
    from '../services/planetas.service.js';

export async function getPlanetas(req, res){
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'nombre',
            sortOrder = 'asc'
        } = req.query;

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); 

        const opciones = {
            page: pageNum,
            limit: limitNum,
            sortBy: ['nombre', 'clima', 'terreno', 'diametro', 'poblacion'].includes(sortBy) ? sortBy : 'nombre',
            sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc'
        };

        const resultado = await obtenerPlanetas(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Planetas obtenidos correctamente',
            ...resultado
        });
    } catch(error){
        console.error('Error obteniendo planetas:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }       
}
export async function getPlaneta(req, res){
    const { id } = req.params;
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

export async function getListaPlanetas(req, res) {
    try {
        const resultado = await listarPlanetas();
        res.json(resultado);
    } catch (error) {
        console.error('Error obteniendo lista de planetas', error);
        res.status(500).json({ 
            message: 'Error obteniendo lista de planetas',
            error: error.message 
        });
    }
}
