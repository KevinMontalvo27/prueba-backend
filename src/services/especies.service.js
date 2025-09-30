import { Especie } from "../model/models.js";

export async function obtenerEspecies(opciones = {}) {
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
        const [especies, total] = await Promise.all([
            Especie.find({})
                .populate('planetaNatal', 'nombre')
                .select('-createdAt -updatedAt')
                .sort(ordenamiento)
                .skip(skip)
                .limit(limitNum)
                .exec(),
            Especie.countDocuments({})
        ]);

        const totalPages = Math.ceil(total / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            data: especies,
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
        throw new Error(`Error al obtener especies: ${error.message}`);
    }
}

export async function obtenerEspecie(id){
    return await Especie
    .findById(id)
    .populate('planetaNatal', 'nombre')
    .select('-createdAt -updatedAt')
    .exec();
}

export async function listarEspecies() {
    try {
        const especies = await Especie.find()
            .select('id nombre')
            .exec();

        return {
            data: especies,
            total: especies.length
        };
    } catch (error) {
        throw new Error(`Error al obtener lista de especies: ${error.message}`);
    }
}

export async function crearEspecie(data){

    const especieExistente = await Especie.findOne({ nombre: data.nombre }).exec();
    if (especieExistente) {
        throw new Error('Ya existe una especie con ese nombre');
    }
    const especie = new Especie(data);
    return await especie.save();
}

export async function actualizarEspecie(id, data){

    if (data.nombre) {
        const especieExistente = await Especie.findOne({ 
            nombre: data.nombre, 
            _id: { $ne: id }
        });
        if (especieExistente) {
            throw new Error(`Ya existe una especie con el nombre "${data.nombre}"`);
        }
    }

    return await Especie.findByIdAndUpdate(id, data)
    .select('-createdAt -updatedAt')
    .exec();
}

export async function eliminarEspecie(id){
    return await Especie.findByIdAndDelete(id)
    .exec();
}

