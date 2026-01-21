const pool = require('../config/db');

class Category {
    static async create(name, slug) {
        const result = await pool.query(
            'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
            [name, slug]
        );
        return result.rows[0];
    }
    
    static async findAll() {
        const result = await pool.query('SELECT * FROM categories ORDER BY name');
        return result.rows;
    }
    
    static async findBySlug(slug) {
        const result = await pool.query('SELECT * FROM categories WHERE slug = $1', [slug]);
        return result.rows[0];
    }
    
    static async delete(id) {
        await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    }
}

module.exports = Category;