const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Vote = require('../models/vote');
const Book = require('../models/book');
const User = require('../models/user');

const router = express.Router();
router.use(authMiddleware);

router.post('/:id', async (req, res) => {
    try {
        const { value } = req.body;

        if (await Vote.findOne({ book: req.params.id, user: req.userId })) {
            return res.status(400).send({ error: 'Already voted' });
        }

        if (value < 1 || value > 5) {
            return res.status(400).send({ error: 'Value is not between 0 and 5' });
        }

        const vote = await Vote.create({ value, book: req.params.id, user: req.userId });

        const book = await Book.findById(req.params.id).populate('votes');
        book.votes.push(vote);
        await book.save();
        
        const user = await User.findById(req.userId).select('password').populate('votes');
        user.votes.push(vote);
        await user.save();

        return res.send({ vote });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error voting' + err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { value } = req.body;

        if (value < 1 || value > 5) {
            return res.status(400).send({ error: 'Value is not between 0 and 5' });
        }

        const vote = await Vote.findByIdAndUpdate(req.params.id, { value }, { new: true });

        return res.send({ vote });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error voting' });
    }
});

module.exports = app => app.use('/vote', router);