const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

router.get('/all', userController.getAllUsers);
router.get('/:email', userController.getUserByEmail);
router.post('/new', userController.createUser);
router.put('/edit/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/count-by-role', userController.countUsersByRole);

module.exports = router;