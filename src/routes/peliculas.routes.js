import express from 'express';

import {getPeliculas, 
    getPelicula, 
    getListaPeliculas,
    postPelicula,
    putPelicula,
    deletePelicula }
    from '../controllers/peliculas.controller.js';

const router = express.Router();

router.get('/', getPeliculas);
router.get('/peliculas', getListaPeliculas);    
router.get('/peliculas/:id', getPelicula);
router.post('/peliculas', postPelicula);
router.put('/peliculas/:id', putPelicula);
router.delete('/peliculas/:id', deletePelicula);

export default router;