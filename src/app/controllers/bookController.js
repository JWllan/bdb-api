const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Book = require('../models/book');
const Vote = require('../models/vote');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();

        return res.send({ books });
    }
    catch {
        return res.status(400).send({ error: 'Error loading books' });
    }
});

router.get('/:id', async (req, res) => {
    res.send({ user: req.userId });
});

router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);

        return res.send({ book });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error creating new book' });
    }
});

router.put('/:id', async (req, res) => {
    res.send({ user: req.userId });
});

router.delete('/:id', async (req, res) => {
    res.send({ user: req.userId });
});

module.exports = app => app.use('/book', router);