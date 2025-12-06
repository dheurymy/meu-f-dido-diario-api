const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Gerar token JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Cadastrar novo usuário
// @route   POST /api/auth/cadastro
// @access  Public
exports.cadastro = async (req, res) => {
  try {
    const { nome, usuario, email, senha } = req.body;

    // Verificar se usuário já existe
    const usuarioExiste = await User.findOne({ 
      $or: [{ email }, { usuario }]
    });
    if (usuarioExiste) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Usuário ou email já cadastrado'
      });
    }

    // Criar usuário
    const novoUsuario = await User.create({
      nome,
      usuario,
      email,
      senha
    });

    // Gerar token
    const token = gerarToken(novoUsuario._id);

    res.status(201).json({
      sucesso: true,
      mensagem: 'Usuário cadastrado com sucesso',
      token,
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        usuario: novoUsuario.usuario,
        email: novoUsuario.email
      }
    });
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao cadastrar usuário',
      erro: error.message
    });
  }
};

// @desc    Login de usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    // Validar campos
    if (!usuario || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Por favor, informe usuário e senha'
      });
    }

    // Buscar usuário com senha
    const usuarioEncontrado = await User.findOne({ usuario }).select('+senha');

    if (!usuarioEncontrado) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const senhaCorreta = await usuarioEncontrado.compararSenha(senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Credenciais inválidas'
      });
    }

    // Gerar token
    const token = gerarToken(usuarioEncontrado._id);

    res.status(200).json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuarioEncontrado._id,
        nome: usuarioEncontrado.nome,
        usuario: usuarioEncontrado.usuario,
        email: usuarioEncontrado.email
      }
    });
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao realizar login',
      erro: error.message
    });
  }
};

// @desc    Obter dados do usuário logado
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);

    res.status(200).json({
      sucesso: true,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        usuario: usuario.usuario,
        email: usuario.email,
        criadoEm: usuario.criadoEm
      }
    });
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar dados do usuário',
      erro: error.message
    });
  }
};
