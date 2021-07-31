const router = require ('express').Router();
const { getAllUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller');

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

// /api/user/:id/friends/:friendid
router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)


module.exports = router