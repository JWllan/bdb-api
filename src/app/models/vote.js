const mongoose = require('../../database');

const VoteSchema = new mongoose.Schema({
    value: {
        type: Number,
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

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;