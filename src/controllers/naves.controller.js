import { crearNave, 
    obtenerNave, 
    obtenerNaves, 
    eliminarNave, 
    actualizarNave, 
    listarNaves,
} from "../services/nave.service.js"; 


export async function getNaves(req, res){
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
            sortBy: ['nombre', 'modelo', 'fabricante', 'clase'].includes(sortBy) ? sortBy : 'nombre',
            sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc'
        };

        const resultado = await obtenerNaves(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Naves obtenidas correctamente',
            ...resultado
        });
    } catch(error){
        console.error('Error obteniendo naves:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }       
}

export async function getNave(req, res){
    const { id } = req.params;
    try{
        const nave = await obtenerNave(id);
        res.json(nave);     
    }
    catch(error){
        console.error(`Error obteniendo nave con ID ${id}`, error);
        res.send(`Error obteniendo nave con ID ${id}`);
    }
}

export async function postNave(req, res){
    try{
        const nuevaNave = await crearNave(req.body);
        res.status(201).json(nuevaNave);
    } catch(error){
        console.error('Error creando nave', error);
        res.send('Error creando nave');
    }
}

export async function putNave(req, res){
    try{
        const { id } = req.params;
        const naveActualizada = await actualizarNave(id, req.body);
        res.json(naveActualizada);
    }catch(error){
        console.error('Error actualizando nave', error);
    }
}

export async function deleteNave(req, res){
    try{
        const { id } = req.params;
        await eliminarNave(id);
        res.send(`Nave eliminada correctamente`);
    }catch(error){
        console.error('Error eliminando nave', error);
    }
}

export async function getListaNaves(req, res){
    try {
        const {
            page = 1,
            limit = 50,
            search = ''
        } = req.query;

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(10, Math.max(1, parseInt(limit)));

        const opciones = {
            page: pageNum,
            limit: limitNum,
            search: search.trim()
        };

        const resultado = await listarNaves(opciones.page, opciones.limit);
        
        res.status(200).json({
            success: true,
            message: 'Lista de naves obtenida correctamente',
            ...resultado
        });
    } catch(error) {
        console.error('Error obteniendo lista de naves:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }   
}
