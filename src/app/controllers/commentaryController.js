const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Commentary = require('../models/commentary');
const Book = require('../models/book');

const router = express.Router();
router.use(authMiddleware);

router.post('/:id', async (req, res) => {
    try {
        const { text } = req.body;

        const commentary = await Commentary.create({ text, book: req.params.id, user: req.userId });

        const book = await Book.findById(req.params.id).populate('comments');

        book.comments.push(commentary);
        await book.save();

        return res.send({ commentary });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error creating a comment' });
    }
});

module.exports = app => app.use('/commentary', router);