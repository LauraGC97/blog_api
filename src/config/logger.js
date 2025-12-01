// src/config/logger.js

// Función para obtener la marca de tiempo en formato ISO
const getTimestamp = () => new Date().toISOString();

const logger = {
    /**
     * Registra mensajes informativos.
     * @param {string} message
     */
    info: (message) => {
        console.log(`[INFO] ${getTimestamp()} - ${message}`);
    },
    
    /**
     * Registra advertencias.
     * @param {string} message
     */
    warn: (message) => {
        console.warn(`[WARN] ${getTimestamp()} - ${message}`);
    },
    
    /**
     * Registra errores.
     * @param {string} message
     * @param {Error} [error] 
     */
    error: (message, error) => {
       
        console.error(`[ERROR] ${getTimestamp()} - ${message}`);
        if (error) {
            console.error(error); 
        }
    }
};


export default logger;