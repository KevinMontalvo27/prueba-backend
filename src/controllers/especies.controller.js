import { obtenerEspecie, 
    obtenerEspecies, 
    obtenerListaEspecies, 
    crearEspecie, 
    actualizarEspecie, 
    eliminarEspecie } 
    from "../services/especies.service";

export async function getEspecies(req, res) {
    try {
        const especies = await obtenerEspecies();
        res.json(especies);
    } catch (error) {
        console.error('Error obteniendo especies', error);
        res.json({ message: 'Error obteniendo especies' });
    }
}

export async function getEspecie(req, res) {
    const { id } = req.params;
    try {
        const especie = await obtenerEspecie(id);
        res.json(especie);
    } catch (error) {
        console.error(`Error obteniendo especie con ID ${id}`, error);
        res.send(`Error obteniendo especie con ID ${id}`);
    }   
}

export async function getListaEspecies(req, res) {
    try {
        const especies = await obtenerListaEspecies();
    } catch (error) {
        console.error('Error obteniendo lista de especies', error);
        res.json({ message: 'Error obteniendo lista de especies' });
    }
}

export async function postEspecie(req, res) {
    try {
        const nuevaEspecie = await crearEspecie(req.body);
        res.status(201).json(nuevaEspecie);
    } catch (error) {
        console.error('Error creando especie', error);
        res.send('Error creando especie');
    }
}

export async function putEspecie(req, res) {
    const { id } = req.params;
    try {
        const especieActualizada = await actualizarEspecie(id, req.body);
        res.json(especieActualizada);
    } catch (error) {
        console.error('Error actualizando especie', error);
        res.send('Error actualizando especie');
    }
}

export async function deleteEspecie(req, res) {
    const { id } = req.params;
    try {
        await eliminarEspecie(id);
        res.send(`Especie eliminada correctamente`);
    } catch (error) {
        console.error('Error eliminando especie', error);
        res.send('Error eliminando especie');
    }
}

