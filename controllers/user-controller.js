
const { User } = require ('../models');

const userController = {

    //POST add friend to user's friend list
    addFriend ({ params }, res) {
        User.findOneAndUpdate (
            {_id: params.id},
            { $push: { friends: params.friendId}},
            { new: true }
        ).then ((friendResults) => {
            if (!friendResults) {
                res.status(400).json({ message: "No friend found."});
                return;
            }
            res.json(friendResults)
        })
        .catch((err) => res.status(400).json(err))
    },

    //delete friend
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            {_id: params.id},
            { $pull: { friends: params.friendId }},
            { new: true }
        ).then(( friendResults ) => {
            if (!friendResults) {
                res.status(400).json( { message: "No friend found."})
                return;
            }
            res.json(friendResults)
        })
        .catch((err) => res.status(400).json(err))
    },
    //get all users
    getAllUsers (req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(error => {console.log(error)
        res.sendStatus(400)
        })
    },

    //get single user
    getSingleUser ({params}, res){
        User.findOne({ _id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select ('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    //post new user
    createUser({ body }, res){
        User.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err))
    },
    //update user
    updateUser ({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {
            new:true, 
            runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.stat(404).json ({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },
    //delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.json(err));
      },
  
}

module.exports = userController;