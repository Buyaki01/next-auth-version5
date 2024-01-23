import { Schema, model, models } from 'mongoose'

const userRoles = ['Admin', 'User']

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    enum: userRoles,
    default: ['User'],
  },
  emailVerified: {
    type: Date,
  },
},
  { timestamps: true }
)

const User = models?.User || model('User', UserSchema)

export default User
