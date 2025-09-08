import express from 'express';
import { getVehiculos,
    getVehiculo,
    getListaVehiculos,
    postVehiculo,
    putVehiculo,
    deleteVehiculo} 
    from '../controllers/vehiculos.controller';

const router = express.Router();

router.get('/', getVehiculos);
router.get('/vehiculos', getListaVehiculos);
router.get('/vehiculos/:id', getVehiculo);
router.post('/vehiculos', postVehiculo);
router.put('/vehiculos/:id', putVehiculo);
router.delete('/vehiculos/:id', deleteVehiculo);