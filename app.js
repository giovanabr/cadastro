const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./src/routes/userRoutes');
dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Usar rotas de usuário
app.use('/api', userRoutes);

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Servir páginas de cadastro e login
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Servir página de listagem de usuários
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

