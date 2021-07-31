const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        // .populate({
        //     path: 'user',
        //     select: '-__v'
        // })
        // .select('-__v')
        // .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    //get one thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        //     .populate({
        //         path: 'user',
        //         select: '-__v'
        //     })
        //    .select('-__v')
        //    .sort({ _id: -1 })
           .then(dbThoughtData => res.json(dbThoughtData))
           .catch(err => {
               console.log(err);
               res.status(500).json(err)
           })
    },

    //create thought
    createThought({ params, body }, res) {
        console.log(params, body)
        Thought.create(body)
          .then(({ _id }) => {
            console.log('Finishes creating Thought: ', _id);
            return User.findOneAndUpdate(
              { username: body.username },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((dbThoughtData) => {
            console.log('Finished updating user: ', dbThoughtData);
            if (!dbThoughtData) {
              res.status(400).json({ message: "No thought found with this id!" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log('Error while creating/updating item: ', err.message);
            res.json(err)
        });
      },

    //update a thought by Id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body,
            { new: true, runValidators: true }
        )
        .then(updatedThought => {
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
        res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },

    //delete a thought by ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID!'})
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    },

    //add reaction
    createReaction ({ params, body}, res) {
        console.log('createReaction ' + params, params, body);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    //delete Reaction
    removeReaction ({ params }, res) {
        console.log('removeReaction', params)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
          )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));
    }

};


module.exports = thoughtController