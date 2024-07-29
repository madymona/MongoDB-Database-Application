const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users/index', { users: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET form to create a new user
router.get('/new', async (req, res) => {
    res.render('users/new', { user: new User() });
});

// GET a single user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.render('users/show', { user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const newUser = await user.save();
        res.redirect(`/users/${newUser.id}`);
    } catch (err) {
        res.render('users/new', { user: user, errorMessage: 'Error creating user' });
    }
});

// GET form to edit a user
router.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('users/edit', { user: user });
    } catch {
        res.redirect('/users');
    }
});

// PATCH/PUT to update a user
router.patch('/:id', async (req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        await user.save();
        res.redirect(`/users/${user.id}`);
    } catch (err) {
        if (user == null) {
            res.redirect('/');
        } else {
            res.render('users/edit', { user: user, errorMessage: 'Error updating user' });
        }
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.remove();
        res.redirect('/users');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
