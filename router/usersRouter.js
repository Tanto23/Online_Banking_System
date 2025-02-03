const express = require('express');
const { createUser, getUser, getAllUsers } = require('../controller/usersController'); // Corrected import

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUser);
router.get('/users', getAllUsers);

module.exports = router;
