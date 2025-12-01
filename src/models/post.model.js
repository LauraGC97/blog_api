import pool from '../config/db.js';

export class PostModel {

    static tableName = 'post';
//Obtener todos los posts con la información del autor
    static async getAllWhithAutor() {
        try {
            const query = `
            SELECT 
                    p.id_post, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
                    a.id_autor AS autor_id, a.nombre AS autor_nombre, a.email AS autor_email, a.imagen AS autor_imagen
                FROM 
                    ${this.tableName} p 
                INNER JOIN 
                    autores a ON p.fk_autor = a.id_autor
                ORDER BY p.fecha_creacion DESC
            `;
            const [rows] = await pool.query(query); 
            return rows;
        } catch (error) {
            throw error;
        }
    }
//Obtener posts por ID de autor con la información del autor
    static async getByAutorId(autorId) {
        try {
            const query = `
                SELECT 
                    p.id_post, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
                    a.nombre AS autor_nombre, a.email AS autor_email
                FROM 
                    ${this.tableName} p 
                INNER JOIN 
                    autores a ON p.fk_autor = a.id_autor
                WHERE 
                    p.fk_autor = ?
                ORDER BY p.fecha_creacion DESC
            `;
            
            const [rows] = await pool.query(query, [autorId]); 
            return rows;
        } catch (error) {
            throw error;
        }
    }
//Crear un nuevo post
    static async create({ titulo, descripcion, categoria, fk_autor }) {
        try {
            const fecha_creacion = new Date().toISOString().slice(0, 10); 
            
            const query = `
                INSERT INTO ${this.tableName} (titulo, descripcion, fecha_creacion, categoria, fk_autor) 
                VALUES (?, ?, ?, ?, ?)
            `;
            const values = [titulo, descripcion, fecha_creacion, categoria, fk_autor];
            
            const [result] = await pool.query(query, values);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
}