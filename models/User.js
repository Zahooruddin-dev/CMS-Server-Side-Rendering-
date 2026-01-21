const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async create(username, email, password, role = 'user') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
            [username, email, hashedPassword, role]
        );
        return result.rows[0];
    }
    
    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
    
    static async findById(id) {
        const result = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
    
    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = User;