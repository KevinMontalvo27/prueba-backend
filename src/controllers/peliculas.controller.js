import { crearPelicula, 
    obtenerPelicula, 
    obtenerPeliculas, 
    eliminarPelicula, 
    actualizarPelicula, 
    listarPeliculas,
} from "../services/peliculas.service.js"; 


export async function getPeliculas(req, res){
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'titulo',
            sortOrder = 'asc'
        } = req.query;

        
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); 

        const opciones = {
            page: pageNum,
            limit: limitNum,
            sortBy: ['titulo', 'director', 'productor'].includes(sortBy) ? sortBy : 'titulo',
            sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc'
        };

        const resultado = await obtenerPeliculas(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Películas obtenidas correctamente',
            ...resultado
        });
    } catch(error){
        console.error('Error obteniendo películas:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }       
}

export async function getPelicula(req, res){
    const { id } = req.params;
    try{
        const pelicula = await obtenerPelicula(id);
        res.json(pelicula);     
    }
    catch(error){
        console.error(`Error obteniendo pelicula con ID ${id}`, error);
        res.send(`Error obteniendo pelicula con ID ${id}`);
    }
}

export async function postPelicula(req, res){
    try{
        const nuevaPelicula = await crearPelicula(req.body);
        res.status(201).json(nuevaPelicula);
    } catch(error){
        console.error('Error creando pelicula', error);
        res.send('Error creando pelicula');
    }
}

export async function putPelicula(req, res){
    try{
        const { id } = req.params;
        const peliculaActualizada = await actualizarPelicula(id, req.body);
        res.json(peliculaActualizada);
    }catch(error){
        console.error('Error actualizando pelicula', error);
    }
}

export async function deletePelicula(req, res){
    try{
        const { id } = req.params;
        await eliminarPelicula(id);
        res.send(`Pelicula eliminada correctamente`);
    }catch(error){
        console.error('Error eliminando pelicula', error);
    }
}

export async function getListaPeliculas(req, res){
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

        const resultado = await listarPeliculas(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Lista de películas obtenida correctamente',
            ...resultado
        });
    } catch(error) {
        console.error('Error obteniendo lista de películas:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }   
}
