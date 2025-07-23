const router = require('express').Router();
const UsersController = require('./controllers/UsersController');

router.get('/user', UsersController.getUser);
router.put('/user', UsersController.updateUser);
router.delete('/user', UsersController.deleteUser);