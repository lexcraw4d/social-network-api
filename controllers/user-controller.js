
const { User } = require ('../models');

const userController = {
    //get all users
    getAllUsers (req, res){
        User.find({})
        .populate({
            path: 'user',
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
            path: 'user',
            select: '-__v'
        })
        .select ('-__v')
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    createUser({ body }, res){
        User.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err))
    }
}

module.exports = userController;