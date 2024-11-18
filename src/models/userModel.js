// Array em memória para armazenar os usuários
const users = [];

// Adicionar um novo usuário
const addUser = (user) => {
    users.push(user);
    return user;
};

// Buscar usuário por nome de usuário
const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
};

// Buscar usuário por e-mail
const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

// Listar todos os usuários
const getAllUsers = () => {
    return users.map(user => ({ username: user.username, email: user.email }));
};

module.exports = {
    addUser,
    findUserByUsername,
    findUserByEmail,
    getAllUsers,
};
