const usersRouter = require('express').Router()
const { createUser, getUser, getAllUsers } = require('../controller/usersController'); // Corrected import


usersRouter.post('/users', createUser);
usersRouter.get('/users/:id', getUser);
usersRouter.get('/users', getAllUsers);

module.exports = usersRouter;
