import { Planeta } from "../model/models.js";

export async function obtenerPlanetas(opciones = {}) {
    const {
        page = 1,
        limit = 10,
        sortBy = 'nombre',
        sortOrder = 'asc'
    } = opciones;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const ordenamiento = {};
    ordenamiento[sortBy] = sortOrder === 'desc' ? -1 : 1;

    try {
        const [planetas, total] = await Promise.all([
            Planeta.find({})
                .select('-createdAt -updatedAt')
                .sort(ordenamiento)
                .skip(skip)
                .limit(limitNum)
                .exec(),
            Planeta.countDocuments({})
        ]);

        const totalPages = Math.ceil(total / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            data: planetas,
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
        throw new Error(`Error al obtener planetas: ${error.message}`);
    }
}

export async function obtenerPlaneta(id){
    return await Planeta.findById(id)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function crearPlaneta(data){
    const planeta = new Planeta(data);
    return await planeta.save();
}   

export async function actualizarPlaneta(id, data){
    return await Planeta.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarPlaneta(id){
    return await Planeta.findByIdAndDelete(id)
    .exec();
}

export async function listarPlanetas() {
    try {
        const planetas = await Planeta.find()
            .select('id nombre')
            .exec();

        return {
            data: planetas,
            total: planetas.length
        };
    } catch (error) {
        throw new Error(`Error al listar planetas: ${error.message}`);
    }
}
