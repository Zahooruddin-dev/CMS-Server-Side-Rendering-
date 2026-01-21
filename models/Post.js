const pool = require('../config/db');

class Post {
    static async create(title, slug, content, authorId, status = 'draft') {
        const result = await pool.query(
            'INSERT INTO posts (title, slug, content, author_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, slug, content, authorId, status]
        );
        return result.rows[0];
    }
    
    static async findAll(limit = 10, offset = 0) {
        const result = await pool.query(
            'SELECT p.*, u.username as author FROM posts p LEFT JOIN users u ON p.author_id = u.id ORDER BY p.created_at DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        return result.rows;
    }
    
    static async findBySlug(slug) {
        const result = await pool.query(
            'SELECT p.*, u.username as author FROM posts p LEFT JOIN users u ON p.author_id = u.id WHERE p.slug = $1',
            [slug]
        );
        return result.rows[0];
    }
    
    static async findById(id) {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0];
    }
    
    static async update(id, title, slug, content, status) {
        const result = await pool.query(
            'UPDATE posts SET title = $1, slug = $2, content = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [title, slug, content, status, id]
        );
        return result.rows[0];
    }
    
    static async delete(id) {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    }
}

module.exports = Post;