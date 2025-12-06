const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Por favor, informe o nome'],
    trim: true
  },
  usuario: {
    type: String,
    required: [true, 'Por favor, informe o usuário'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'O usuário deve ter no mínimo 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Por favor, informe o email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, informe um email válido'
    ]
  },
  senha: {
    type: String,
    required: [true, 'Por favor, informe a senha'],
    minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
    select: false
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// Criptografar senha antes de salvar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

// Método para comparar senha
UserSchema.methods.compararSenha = async function(senhaInformada) {
  return await bcrypt.compare(senhaInformada, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
