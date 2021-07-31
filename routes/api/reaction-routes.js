const router = require('express').Router();
const { createReaction, removeReaction } = require('../../controllers/thought-controller')

// api/reactions/df4f4f4dss3
router
    .route('/:thoughtId')
    .post(createReaction)
    
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;