
import Autor from '../models/autores.model.js';

// 1. GET /api/autores
export const getAutores = async (req, res) => {
    try {
        const autores = await Autor.getAll();
        res.json(autores);
    } catch (error) {
        console.error('Error al obtener autores:', error);
        res.status(500).json({ error: 'Error al obtener los autores.' });
    }
};

// 2. GET /api/autores/:autorId
export const getAutorById = async (req, res) => {
    try {
        const autor = await Autor.getById(req.params.autorId);
        if (autor) {
            res.json(autor);
        } else {
            res.status(404).json({ error: 'Autor no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener autor por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// 3. POST /api/autores
export const postAutor = async (req, res) => {
    try {
        const { nombre, email, imagen } = req.body;
        if (!nombre || !email || !imagen) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, email, imagen.' });
        }
        const nuevoAutor = await Autor.create(req.body); 
        res.status(201).json(nuevoAutor);
    } catch (error) {
        console.error('Error al crear autor:', error);
        res.status(500).json({ error: 'Error al crear el autor.' });
    }
};

// 4. PUT /api/autores/:autorId
export const putAutor = async (req, res) => {
    try {
        const autorActualizado = await Autor.update(req.params.autorId, req.body);
        if (autorActualizado) {
            res.json(autorActualizado);
        } else {
            res.status(404).json({ error: 'Autor no encontrado para actualizar.' });
        }
    } catch (error) {
        console.error('Error al actualizar autor:', error);
        res.status(500).json({ error: 'Error al actualizar el autor.' });
    }
};

// 5. DELETE /api/autores/:autorId
export const deleteAutor = async (req, res) => {
    try {
        const exito = await Autor.delete(req.params.autorId);
        if (exito) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Autor no encontrado para eliminar.' });
        }
    } catch (error) {
        console.error('Error al eliminar autor:', error);
        res.status(500).json({ error: 'Error al eliminar el autor.' });
    }
};