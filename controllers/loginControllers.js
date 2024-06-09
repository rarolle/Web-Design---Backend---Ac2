const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
const express = require('express');
const UserModel = require('../models/user')
const loginControllers = express.Router()

loginControllers.post("/", async (req, res) =>{
    const { email, senha} = req.body;

    const user = await UserModel.findOne({email: email})
    if(!user){
        return res.status(404).json({mensagem: "user not found!"})
    }
    if(await bcrypt.compare(senha, user.senha)){

        const token = jwt.sign({
            id: user.id,
            nome: user.nome,
            email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '2d'}
        )
        return res.status(200).json({mensagem: `bem vindo ${user.nome}`, 
        token:token})
    }else{
        return res.status(401).json({mensagem: "email ou senha incorretas!"})
    }
})

module.exports = loginControllers;