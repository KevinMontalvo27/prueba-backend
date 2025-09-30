import { 
    crearVehiculo, 
    obtenerVehiculo, 
    obtenerVehiculos, 
    eliminarVehiculo, 
    actualizarVehiculo, 
    listarVehiculos,
} from "../services/vehiculo.service.js";

export async function getVehiculos(req, res){
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
            sortBy: ['nombre', 'modelo', 'clase', 'fabricante'].includes(sortBy) ? sortBy : 'nombre',
            sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc'
        };

        const resultado = await obtenerVehiculos(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Vehículos obtenidos correctamente',
            ...resultado
        });
    } catch(error){
        console.error('Error obteniendo vehículos:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }       
}

export async function getVehiculo(req, res) {
    const { id } = req.params;
    try {
        const vehiculo = await obtenerVehiculo(id);
        res.json(vehiculo);     
    }
    catch(error) {
        console.error(`Error obteniendo vehículo con ID ${id}`, error);
        res.send(`Error obteniendo vehículo con ID ${id}`);
    }
}

export async function postVehiculo(req, res) {
    try {
        const nuevoVehiculo = await crearVehiculo(req.body);
        res.status(201).json(nuevoVehiculo);
    } catch(error) {
        console.error('Error creando vehículo', error);
        res.send('Error creando vehículo');
    }
}

export async function putVehiculo(req, res) {
    try {
        const { id } = req.params;
        const vehiculoActualizado = await actualizarVehiculo(id, req.body);
        res.json(vehiculoActualizado);
    } catch(error) {
        console.error('Error actualizando vehículo', error);
    }
}

export async function deleteVehiculo(req, res) {
    try {
        const { id } = req.params;
        await eliminarVehiculo(id);
        res.send(`Vehículo eliminado correctamente`);
    } catch(error) {
        console.error('Error eliminando vehículo', error);
    }
}

export async function getListaVehiculos(req, res) {
    try {
        const {
            page = 1,
            limit = 50,
            search = ''
        } = req.query;

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

        const opciones = {
            page: pageNum,
            limit: limitNum,
            search: search.trim()
        };

        const resultado = await listarVehiculos(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Lista de vehículos obtenida correctamente',
            ...resultado
        });
    } catch(error) {
        console.error('Error obteniendo lista de vehículos:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }   
}
