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
router.get('/naves', getListaNaves);
router.get('/naves/:id', getNave);
router.post('/naves', postNave);
router.put('/naves/:id', putNave);
router.delete('/naves/:id', deleteNave);

export default router;