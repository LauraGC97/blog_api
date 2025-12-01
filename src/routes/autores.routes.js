import { Router } from 'express';
import { 
    getAutores, 
    postAutor, 
    getAutorById, 
    putAutor, 
    deleteAutor 
} from '../controllers/autores.controller.js';

const autoresRouter = Router();

// Rutas base: GET y POST /api/autores
autoresRouter.get('/', getAutores);   
autoresRouter.post('/', postAutor);

// Rutas con ID: GET, PUT y DELETE /api/autores/:autorId
autoresRouter.get('/:autorId', getAutorById);
autoresRouter.put('/:autorId', putAutor);
autoresRouter.delete('/:autorId', deleteAutor);

export default autoresRouter;