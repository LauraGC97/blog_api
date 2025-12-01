import express from 'express';
import cors from 'cors';
// Asegúrate de importar el router principal
import apiRoutes from './routes/api.routes.js';
// Asumo que tienes un archivo logger
import logger from './config/logger.js';
import postsRouter from './routes/post.routes.js';
import autoresRouter from './routes/autores.routes.js';
import { getPostsByAutor } from './controllers/post.controller.js';

const app = express();

// --- 1. CONFIGURACIÓN DE MIDDLEWARE ---

// Permite peticiones de otros orígenes
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());


// --- 2. MONTAJE DE RUTAS ---

// Monta el router principal bajo el prefijo /api
//app.use('/api', apiRoutes);
app.use('/api/posts', postsRouter);
app.use('/api/autores', autoresRouter);
app.get('/api/autores/:autorId/posts', getPostsByAutor);


// --- 3. MANEJADORES DE ERRORES ---

// 404 Handler (Rutas no definidas)
app.use((req, res, next) => {
    logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        message: "Not Found: La URL solicitada no existe en esta API."
    });
});

// Error Handler general
app.use((err, req, res, next) => {
    logger.error('Error interno del servidor:', err.message);
    
    res.status(500).json({ 
        message: "Error interno del servidor",
        error: err.message
    });
});


export default app;