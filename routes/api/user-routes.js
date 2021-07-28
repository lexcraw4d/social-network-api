const router = require ('express').Router();
const { getAllUsers, createUser, getSingleUser, updateUser, deleteUser } = require('../../controllers/user-controller');

//api/user
router
.route('/')
.get(getAllUsers)
.post(createUser)

// /api/user/:id
router
.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router