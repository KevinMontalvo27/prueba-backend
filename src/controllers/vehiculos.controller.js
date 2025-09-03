import {obtenerVehiculo, 
    obtenerVehiculos, 
    crearVehiculo, 
    actualizarVehiculo, 
    eliminarVehiculo,
    listarVehiculos
} from '../services/vehiculos.service.js';

export async function getVehiculos(req, res) {
    try {
        const vehiculos = await obtenerVehiculos();
        res.json(vehiculos);
    } catch (error) {
        console.error('Error obteniendo vehiculos', error);
        res.json({ message: 'Error obteniendo vehiculos' });
    }
}

export async function getVehiculo(req, res) {
    const { id } = req.params;
    try {
        const vehiculo = await obtenerVehiculo(id);
        res.json(vehiculo);
    } catch (error) {
        console.error(`Error obteniendo vehiculo con ID ${id}`, error);
        res.send(`Error obteniendo vehiculo con ID ${id}`);
    }   
}

export async function postVehiculo(req, res) {
    try {
        const nuevoVehiculo = await crearVehiculo(req.body);
        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        console.error('Error creando vehiculo', error);
        res.send('Error creando vehiculo');
    }
}

export async function putVehiculo(req, res) {
    const { id } = req.params;  
    try {
        const vehiculoActualizado = await actualizarVehiculo(id, req.body);
        res.json(vehiculoActualizado);
    } catch (error) {
        console.error('Error actualizando vehiculo', error);
        res.send('Error actualizando vehiculo');
    }
}

export async function deleteVehiculo(req, res) {
    const { id } = req.params;
    try {
        await eliminarVehiculo(id);
        res.send(`Vehiculo eliminado correctamente`);
    } catch (error) {
        console.error('Error eliminando vehiculo', error);
        res.send('Error eliminando vehiculo');
    }
}

export async function getVehiculosList(req, res) {
    try {
        const vehiculos = await listarVehiculos();
        res.json(vehiculos);
    } catch (error) {
        console.error('Error obteniendo lista de vehiculos', error);
        res.json({ message: 'Error obteniendo lista de vehiculos' });
    }
}