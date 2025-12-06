const User = require('../models/User');

// @desc    Verificar se username está disponível
// @route   GET /api/auth/verificar-usuario/:usuario
// @access  Public
exports.verificarUsuario = async (req, res) => {
  try {
    const { usuario } = req.params;

    // Buscar se usuário existe
    const usuarioExiste = await User.findOne({ usuario: usuario.toLowerCase() });

    res.status(200).json({
      sucesso: true,
      disponivel: !usuarioExiste,
      mensagem: usuarioExiste 
        ? 'Usuário já está em uso' 
        : 'Usuário disponível'
    });
  } catch (error) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao verificar usuário',
      erro: error.message
    });
  }
};
