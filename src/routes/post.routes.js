import { Router } from 'express';
// Importación de funciones individuales (excluyendo la ruta especial)
import { 
    getPosts, 
    postPost, 
    getPostById, 
    putPost, 
    deletePost
} from '../controllers/post.controller.js';

const postRouter = Router();

// Rutas base: GET y POST /api/posts
postRouter.get('/', getPosts);
postRouter.post('/', postPost);

// Rutas con ID: GET, PUT y DELETE /api/posts/:postId
postRouter.get('/:postId', getPostById);
postRouter.put('/:postId', putPost);
postRouter.delete('/:postId', deletePost);

// Nota: La ruta especial GET /api/autores/:autorId/posts se define en app.js

export default postRouter;