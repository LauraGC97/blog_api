import pool from '../config/db.js';


class Autor {
    
    // 1. OBTENER TODOS LOS AUTORES (GET /api/autores)
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM autores'); 
        return rows;
    }

    // 2. OBTENER UN AUTOR POR ID (GET /api/autores/:autorId)
    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM autores WHERE id_autor = ?', [id]);
        return rows[0];
    }

    // 3. CREAR UN NUEVO AUTOR (POST /api/autores)
    static async create({ nombre, email, imagen }) {
        const [result] = await pool.query(
            'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
            [nombre, email, imagen]
        );
        return this.getById(result.insertId);
    }

    // 4. ACTUALIZAR UN AUTOR (PUT /api/autores/:autorId)
    static async update(id, { nombre, email, imagen }) {
        await pool.query(
            'UPDATE autores SET nombre = ?, email = ?, imagen = ? WHERE id_autor = ?',
            [nombre, email, imagen, id]
        );
        return this.getById(id);
    }

    // 5. ELIMINAR UN AUTOR (DELETE /api/autores/:autorId)
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM autores WHERE id_autor = ?', [id]);
        return result.affectedRows > 0;
    }
}


export default Autor;