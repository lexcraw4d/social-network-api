const { Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema (

    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username required!'],
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: [true, 'Email required!'],
            required: 'Email address is required',
        },

        thoughts: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
          }
        ],
        //THOUGHTS: [ '8sd8d7sd67s67', '8as86d5a4d7s5da7d' ]
          
        friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
          ],
    
        },
        {
          toJSON: {
            virtuals: true,
          },
          // prevents virtuals from creating duplicate of _id as `id`
          id: false
        }
     );
    
UserSchema.virtual('reactionCount').get(function(){
  return this.friends.length
})
    

const User = model ('User', UserSchema)
module.exports = User