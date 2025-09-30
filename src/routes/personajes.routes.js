import express from 'express';
import { getPersonajes, 
    getPersonaje, 
    getListaPersonajes,
    postPersonaje, 
    putPersonaje, 
    deletePersonaje } 
    from '../controllers/personajes.controller.js';

const router = express.Router();

router.get('/', getPersonajes);
router.get('/lista', getListaPersonajes);
router.get('/:id', getPersonaje);
router.post('/', postPersonaje);
router.put('/:id', putPersonaje);
router.delete('/:id', deletePersonaje);

export default router;