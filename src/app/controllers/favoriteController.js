const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Favorite = require('../models/favorite');
const Book = require('../models/book');
const User = require('../models/user');

const router = express.Router();
router.use(authMiddleware);

router.post('/:id', async (req, res) => {
    try {
        if (await Favorite.findOne({ book: req.params.id, user: req.userId })) {
            return res.status(400).send({ error: 'Already favorited' });
        }

        const favorite = await Favorite.create({ book: req.params.id, user: req.userId });

        const book = await Book.findById(req.params.id).populate('favorites');
        book.favorites.push(favorite);
        await book.save();
        
        const user = await User.findById(req.userId).select('password').populate('favorites');
        user.favorites.push(favorite);
        await user.save();

        return res.send({ favorite });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error favoriting' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Favorite.findByIdAndRemove(req.params.id);

        return res.send({ });
    }
    catch (err) {
        return res.status(400).send({ error: 'Error unfavoriting' });
    }
});

module.exports = app => app.use('/favorite', router);