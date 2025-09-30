import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/setup/dbconnection.js';
import routes from './src/routes/index.js';
import cors from 'cors';

dotenv.config();


const app = express();

const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);



app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        message: `La ruta ${req.originalUrl} no existe`,
        availableEndpoints: [
            '/api/especies',
            '/api/naves', 
            '/api/peliculas',
            '/api/planetas',
            '/api/vehiculos'
        ]
    });
});

app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
