const { Schema, model} = require('mongoose');


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
            // validate: [validateEmail, 'Please fill a valid email address'],
            // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

        

        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            }
          ],
        reaction: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Reaction'
            }
          ],
    
        },
        {
          toJSON: {
            virtuals: true,
            getters: true
          },
          // prevents virtuals from creating duplicate of _id as `id`
          id: false
        }
     );
    
    UserSchema.virtual('reactionCount').get(function(){return this.reaction.length}
    //look into specs
    
    )
    

const User = model ('User', UserSchema)
module.exports = User