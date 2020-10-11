import express from 'express';

import {
  registerUser,
  loginUser,
  getUserTodos,
  addTodoUser,
  removeTodoUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/todos', protect, getUserTodos);

router.route('/').post(registerUser);

router.post('/login', loginUser);

router.patch('/todos/:uid', addTodoUser);

router.delete('/:uid/:todoid', removeTodoUser);

export default router;
