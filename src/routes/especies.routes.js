import express from 'express';

import { getEspecies, 
    getEspecie, 
    getListaEspecies, 
    postEspecie, 
    putEspecie, 
    deleteEspecie } 
    from '../controllers/especies.controller.js';

const router = express.Router();


router.get('/', getEspecies);
router.get('/especies', getListaEspecies);
router.get('/especies/:id', getEspecie);
router.post('/especies', postEspecie);
router.put('/especies/:id', putEspecie);
router.delete('/especies/:id', deleteEspecie);

export default router;

