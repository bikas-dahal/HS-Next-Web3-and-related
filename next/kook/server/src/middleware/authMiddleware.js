import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    const token = authHeader.split(' ')[1];
    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return res.status(401).json({
                message: 'Unauthorized',
            });
    });
};
