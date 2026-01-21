const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register', messages: req.flash() });
});

router.post('/register', [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/auth/register');
    }
    
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findByEmail(email);
        
        if (existingUser) {
            req.flash('error', 'Email already registered');
            return res.redirect('/auth/register');
        }
        
        await User.create(username, email, password);
        req.flash('success', 'Registration successful! Please login.');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', 'Registration failed');
        res.redirect('/auth/register');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login', messages: req.flash() });
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        
        if (!user) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('/auth/login');
        }
        
        const isMatch = await User.comparePassword(password, user.password);
        
        if (!isMatch) {
            req.flash('error', 'Invalid credentials');
            return res.redirect('/auth/login');
        }
        
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        req.flash('success', 'Login successful!');
        res.redirect('/admin/dashboard');
    } catch (error) {
        req.flash('error', 'Login failed');
        res.redirect('/auth/login');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'Logged out successfully');
    res.redirect('/');
});

module.exports = router;