import pool from '../config/db.js';

const QUERY_BASE_POSTS = `
    SELECT 
        p.id_post, 
        p.titulo, 
        p.descripcion, 
        p.fecha_creacion, 
        p.categoria, 
        p.fk_autor, 
        a.nombre as autor_nombre, 
        a.email as autor_email, 
        a.imagen as autor_imagen 
    FROM 
        post p 
    JOIN 
        autores a ON p.fk_autor = a.id_autor
`;

class Post {

    // 1. OBTENER TODOS LOS POSTS (GET /api/posts)
    static async getAll() {
        const [rows] = await pool.query(QUERY_BASE_POSTS);
        return rows;
    }

    // 2. OBTENER UN POST POR ID (GET /api/posts/:postId)
    static async getById(id) {
        const [rows] = await pool.query(QUERY_BASE_POSTS + ' WHERE p.id_post = ?', [id]);
        return rows[0];
    }
    
    // 3. OBTENER TODOS LOS POSTS DE UN AUTOR ESPECÍFICO (GET /api/autores/:autorId/posts)
    static async getByAutorId(autorId) { 
        const [rows] = await pool.query(QUERY_BASE_POSTS + ' WHERE p.fk_autor = ?', [autorId]);
        return rows;
    }

    // 4. CREAR UN NUEVO POST (POST /api/posts)
    static async create({ titulo, descripcion, fecha_creacion, categoria, fk_autor }) {
        // El INSERT es correcto
        const [result] = await pool.query(
            'INSERT INTO post (titulo, descripcion, fecha_creacion, categoria, fk_autor) VALUES (?, ?, ?, ?, ?)',
            [titulo, descripcion, fecha_creacion, categoria, fk_autor]
        );
        return this.getById(result.insertId); // Esto usa el SELECT corregido
    }
    
    // 5. ACTUALIZAR UN POST (PUT /api/posts/:postId)
    static async update(id, { titulo, descripcion, fecha_creacion, categoria, fk_autor }) {
        await pool.query(
            'UPDATE post SET titulo = ?, descripcion = ?, fecha_creacion = ?, categoria = ?, fk_autor = ? WHERE id_post = ?',
            [titulo, descripcion, fecha_creacion, categoria, fk_autor, id]
        );
        return this.getById(id); // Esto usa el SELECT corregido
    }

    // 6. ELIMINAR UN POST (DELETE /api/posts/:postId)
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM post WHERE id_post = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default Post;