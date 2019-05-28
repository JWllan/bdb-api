const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        unique: true,
        required: true
    },
    launchedIn: {
        type: Date,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

BookSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;