const router = require ('express').Router();
const { getAllUsers, createUser, getSingleUser } = require('../../controllers/user-controller');

//api/user
router
.route('/')
.get(getAllUsers)
.post(createUser)

// /api/user/:id
router
.route('/:id')
.get(getSingleUser)


module.exports = router