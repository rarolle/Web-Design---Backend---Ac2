require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const usersController = require('./controllers/usersController'); 
const loginControllers = require('./controllers/loginControllers.js')
const server = express();

const port = process.env.PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const DATABASE_URL = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@mrboombastic.u6tz43y.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=MrBoombastic`;
server.use(express.json());

server.use('/users', usersController); 
server.use('/login', loginControllers);

console.log("Tentando conectar ao MongoDB...");
console.log(`Usando string de conexão: ${DATABASE_URL}`);

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log("Banco de dados conectado com sucesso");

    server.listen(port, () => {
      console.log(`Servidor ouvindo na porta ${port}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });



