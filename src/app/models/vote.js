const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

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

VoteSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;