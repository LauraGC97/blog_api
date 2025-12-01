import Post from '../models/post.model.js';

// 1. GET /api/posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.json(posts);
    } catch (error) {
        console.error('Error al obtener posts:', error);
        res.status(500).json({ error: 'Error al obtener los posts.' });
    }
};

// 2. GET /api/posts/:postId
export const getPostById = async (req, res) => {
    try {
        const post = await Post.getById(req.params.postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Post no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener post por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// 3. POST /api/posts
export const postPost = async (req, res) => {
    try {
        const { titulo, descripcion, fecha_creacion, categoria, fk_autor } = req.body;
        if (!titulo || !descripcion || !fecha_creacion || !categoria || !fk_autor) {
            return res.status(400).json({ error: 'Faltan campos obligatorios para el post.' });
        }
        const nuevoPost = await Post.create(req.body);
        res.status(201).json(nuevoPost);
    } catch (error) {
        console.error('Error detallado de MySQL:', error); 
        
        res.status(500).json({ 
            error: 'Error al crear el post.',
            mysql_error_detail: error.sqlMessage || error.message 
        });
    }
};

// 4. PUT /api/posts/:postId
export const putPost = async (req, res) => {
    try {
        const postActualizado = await Post.update(req.params.postId, req.body);
        if (postActualizado) {
            res.json(postActualizado);
        } else {
            res.status(404).json({ error: 'Post no encontrado para actualizar.' });
        }
    } catch (error) {
        console.error('Error al actualizar post:', error);
        res.status(500).json({ error: 'Error al actualizar el post.' });
    }
};

// 5. DELETE /api/posts/:postId
export const deletePost = async (req, res) => {
    try {
        const exito = await Post.delete(req.params.postId);
        if (exito) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Post no encontrado para eliminar.' });
        }
    } catch (error) {
        console.error('Error al eliminar post:', error);
        res.status(500).json({ error: 'Error al eliminar el post.' });
    }
};
    
// 6. RUTA ESPECIAL: buscar por autor.
export const getPostsByAutor = async (req, res) => {
    try {
        const posts = await Post.getByAutorId(req.params.autorId); 
        res.json(posts);
    } catch (error) {
        console.error('Error al obtener posts por autor:', error);
        res.status(500).json({ error: 'Error al obtener los posts del autor.' });
    }
};
