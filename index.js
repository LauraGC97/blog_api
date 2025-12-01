import http from 'node:http';
import app from './src/app.js';
import pool from './src/config/db.js';
import logger from './src/config/logger.js';


const PORT = process.env.PORT || 3001;

const server = http.createServer(app);


server.listen(PORT, async () => {
    logger.info(`Server listening on port ${PORT}`);

    try {
        const connection = await pool.getConnection();
        logger.info('Conexión a la base de datos MySQL exitosa!');
        connection.release();
    } catch (error) {
        logger.error('Error conectando a la base de datos:', error.message);
    }
});
server.on("error", (error) => {
    if (error.code === 'EADDRINUSE') {
        logger.error(`Puerto ${PORT} en uso.`);
    } else {
        logger.error('Server error:', error);
    }
});