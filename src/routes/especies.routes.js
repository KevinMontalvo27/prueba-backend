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
router.get('/lista', getListaEspecies);
router.get('/:id', getEspecie);
router.post('/', postEspecie);
router.put('/:id', putEspecie);
router.delete('/:id', deleteEspecie);

export default router;

