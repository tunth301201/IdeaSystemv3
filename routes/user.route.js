const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const middleware=require('./../helpers/middleware');

// POST /users
router.post('/',middleware.auth, userController.createUser);

// GET /users
router.get('/',middleware.auth, userController.getUsers);

// PUT /users/:id
router.put('/:id',middleware.auth, userController.updateUser);

// DELETE /users/:id
router.delete('/:id',middleware.auth, userController.deleteUser);

module.exports = router;