// Import required packages
import { model, models, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
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
    admin: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
)

const UserSchema = models.user || model('user', userSchema)
export default UserSchema
