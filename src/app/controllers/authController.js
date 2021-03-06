const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400
    });
}

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    }
    catch (err) {
        return res.status(500).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email }).select('+password').populate({path: 'favorites', populate: {path:'book'}});
    
        if(!user) {
            return res.status(404).send({ error: 'User not found' });
        }
    
        if(!await bcrypt.compare(password, user.password)) {
            return res.status(401).send({ error: 'Invalid password' });
        }
    
        user.password = undefined;
    
        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    }
    catch (err) {
        return res.status(500).send({ error: 'Authentication failed' });
    }
})

module.exports = app => app.use('/auth', router);