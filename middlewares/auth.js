const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token é obrigatório!" });
    }
    const [, token] = authHeader.split(" ");

    try {
        const senha = process.env.JWT_SECRET;
        await jwt.verify(token, senha);
        next();
    } catch (err) {
        return res.status(401).json({ mensagem: "Token é inválido!" });
    }
};

module.exports = auth;
