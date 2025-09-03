import { crearPelicula, 
    obtenerPelicula, 
    obtenerPeliculas, 
    eliminarPelicula, 
    actualizarPelicula, 
    listarPeliculas} from "../services/peliculas.service"; 


export async function getPeliculas(req, res){
    try{
        const peliculas = await obtenerPeliculas(req.body);
        res.json(peliculas);
    } catch(error){
        console.error('Error obteniendo peliculas', error);
        res.json({message: 'Error obteniendo peliculas'});
    }       
}

export async function getPelicula(req, res){
    const { id } = req.params.id;
    try{
        const pelicula = await obtenerPelicula(id);
        res.json(pelicula);     
    }
    catch(error){
        console.error(`Error obteniendo pelicula con ID ${id}`, error);
        res.send(`Error obteniendo pelicula con ID ${id}`);
    }
}

export async function postPelicula(req, res){
    try{
        const nuevaPelicula = await crearPelicula(req.body);
        res.status(201).json(nuevaPelicula);
    } catch(error){
        console.error('Error creando pelicula', error);
        res.send('Error creando pelicula');
    }
}

export async function putPelicula(req, res){
    try{
        const { id } = req.params.id;
        const peliculaActualizada = await actualizarPelicula(id, req.body);
        res.json(peliculaActualizada);
    }catch(error){
        console.error('Error actualizando pelicula', error);
    }
}

export async function deletePelicula(req, res){
    try{
        const { id } = req.params.id;
        await eliminarPelicula(id);
        res.send(`Pelicula eliminada correctamente`);
    }catch(error){
        console.error('Error eliminando pelicula', error);
    }
}

export async function getListaPeliculas(req, res){
    try{
        const peliculas = await listarPeliculas();
        res.json(peliculas);
    } catch(error){
        console.error('Error obteniendo lista de peliculas', error);
        res.json({message: 'Error obteniendo lista de peliculas'});
    }   
}
