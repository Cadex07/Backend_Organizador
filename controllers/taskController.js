const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({
    $or: [
      { user: req.userId },
      { colaboradores: req.userId }
    ]
  });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { colaboradores = [], ...resto } = req.body;
  const task = new Task({ ...resto, user: req.userId, colaboradores });
  await task.save();
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const tareaActualizada = await Task.findOneAndUpdate(
      {
        _id: id,
        $or: [
          { user: req.userId },
          { colaboradores: req.userId }
        ]
      },
      req.body,
      { new: true }
    );
    if (!tareaActualizada) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(tareaActualizada);
  } catch (err) {
    res.status(500).json({ message: 'Error al editar la tarea' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({
      _id: id,
      $or: [
        { user: req.userId },
        { colaboradores: req.userId }
      ]
    });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};

exports.reporteProductividad = async (req, res) => {
  const filtro = {
    $or: [
      { user: req.userId },
      { colaboradores: req.userId }
    ]
  };
  const total = await Task.countDocuments(filtro);
  const completadas = await Task.countDocuments({ ...filtro, completada: true });
  const pendientes = await Task.countDocuments({ ...filtro, completada: { $ne: true } });
  res.json({ total, completadas, pendientes });
};