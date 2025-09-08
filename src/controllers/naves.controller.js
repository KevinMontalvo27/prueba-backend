import { obtenerNave, obtenerNaves, crearNave, actualizarNave, eliminarNave, listarNaves } from '../services/naves.service.js';

export async function getNaves(req, res) {
    try {
        const naves = await obtenerNaves();
        res.json(naves);
    } catch (error) {
        console.error('Error obteniendo naves', error);
        res.json({ message: 'Error obteniendo naves' });
    }
}

export async function getNave(req, res) {
    const { id } = req.params;
    try {
        const nave = await obtenerNave(id);
        res.json(nave);
    } catch (error) {
        console.error(`Error obteniendo nave con ID ${id}`, error);
        res.send(`Error obteniendo nave con ID ${id}`);
    }
}

export async function postNave(req, res) {
    try {
        const nuevaNave = await crearNave(req.body);
        res.status(201).json(nuevaNave);
    } catch (error) {
        console.error('Error creando nave', error);
        res.send('Error creando nave');
    }
}

export async function putNave(req, res) {
    const { id } = req.params;
    try {
        const naveActualizada = await actualizarNave(id, req.body);
        res.json(naveActualizada);
    } catch (error) {
        console.error('Error actualizando nave', error);
        res.send('Error actualizando nave');
    }   
}

export async function deleteNave(req, res) {
    const { id } = req.params;
    try {
        await eliminarNave(id);
        res.send(`Nave eliminada correctamente`);
    } catch (error) {
        console.error('Error eliminando nave', error);
        res.send('Error eliminando nave');
    }
}

export async function getListaNaves(req, res) {
    try {
        const naves = await listarNaves();
        res.json(naves);
    } catch (error) {
        console.error('Error obteniendo lista de naves', error);
        res.json({ message: 'Error obteniendo lista de naves' });
    }
}