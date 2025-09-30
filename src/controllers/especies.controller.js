import { obtenerEspecie, 
    obtenerEspecies, 
    listarEspecies, 
    crearEspecie, 
    actualizarEspecie, 
    eliminarEspecie } 
    from "../services/especies.service.js";

export async function getEspecies(req, res){
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
            sortBy: ['nombre', 'clasificacion', 'designacion', 'idioma', 'estatura', 'esperanzaVida'].includes(sortBy) ? sortBy : 'nombre',
            sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc'
        };

        const resultado = await obtenerEspecies(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Especies obtenidas correctamente',
            ...resultado
        });
    } catch(error){
        console.error('Error obteniendo especies:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }       
}

export async function getEspecie(req, res) {
    const { id } = req.params;
    try {
        const especie = await obtenerEspecie(id);
        res.json(especie);
    } catch (error) {
        console.error(`Error obteniendo especie con ID ${id}`, error);
        res.send(`Error obteniendo especie con ID ${id}`);
    }   
}

export async function getListaEspecies(req, res) {
    try {
        const especies = await listarEspecies();
        res.json(especies);
    } catch (error) {
        console.error('Error obteniendo lista de especies:', error);
        res.status(500).json({ 
            message: 'Error obteniendo lista de especies',
            error: error.message 
        });
    }
}

export async function postEspecie(req, res) {
    try {
        const nuevaEspecie = await crearEspecie(req.body);
        res.status(201).json(nuevaEspecie);
    } catch (error) {
        console.error('Error creando especie', error);
        res.send('Error creando especie');
    }
}

export async function putEspecie(req, res) {
    const { id } = req.params;
    try {
        const especieActualizada = await actualizarEspecie(id, req.body);
        res.json(especieActualizada);
    } catch (error) {
        console.error('Error actualizando especie', error);
        res.send('Error actualizando especie');
    }
}

export async function deleteEspecie(req, res) {
    const { id } = req.params;
    try {
        await eliminarEspecie(id);
        res.send(`Especie eliminada correctamente`);
    } catch (error) {
        console.error('Error eliminando especie', error);
        res.send('Error eliminando especie');
    }
}

