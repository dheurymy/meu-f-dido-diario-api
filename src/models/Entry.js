const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Usuário é obrigatório']
    },
    titulo: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
      maxlength: [200, 'Título não pode ter mais de 200 caracteres']
    },
    conteudo: {
      type: String,
      required: [true, 'Conteúdo é obrigatório']
    },
    data: {
      type: Date,
      default: Date.now
    },
    humor: {
      type: String,
      enum: ['feliz', 'triste', 'ansioso', 'calmo', 'animado', 'cansado', 'outro'],
      default: 'outro'
    },
    tags: [{
      type: String,
      trim: true
    }],
    privado: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Índice para busca por usuário e data
entrySchema.index({ usuario: 1, data: -1 });

module.exports = mongoose.model('Entry', entrySchema);
