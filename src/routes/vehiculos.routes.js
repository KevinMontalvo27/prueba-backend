import express from 'express';
import { getVehiculos,
    getVehiculo,
    getListaVehiculos,
    postVehiculo,
    putVehiculo,
    deleteVehiculo} 
    from '../controllers/vehiculos.controller.js';

const router = express.Router();

router.get('/', getVehiculos);
router.get('/lista', getListaVehiculos);
router.get('/:id', getVehiculo);
router.post('/', postVehiculo);
router.put('/:id', putVehiculo);
router.delete('/:id', deleteVehiculo);


export default router;