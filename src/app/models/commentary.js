const mongoose = require('../../database');

const CommentarySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Commentary = mongoose.model('Commentary', CommentarySchema);

module.exports = Commentary;