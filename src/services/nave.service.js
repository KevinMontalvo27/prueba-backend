import { Nave } from "../model/models.js";

export async function obtenerNaves(opciones = {}) {
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
        const [naves, total] = await Promise.all([
            Nave.find({})
                .select('-createdAt -updatedAt')
                .sort(ordenamiento)
                .skip(skip)
                .limit(limitNum)
                .exec(),
            Nave.countDocuments({})
        ]);

        const totalPages = Math.ceil(total / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            data: naves,
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
        throw new Error(`Error al obtener naves: ${error.message}`);
    }
}

export async function obtenerNave(id){
    return await Nave.findById(id)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function crearNave(data){
    const naveExistente = await Nave.findOne({ nombre: data.nombre });
    if (naveExistente) {
        throw new Error('Ya existe una nave con ese nombre.');
    }
    const nave = new Nave(data);
    return await nave.save();
}

export async function actualizarNave(id, data){
    if (data.nombre) {
        const naveExistente = await Nave.findOne({ 
            nombre: data.nombre,
            _id: { $ne: id }
        });
        if (naveExistente) {
            throw new Error(`Ya existe una nave con el nombre "${data.nombre}"`);
        }
    }
    return await Nave.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarNave(id){
    return await Nave.findByIdAndDelete(id)
    .exec();
}

export async function listarNaves() {
    try {
        const naves = await Nave.find()
            .select('id nombre')
            .exec();

        return {
            data: naves,
            total: naves.length
        };
    } catch (error) {
        throw new Error(`Error al listar naves: ${error.message}`);
    }
}
