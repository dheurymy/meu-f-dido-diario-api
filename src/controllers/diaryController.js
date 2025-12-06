const Entry = require('../models/Entry');

// @desc    Obter todas as entradas do usuário autenticado
// @route   GET /diary/entries
// @access  Private
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ usuario: req.user._id })
      .sort({ data: -1 })
      .select('-__v');

    res.status(200).json({
      sucesso: true,
      quantidade: entries.length,
      dados: entries
    });
  } catch (erro) {
    console.error('Erro ao buscar entradas:', erro);
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar entradas do diário'
    });
  }
};

// @desc    Obter uma entrada específica por ID
// @route   GET /diary/entries/:id
// @access  Private
exports.getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      usuario: req.user._id
    }).select('-__v');

    if (!entry) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Entrada não encontrada'
      });
    }

    res.status(200).json({
      sucesso: true,
      dados: entry
    });
  } catch (erro) {
    console.error('Erro ao buscar entrada:', erro);
    
    if (erro.kind === 'ObjectId') {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Entrada não encontrada'
      });
    }

    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar entrada do diário'
    });
  }
};

// @desc    Criar nova entrada
// @route   POST /diary/entries
// @access  Private
exports.createEntry = async (req, res) => {
  try {
    const { titulo, conteudo, data, humor, tags, privado } = req.body;

    // Validação básica
    if (!titulo || !conteudo) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Título e conteúdo são obrigatórios'
      });
    }

    const entry = await Entry.create({
      usuario: req.user._id,
      titulo,
      conteudo,
      data: data || Date.now(),
      humor,
      tags,
      privado: privado !== undefined ? privado : true
    });

    res.status(201).json({
      sucesso: true,
      mensagem: 'Entrada criada com sucesso',
      dados: entry
    });
  } catch (erro) {
    console.error('Erro ao criar entrada:', erro);

    if (erro.name === 'ValidationError') {
      const mensagens = Object.values(erro.errors).map(e => e.message);
      return res.status(400).json({
        sucesso: false,
        mensagem: mensagens.join(', ')
      });
    }

    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao criar entrada do diário'
    });
  }
};

// @desc    Atualizar entrada existente
// @route   PUT /diary/entries/:id
// @access  Private
exports.updateEntry = async (req, res) => {
  try {
    const { titulo, conteudo, data, humor, tags, privado } = req.body;

    // Buscar entrada
    let entry = await Entry.findOne({
      _id: req.params.id,
      usuario: req.user._id
    });

    if (!entry) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Entrada não encontrada'
      });
    }

    // Atualizar campos
    entry.titulo = titulo || entry.titulo;
    entry.conteudo = conteudo || entry.conteudo;
    entry.data = data || entry.data;
    entry.humor = humor || entry.humor;
    entry.tags = tags || entry.tags;
    entry.privado = privado !== undefined ? privado : entry.privado;

    await entry.save();

    res.status(200).json({
      sucesso: true,
      mensagem: 'Entrada atualizada com sucesso',
      dados: entry
    });
  } catch (erro) {
    console.error('Erro ao atualizar entrada:', erro);

    if (erro.kind === 'ObjectId') {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Entrada não encontrada'
      });
    }

    if (erro.name === 'ValidationError') {
      const mensagens = Object.values(erro.errors).map(e => e.message);
      return res.status(400).json({
        sucesso: false,
        mensagem: mensagens.join(', ')
      });
    }

    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar entrada do diário'
    });
  }
};

// @desc    Deletar entrada
// @route   DELETE /diary/entries/:id
// @access  Private
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user._id
    });

    if (!entry) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Entrada não encontrada'
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Entrada deletada com sucesso'
    });
  } catch (erro) {
    console.error('Erro ao deletar entrada:', erro);

    if (erro.kind === 'ObjectId') {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Entrada não encontrada'
      });
    }

    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao deletar entrada do diário'
    });
  }
};
