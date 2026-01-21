const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Post = require('../models/Post');
const Category = require('../models/Category');

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/dashboard', async (req, res) => {
    try {
        const posts = await Post.findAll(5);
        res.render('admin/dashboard', { title: 'Dashboard', posts, user: req.user, messages: req.flash() });
    } catch (error) {
        console.error('Dashboard error:', error);
        req.flash('error', 'Error loading dashboard');
        res.redirect('/');
    }
});

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll(50);
        res.render('admin/posts', { title: 'Manage Posts', posts, user: req.user, messages: req.flash() });
    } catch (error) {
        console.error('Posts error:', error);
        req.flash('error', 'Error loading posts');
        res.redirect('/admin/dashboard');
    }
});

router.get('/posts/new', (req, res) => {
    res.render('admin/post-form', { title: 'New Post', post: null, user: req.user, messages: req.flash() });
});

router.post('/posts/create', async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        await Post.create(title, slug, content, req.user.id, status);
        req.flash('success', 'Post created successfully');
        res.redirect('/admin/posts');
    } catch (error) {
        console.error('Create post error:', error);
        req.flash('error', 'Error creating post');
        res.redirect('/admin/posts/new');
    }
});

router.get('/posts/edit/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('admin/post-form', { title: 'Edit Post', post, user: req.user, messages: req.flash() });
    } catch (error) {
        console.error('Edit post error:', error);
        req.flash('error', 'Error loading post');
        res.redirect('/admin/posts');
    }
});

router.post('/posts/update/:id', async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        await Post.update(req.params.id, title, slug, content, status);
        req.flash('success', 'Post updated successfully');
        res.redirect('/admin/posts');
    } catch (error) {
        console.error('Update post error:', error);
        req.flash('error', 'Error updating post');
        res.redirect('/admin/posts');
    }
});

router.post('/posts/delete/:id', async (req, res) => {
    try {
        await Post.delete(req.params.id);
        req.flash('success', 'Post deleted successfully');
        res.redirect('/admin/posts');
    } catch (error) {
        console.error('Delete post error:', error);
        req.flash('error', 'Error deleting post');
        res.redirect('/admin/posts');
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/categories', { title: 'Categories', categories, user: req.user, messages: req.flash() });
    } catch (error) {
        console.error('Categories error:', error);
        req.flash('error', 'Error loading categories');
        res.redirect('/admin/dashboard');
    }
});

router.post('/categories/create', async (req, res) => {
    try {
        const { name } = req.body;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        await Category.create(name, slug);
        req.flash('success', 'Category created successfully');
        res.redirect('/admin/categories');
    } catch (error) {
        console.error('Create category error:', error);
        req.flash('error', 'Error creating category');
        res.redirect('/admin/categories');
    }
});

router.post('/categories/delete/:id', async (req, res) => {
    try {
        await Category.delete(req.params.id);
        req.flash('success', 'Category deleted successfully');
        res.redirect('/admin/categories');
    } catch (error) {
        console.error('Delete category error:', error);
        req.flash('error', 'Error deleting category');
        res.redirect('/admin/categories');
    }
});

module.exports = router;