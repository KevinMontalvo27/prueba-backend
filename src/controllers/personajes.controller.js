import { obtenerPersonaje, 
    obtenerPersonajes, 
    obtenerListaPersonajes, 
    crearPersonaje, 
    actualizarPersonaje, 
    eliminarPersonaje } 
    from "../services/personaje.service.js";

export async function getPersonajes(req, res){
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortBy = 'nombre',
            sortOrder = 'asc'
        } = req.query;

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit))); 

        const opciones = {
            page: pageNum,
            limit: limitNum,
            search: search.trim(),
            sortBy: ['nombre', 'genero', 'estatura', 'masa', 'fechaNacimiento'].includes(sortBy) ? sortBy : 'nombre',
            sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc'
        };

        const resultado = await obtenerPersonajes(opciones);
        
        res.status(200).json({
            success: true,
            message: 'Personajes obtenidos correctamente',
            ...resultado
        });
    } catch(error){
        console.error('Error obteniendo personajes:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            data: [],
            pagination: null
        });
    }       
}

export async function getPersonaje(req, res) {
    try {
        const { id } = req.params;
        const personaje = await obtenerPersonaje(id);
        if (!personaje) {
            return res.status(404).json({ message: "Personaje no encontrado" });
        }
        res.json(personaje);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getListaPersonajes(req, res) {
    try {
        const personajes = await obtenerListaPersonajes();
        res.json(personajes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function postPersonaje(req, res) {
    try {
        const data = req.body;
        const nuevoPersonaje = await crearPersonaje(data);
        res.status(201).json(nuevoPersonaje);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function putPersonaje(req, res) {
    try {
        const { id } = req.params;
        const datosActualizacion = req.body;

        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'ID de personaje inválido'
            });
        }

        if (!datosActualizacion || Object.keys(datosActualizacion).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No se proporcionaron datos para actualizar'
            });
        }

        const personajeActualizado = await actualizarPersonaje(id, datosActualizacion);

        return res.status(200).json({
            success: true,
            message: 'Personaje actualizado exitosamente',
            data: personajeActualizado
        });

    } catch (error) {
        console.error('Error en updatePersonaje:', error);

        if (error.message.includes('no encontrado')) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message.includes('Ya existe')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export async function deletePersonaje(req, res) {
    try {
        const { id } = req.params;
        const personajeEliminado = await eliminarPersonaje(id);
        if (!personajeEliminado) {
            return res.status(404).json({ message: "Personaje no encontrado" });
        }
        res.json({ message: "Personaje eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}