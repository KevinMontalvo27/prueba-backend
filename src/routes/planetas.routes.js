import express from 'express';
import { getPlanetas, 
    getPlaneta, 
    getListaPlanetas, 
    postPlaneta, 
    putPlaneta, 
    deletePlaneta,}   
    from '../controllers/planetas.controller.js';

const router = express.Router();

router.get('/', getPlanetas);
router.get('/lista', getListaPlanetas);
router.get('/:id', getPlaneta);
router.post('/', postPlaneta);
router.put('/:id', putPlaneta);
router.delete('/:id', deletePlaneta);

export default router;