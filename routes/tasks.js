const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

const router = express.Router();

// Criar nova tarefa
router.post('/', [auth, [
  check('title', 'O título é obrigatório').not().isEmpty(),
  check('description', 'A descrição é obrigatória').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Obter todas as tarefas do usuário
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Atualizar tarefa
router.put('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Tarefa não encontrada' });

    if (task.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Não autorizado' });

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Deletar tarefa
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Tarefa não encontrada' });

    if (task.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Não autorizado' });

    await task.remove();
    res.json({ msg: 'Tarefa removida' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
