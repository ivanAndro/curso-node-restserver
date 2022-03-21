const { Router } = require('express');
const { getUsers, putUser, postUser, deleteUser } = require('../controllers/user.controller');

const router = Router();

router.get('/',getUsers);

router.put('/:id',putUser);

router.post('/',postUser);

router.delete('/',deleteUser);



module.exports = router;