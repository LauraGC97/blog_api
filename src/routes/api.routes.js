import { Router } from 'express';
import pool from '../config/db.js';

import apiAutoresRouter from './autores.routes.js';
import apiPostRouter from './post.routes.js';

const router = Router();

// Endpoint de estado
router.get('/status', async (req, res) => {


    let dbStatus = 'UNKNOWN';

    try {
        const connection = await pool.getConnection();
        await connection.ping();
        dbStatus = 'OK';
        connection.release();
    } catch (error) {
        dbStatus = 'ERROR';
    }

    res.json({
        service: 'blog_api',
        status: 'OK',
        database: dbStatus,
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        uptime: process.uptime().toFixed(0) + 's',
    });
});

router.use('/autores', apiAutoresRouter);
router.use('/posts', apiPostRouter);

export default router;