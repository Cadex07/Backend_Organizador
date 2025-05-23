const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskController');
const auth = require('../utils/authMiddleware');

router.use(auth);

router.get('/', taskCtrl.getTasks);
router.post('/', taskCtrl.createTask);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);
router.get('/reporte', taskCtrl.reporteProductividad);

module.exports = router;