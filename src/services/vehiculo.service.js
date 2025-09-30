// src/services/vehiculo.service.js
import { Vehiculo } from "../model/models.js";

export async function obtenerVehiculos(opciones = {}) {
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
        const [vehiculos, total] = await Promise.all([
            Vehiculo.find({})
                .select('-createdAt -updatedAt')
                .sort(ordenamiento)
                .skip(skip)
                .limit(limitNum)
                .exec(),
            Vehiculo.countDocuments({})
        ]);

        const totalPages = Math.ceil(total / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        return {
            data: vehiculos,
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
        throw new Error(`Error al obtener vehículos: ${error.message}`);
    }
}

export async function obtenerVehiculo(id) {
    return await Vehiculo.findById(id)
        .select('-createdAt -updatedAt')
        .exec();
}

export async function crearVehiculo(data) {
    const vehiculoExistente = await Vehiculo.findOne({ nombre: data.nombre }).exec();
    if (vehiculoExistente) {
        throw new Error('Ya existe un vehículo con ese nombre');
    }
    const vehiculo = new Vehiculo(data);
    return await vehiculo.save();
}

export async function actualizarVehiculo(id, data) {
    const vehiculoExistente = await Vehiculo.findOne({ nombre: data.nombre });
    if (vehiculoExistente && vehiculoExistente._id.toString() !== id) {
        throw new Error('Ya existe un vehículo con ese nombre.');
    }
    return await Vehiculo.findByIdAndUpdate(id, data)
        .select('-createdAt -updatedAt')
        .exec();
}

export async function eliminarVehiculo(id) {
    return await Vehiculo.findByIdAndDelete(id)
        .exec();
}

export async function listarVehiculos() {
    try {
        const vehiculos = await Vehiculo.find()
            .select('id nombre')
            .exec();

        return {
            data: vehiculos,
            total: vehiculos.length
        };
    } catch (error) {
        throw new Error(`Error al listar vehículos: ${error.message}`);
    }
}
