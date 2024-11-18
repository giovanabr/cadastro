const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Gerar token
const generateToken = (user) => {
    return jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Cadastro de usuário
const signup = async (req, res) => {
    console.log("Dados recebidos no cadastro:", req.body);
    
    const { username, email, password } = req.body;

    // Verificar se o usuário já existe
    const existingUser = userModel.findUserByUsername(username) || userModel.findUserByEmail(email);
    if (existingUser) {
        console.log("Usuário já existe:", existingUser);
        return res.status(400).json({ message: 'Usuário ou e-mail já existe.' });
    }

    try {
        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar o novo usuário
        const user = { username, email, password: hashedPassword };
        userModel.addUser(user);

        // Gerar token e enviar resposta
        const token = generateToken(user);
        res.status(201).json({ message: 'Usuário criado com sucesso!', token });
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};


// Login de usuário
const login = async (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário existe
    const user = userModel.findUserByUsername(username);
    if (!user) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Usuário ou senha inválidos.' });
    }

    // Retornar token
    const token = generateToken(user);
    res.status(200).json({ token });
};

// Listar todos os usuários
const getAllUsers = (req, res) => {
    res.json(userModel.getAllUsers());
};

module.exports = { signup, login, getAllUsers };
