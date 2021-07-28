const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    createReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thought-controller')

// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// api/thoughts/id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
// api/thoughtid/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
// api/thoughtid/reaction
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;