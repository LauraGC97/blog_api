// src/app.js

import express from 'express';
import cors from 'cors';
import logger from './config/logger.js';

// 1. Importamos las rutas específicas para la API del Blog
import apiRoutes from './routes/api.routes.js';

const app = express();

// --- 1. CONFIGURACIÓN DE MIDDLEWARE ---

// Configuración CORS Avanzada
app.use(cors({
    origin: (origin, callback) => {
        // Permite solicitudes sin 'origin' (como apps móviles o cURL)
        callback(null, true);
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// --- 2. MANEJO DE PREFLIGHT (OPTIONS) ---

// Definimos una función simple para manejar las peticiones OPTIONS
function handleOptions(req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400'); // Cachea la respuesta OPTIONS por 24 horas
    return res.status(200).end();
}

// Aplicamos el handler de OPTIONS a las rutas principales de tu API
app.options('/api/autores', handleOptions);
app.options('/api/posts', handleOptions);
app.options('/api', handleOptions);


// --- 3. MONTAJE DE RUTAS ---

app.use('/api', apiRoutes);


// --- 4. MANEJADORES DE ERRORES ---

// 404 Handler (Rutas no definidas)
app.use((req, res, next) => {
    logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        message: "Not Found: La URL solicitada no existe en esta API."
    });
});

// Error Handler general (Captura cualquier error lanzado con next(err))
app.use((err, req, res, next) => {
    // Solo mostramos el stack en desarrollo
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }
    logger.error('Error interno del servidor:', err.message);
    
    // El estado 500 es genérico, podrías usar 400 para errores de validación, etc.
    res.status(err.status || 500).json({ 
        message: err.message || "Error interno del servidor"
    });
});


export default app;