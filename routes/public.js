const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll(10);
        res.render('public/home', { title: 'Home', posts, messages: req.flash() });
    } catch (error) {
        res.render('error', { title: 'Error', message: 'Error loading posts' });
    }
});

router.get('/post/:slug', async (req, res) => {
    try {
        const post = await Post.findBySlug(req.params.slug);
        if (!post) {
            return res.status(404).render('error', { title: 'Error', message: 'Post not found' });
        }
        res.render('public/post', { title: post.title, post, messages: req.flash() });
    } catch (error) {
        res.render('error', { title: 'Error', message: 'Error loading post' });
    }
});

router.get('/category/:slug', async (req, res) => {
    try {
        const category = await Category.findBySlug(req.params.slug);
        if (!category) {
            return res.status(404).render('error', { title: 'Error', message: 'Category not found' });
        }
        res.render('public/category', { title: category.name, category, messages: req.flash() });
    } catch (error) {
        res.render('error', { title: 'Error', message: 'Error loading category' });
    }
});

module.exports = router;