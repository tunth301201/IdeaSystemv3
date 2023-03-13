const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// POST /users
router.post('/', userController.createUser);

// GET /users
router.get('/', userController.getUsers);

// PUT /users/:id
router.put('/:id', userController.updateUser);

// DELETE /users/:id
router.delete('/:id', userController.deleteUser);

module.exports = router;
