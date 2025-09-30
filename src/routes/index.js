    import express from 'express';
    import especiesRoutes from './especies.routes.js';
    import navesRoutes from './naves.routes.js';
    import personajesRoutes from './personajes.routes.js';
    import peliculasRoutes from './peliculas.routes.js';
    import planetasRoutes from './planetas.routes.js';
    import vehiculosRoutes from './vehiculos.routes.js';

    const router = express.Router();

    router.use('/especies', especiesRoutes);
    router.use('/naves', navesRoutes);
    router.use('/personajes', personajesRoutes);
    router.use('/peliculas', peliculasRoutes);
    router.use('/planetas', planetasRoutes);
    router.use('/vehiculos', vehiculosRoutes);

    router.get('/health', (req, res) => {
        res.json({ status: 'OK' });
    });


export default router;

