import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email }); // email: email

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    todos: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      todos: user.todos,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc        Auth user & get token
// @route       PATCH /api/users/login
// @access      Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }); // email: email

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      todos: user.todos,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: 'Invalid email or password',
    });
  }
});

// @desc        Get user todos
// @route       GET /api/users/todos
// @access      Private
const getUserTodos = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      todos: user.todos,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc        Add a todoItem to user.
// @route       PATCH /api/users/todos
// @access      Private
const addTodoUser = asyncHandler(async (req, res) => {
  const { todo } = req.body;
  const userId = req.params.uid;
  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong, could not find a user.');
  }

  user.todos.push(todo);

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error('Something went wrong, could not update user.');
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    todos: user.todos,
    token: generateToken(user._id),
  });
});

// @desc        Remove a todoItem from a specific user.
// @route       DELETE /api/users/:uid/:todoid
// @access      Private
const removeTodoUser = asyncHandler(async (req, res) => {
  const { uid, todoid } = req.params;

  let user;

  try {
    user = await User.findById(uid);
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong, could not find a user.');
  }

  user.todos = user.todos.filter((todo) => todo._id != todoid);

  try {
    await user.save();
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong, could not update user.');
  }
  res.status(200).json({ todos: user.todos });
});

export { registerUser, loginUser, getUserTodos, addTodoUser, removeTodoUser };
