import express from 'express';
import { getPlanetas, 
    getPlaneta, 
    getListaPlanetas, 
    postPlaneta, 
    putPlaneta, 
    deletePlaneta} 
    from '../controllers/planetas.controller';

const router = express.Router();

router.get('/', getPlanetas);
router.get('/planetas', getListaPlanetas);
router.get('/planetas/:id', getPlaneta);
router.post('/planetas', postPlaneta);
router.put('/planetas/:id', putPlaneta);
router.delete('/planetas/:id', deletePlaneta);