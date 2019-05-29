const mongoose = require('../../database');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    launchedIn: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentary'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;