const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  prioridad: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categoria: { type: String },
  colaboradores: [{ type: String }], // <-- Aquí el cambio
  completada: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);