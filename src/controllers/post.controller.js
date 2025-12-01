import { PostModel } from "../models/post.model";
import logger from '../config/logger.js';

//GET - Obtener todos los posts con la información del autor
export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.getAllWhithAutor();
        res.status(200).json(posts);
    } catch (error) {
        logger.error('Error al obtener los posts: ', error);
        res.status(500).json({ message: 'Error interno al obtener los posts' });
    }
};

//GET - Obtener posts por ID de autor con la información del autor
export const getPostsByAutor = async (req, res) => {
    const autorId = req.params.autorId;

    if (isNaN(parseInt(autorId))) {
        return res.status(400).json({ message: 'ID de autor no válido.' });
    }
    try {
        const posts = await PostModel.getByAutorId(autorId);

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No se encontraron posts para el autor especificado.' });
        }
        res.status(200).json(posts);
    } catch (error) {
        logger.error(`Error al obtener los posts para el autor ID ${autorId}: `, error);
        res.status(500).json({ message: 'Error interno al obtener los posts del autor' });
    }
};

    //POST - Crear un nuevo post
export const createPost = async (req, res) => {
    const { titulo, descripcion, categoria, fk_autor } = req.body;

    if (!titulo || !fk_autor) {
        return res.status(400).json({ message: 'Faltan campos obligatorios para crear el post.' });
    }
    try {
        const id_post = await PostModel.create({ titulo, descripcion, categoria, fk_autor });
        
        res.status(201).json({ 
            message: 'Post creado con éxito', 
            id_post 
        });
    } catch (error) {
        logger.error('Error al crear post:', error.message);
        
        // Manejo de error específico si el autor no existe (Error de Foreign Key)
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'El ID de autor proporcionado no existe.' });
        }
        
        res.status(500).json({ message: 'Error interno del servidor al crear el post.' });
    }
};
