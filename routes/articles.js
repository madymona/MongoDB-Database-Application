const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const User = require('../models/user');

// GET all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find({}).populate('author');
        res.render('articles/index', { articles: articles });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET form to create a new article
router.get('/new', async (req, res) => {
    const users = await User.find({});
    res.render('articles/new', { article: new Article(), users: users });
});

// GET a single article
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author');
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.render('articles/show', { article: article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new article
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishedDate: req.body.publishedDate
    });
    try {
        const newArticle = await article.save();
        res.redirect(`/articles/${newArticle.id}`);
    } catch (err) {
        const users = await User.find({});
        res.render('articles/new', { article: article, users: users, errorMessage: 'Error creating article' });
    }
});

// GET form to edit an article
router.get('/edit/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        const users = await User.find({});
        res.render('articles/edit', { article: article, users: users });
    } catch {
        res.redirect('/articles');
    }
});

// PATCH/PUT to update an article
router.patch('/:id', async (req, res) => {
    let article;
    try {
        article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        article.title = req.body.title;
        article.content = req.body.content;
        article.author = req.body.author;
        article.publishedDate = req.body.publishedDate;

        await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (err) {
        if (article == null) {
            res.redirect('/');
        } else {
            const users = await User.find({});
            res.render('articles/edit', { article: article, users: users, errorMessage: 'Error updating article' });
        }
    }
});

// DELETE an article
router.delete('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        await article.remove();
        res.redirect('/articles');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
