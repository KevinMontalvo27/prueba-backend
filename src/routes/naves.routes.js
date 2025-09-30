import express from 'express';
import { getNaves, 
    getNave, 
    getListaNaves,
    postNave,
    putNave,
    deleteNave }
    from '../controllers/naves.controller.js';

const router = express.Router();

router.get('/', getNaves);
router.get('/lista', getListaNaves);
router.get('/buscar', getListaNaves);
router.get('/:id', getNave);
router.post('/', postNave);
router.put('/:id', putNave);
router.delete('/:id', deleteNave);

export default router;