const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');
const Article = require('../models/article');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('author articleId');
        res.render('comments/index', { comments: comments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET form to create a new comment
router.get('/new', async (req, res) => {
    const users = await User.find({});
    const articles = await Article.find({});
    res.render('comments/new', { comment: new Comment(), users: users, articles: articles });
});

// GET a single comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('author articleId');
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.render('comments/show', { comment: comment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        content: req.body.content,
        author: req.body.author,
        articleId: req.body.articleId,
        createdDate: req.body.createdDate
    });
    try {
        const newComment = await comment.save();
        res.redirect(`/comments/${newComment.id}`);
    } catch (err) {
        const users = await User.find({});
        const articles = await Article.find({});
        res.render('comments/new', { comment: comment, users: users, articles: articles, errorMessage: 'Error creating comment' });
    }
});

// GET form to edit a comment
router.get('/edit/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const users = await User.find({});
        const articles = await Article.find({});
        res.render('comments/edit', { comment: comment, users: users, articles: articles });
    } catch {
        res.redirect('/comments');
    }
});

// PATCH/PUT to update a comment
router.patch('/:id', async (req, res) => {
    let comment;
    try {
        comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        comment.content = req.body.content;
        comment.author = req.body.author;
        comment.articleId = req.body.articleId;
        comment.createdDate = req.body.createdDate;

        await comment.save();
        res.redirect(`/comments/${comment.id}`);
    } catch (err) {
        if (comment == null) {
            res.redirect('/');
        } else {
            const users = await User.find({});
            const articles = await Article.find({});
            res.render('comments/edit', { comment: comment, users: users, articles: articles, errorMessage: 'Error updating comment' });
        }
    }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        await comment.remove();
        res.redirect('/comments');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
