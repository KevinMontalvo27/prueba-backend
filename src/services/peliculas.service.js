import { Pelicula } from "../model/models.js";

export async function obtenerPeliculas(opciones = {}){
    const {
        page = 1,
        limit = 10,
        sortBy = 'titulo',
        sortOrder = 'asc'
    } = opciones;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const ordenamiento = {};
    ordenamiento[sortBy] = sortOrder === 'desc' ? -1 : 1;

    try {
        const [peliculas, total] = await Promise.all([
            Pelicula.find({})
                .select('-createdAt -updatedAt')
                .sort(ordenamiento)
                .skip(skip)
                .limit(limitNum)
                .exec(),
            Pelicula.countDocuments({})
        ]);

        const totalPages = Math.ceil(total / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            data: peliculas,
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
        throw new Error(`Error al obtener películas: ${error.message}`);
    }
}

export async function obtenerPelicula(id){
    return await Pelicula.findById(id)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function crearPelicula(data){
    const peliculaExistente = await Pelicula.findOne({ titulo: data.titulo }).exec();
    if (peliculaExistente) {
        throw new Error('Ya existe una película con ese título');
    }
    const pelicula = new Pelicula(data);
    return await pelicula.save();
}

export async function actualizarPelicula(id, data){
    const peliculaExistente = await Pelicula.findOne({ titulo: data.titulo });
    if (peliculaExistente) {
        throw new Error('Ya existe una pelicula con ese titulo.');
    }
    return await Pelicula.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarPelicula(id){
    return await Pelicula.findByIdAndDelete(id)
    .exec();
}

export async function listarPeliculas() {
    try {
        const peliculas = await Pelicula.find()
            .select('id titulo')
            .exec();

        return {
            data: peliculas,
            total: peliculas.length
        };
    } catch (error) {
        throw new Error(`Error al listar películas: ${error.message}`);
    }
}
