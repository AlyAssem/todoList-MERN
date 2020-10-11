import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  isComplete: { type: String, required: true, default: false },
});

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [todoSchema],
  },
  {
    timestamps: true,
  }
);

// add a method that could be used on any user later on.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// adding a middleware on save of a user object.
userSchema.pre('save', async function (next) {
  // if the password of the user object has not been modified.
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
