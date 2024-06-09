const bcrypt = require('bcryptjs');
const express = require('express');
const UserModel = require('../models/user');
const auth = require('../middlewares/auth');
const userController = express.Router();

userController.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        return res.status(200).json(users);
    } catch (err) {
        console.log(`Error while listing users: ${err}`);
        return res.status(500).json({ erro: err });
    }
};

userController.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, funcao } = req.body;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ mensagem: "User not found!" });
        }
        if (nome) user.nome = nome;
        if (email) user.email = email;
        if (senha) user.senha = await bcrypt.hash(senha, 10);
        if (funcao) user.funcao = funcao;
        await user.save();
        return res.status(200).json(user);
    } catch (err) {
        console.log(`Error while updating user: ${err}`);
        return res.status(500).json({ erro: err });
    }
};

userController.createUser = async (req, res) => {
    const { nome, email, senha, funcao } = req.body;
    const senhaEncrypt = await bcrypt.hash(senha, 10);
    const user = new UserModel({
        nome,
        email,
        senha: senhaEncrypt,
        funcao
    });

    try {
        await user.save();
        return res.status(201).json(user);
    } catch (err) {
        console.log(`Error while creating a new user: ${err}`);
        return res.status(500).json({ erro: err });
    }
};

userController.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ mensagem: "User not found!" });
        }
        return res.status(200).json({ mensagem: "User deleted successfully!" });
    } catch (err) {
        console.log(`Error while deleting user: ${err}`);
        return res.status(500).json({ erro: err });
    }
};

userController.countUsersByRole = async (req, res) => {
    try {
        const roles = ["Engenheiro de FE", "Engenheiro de BE", "Analista de dados", "Líder Técnico"];
        const counts = await Promise.all(roles.map(async (role) => {
            const count = await UserModel.countDocuments({ funcao: role });
            return { funcao: role, quantidade: count };
        }));

        return res.status(200).json(counts);
    } catch (err) {
        console.log(`Error while counting users by role: ${err}`);
        return res.status(500).json({ erro: err });
    }
};

module.exports = userController;
