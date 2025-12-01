import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes.js';
import logger from './config/logger.js';
import postsRouter from './routes/post.routes.js';
import autoresRouter from './routes/autores.routes.js';
import { getPostsByAutor } from './controllers/post.controller.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postsRouter);
app.use('/api/autores', autoresRouter);

app.use((req, res, next) => {
    logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        message: "Not Found: La URL solicitada no existe en esta API."
    });
});

app.use((err, req, res, next) => {
    logger.error('Error interno del servidor:', err.message);
    
    res.status(500).json({ 
        message: "Error interno del servidor",
        error: err.message
    });
});


export default app;