const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const authController = {};

authController.login = async (req, res) => {
    const { email, senha } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ mensagem: "User not found!" });
    }
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token: token });
}

authController.register = async (req, res) => {
    const { nome, email, senha } = req.body;
    const senhaEncrypt = await bcrypt.hash(senha, 10);
    const user = new UserModel({
        nome,
        email,
        senha: senhaEncrypt
    });

    try {
        await user.save();
        return res.status(201).json(user);
    } catch (err) {
        console.log(`error while creating a new user ${err}`);
        return res.status(500).json({ erro: err });
    }
}

module.exports = authController;
