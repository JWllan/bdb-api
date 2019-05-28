const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'No compatible token' });
    }

    const [sheme, token] = parts;

    if(!/^Bearer$/i.test(sheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token invalid' });
        }

        req.userId = decoded.id;
        return next();
    })
}