//require mongoose
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//reaction schema
const ReactionSchema = new Schema({
 
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  
  username: {
    type: String,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});


const ThoughtSchema = new Schema(
  {
    
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
   
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
   
    username: {
      type: String,
      required: true,
    },
   
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;