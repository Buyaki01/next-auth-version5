import { Schema, model, models } from 'mongoose'

const VerificationTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expires: Date,
},
  { timestamps: true }
)

const VerificationToken = models?.VerificationToken || model('VerificationToken', VerificationTokenSchema)

export default VerificationToken
