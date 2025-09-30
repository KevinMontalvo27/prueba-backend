import { Personaje } from "../model/models.js";

export async function obtenerPersonajes(opciones = {}) {
    const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'nombre',
        sortOrder = 'asc'
    } = opciones;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let filtro = {};
    if (search) {
        filtro = {
            $or: [
                { nombre: { $regex: search, $options: 'i' } },
                { genero: { $regex: search, $options: 'i' } },
                { colorOjos: { $regex: search, $options: 'i' } },
                { colorCabello: { $regex: search, $options: 'i' } },
                { colorPiel: { $regex: search, $options: 'i' } }
            ]
        };
    }

    const ordenamiento = {};
    ordenamiento[sortBy] = sortOrder === 'desc' ? -1 : 1;

    try {
        const [personajes, total] = await Promise.all([
            Personaje.find(filtro)
                .populate('peliculas', 'titulo')
                .populate('planetaNatal', 'nombre')
                .populate('especie', 'nombre')
                .populate('naves', 'nombre')
                .populate('vehiculos', 'nombre')
                .select('-createdAt -updatedAt')
                .sort(ordenamiento)
                .skip(skip)
                .limit(limitNum)
                .exec(),
            Personaje.countDocuments(filtro)
        ]);

        const totalPages = Math.ceil(total / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            data: personajes,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalItems: total,
                itemsPerPage: limitNum,
                hasNextPage,
                hasPrevPage,
                nextPage: hasNextPage ? pageNum + 1 : null,
                prevPage: hasPrevPage ? pageNum - 1 : null
            }
        };
    } catch (error) {
        throw new Error(`Error al obtener personajes: ${error.message}`);
    }
}

export async function obtenerPersonaje(id){
    return await Personaje.findById(id)
    .populate('peliculas', 'titulo')
    .populate('planetaNatal', 'nombre')
    .populate('especie', 'nombre')
    .populate('naves', 'nombre')
    .populate('vehiculos', 'nombre')
    .select('-createdAt -updatedAt')
    .exec();
}

export async function obtenerListaPersonajes(){
    return await Personaje.find()
    .select('id nombre')
    .exec();
}

export async function crearPersonaje(data){
    const personaje = new Personaje(data);
    return await personaje.save();
}

export async function actualizarPersonaje(id, datosActualizacion) {
    try {
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('ID de personaje inválido');
        }

        const personajeExistente = await Personaje.findById(id);
        if (!personajeExistente) {
            throw new Error('Personaje no encontrado');
        }

        if (datosActualizacion.nombre && datosActualizacion.nombre !== personajeExistente.nombre) {
            const nombreDuplicado = await Personaje.findOne({ 
                nombre: datosActualizacion.nombre.trim(),
                _id: { $ne: id }
            });

            if (nombreDuplicado) {
                throw new Error('Ya existe otro personaje con ese nombre');
            }
        }

        const personajeActualizado = await Personaje.findByIdAndUpdate(
            id,
            { 
                ...datosActualizacion, 
                updatedAt: new Date() 
            },
            { 
                new: true, 
                runValidators: true 
            }
        )
        .populate('peliculas', 'titulo')
        .populate('planetaNatal', 'nombre')
        .populate('especie', 'nombre')
        .populate('naves', 'nombre')
        .populate('vehiculos', 'nombre')
        .select('-createdAt -updatedAt')
        .exec();

        return personajeActualizado;

    } catch (error) {
        throw new Error(`Error al actualizar personaje: ${error.message}`);
    }
}

export async function eliminarPersonaje(id){
    return await Personaje.findByIdAndDelete(id)
    .exec();
}

export async function listarPersonajes() {
    try {
        const personajes = await Personaje.find()
            .select('id nombre')
            .exec();

        return {
            data: personajes,
            total: personajes.length
        };
    } catch (error) {
        throw new Error(`Error al listar personajes: ${error.message}`);
    }
}



