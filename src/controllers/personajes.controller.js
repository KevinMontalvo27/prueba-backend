import { obtenerPersonaje, 
    obtenerPersonajes, 
    obtenerListaPersonajes, 
    crearPersonaje, 
    actualizarPersonaje, 
    eliminarPersonaje } 
    from "../services/personaje.service";

export async function getPersonajes(req, res) {
    try {
        const personajes = await obtenerPersonajes();
        res.json(personajes);
    } catch (error) {
        res.status(500).json({ message: error.message });
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