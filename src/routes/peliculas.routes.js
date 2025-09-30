    import express from 'express';
    import {getPeliculas, 
        getPelicula, 
        getListaPeliculas,
        postPelicula,
        putPelicula,
        deletePelicula,}
        from '../controllers/peliculas.controller.js';

    const router = express.Router();

    router.get('/', getPeliculas);
    router.get('/lista', getListaPeliculas);    
    router.get('/:id', getPelicula);
    router.post('/', postPelicula);
    router.put('/:id', putPelicula);
    router.delete('/:id', deletePelicula);

    export default router;