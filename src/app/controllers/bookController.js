const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Book = require('../models/book');

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate(['votes', 'comments', 'favorites']);

        // books.forEach(book => {
        //     if (book.votes.length > 0) {
        //         book.voteAvg = book.votes.reduce((a, b) => { return a.value + b.value; }) / book.votes.length;
        //         book.votes = book.votes.filter(vote => { vote.user = req.userId });
        //     }
        //     if (book.comments.length > 0) {
        //         book.commentsCount = book.comments.length;
        //         book.comments = book.comments.filter(comment => { comment.user = req.userId });
        //     }
        //     if (book.favorites.length > 0) {
        //         book.favoritesCount = book.favorites.length;
        //         book.favorites = book.favorites.filter(favorite => { favorite.user = req.userId });
        //     }
        // });

        return res.send({ books });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error loading books'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate(['votes', 'comments', 'favorites']);

        // if (book.votes.length > 0) {
        //     book.voteAvg = book.votes.reduce((a, b) => { return a.value + b.value; }) / book.votes.length;
        //     book.votes = book.votes.filter(vote => { vote.user = req.userId });
        // }
        // if (book.comments.length > 0) {
        //     book.commentsCount = book.comments.length;
        //     book.comments = book.comments.filter(comment => { comment.user = req.userId });
        // }
        // if (book.favorites.length > 0) {
        //     book.favoritesCount = book.favorites.length;
        //     book.favorites = book.favorites.filter(favorite => { favorite.user = req.userId });
        // }

        return res.send({ book });
    }
    catch {
        return res.status(400).send({ error: 'Error loading book' });
    }
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
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.send({ book });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error creating new book' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.id);

        return res.send({ });
    }
    catch {
        return res.status(400).send({ error: 'Error deleting book' });
    }
});

module.exports = app => app.use('/book', router);