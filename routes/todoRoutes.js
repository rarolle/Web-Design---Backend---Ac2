const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.get('/', todoController.getAllTodos);
router.post('/new', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.get('/unassigned', todoController.getUnassignedTodos);
router.put('/:id/assign', todoController.assignTodo);

module.exports = router;