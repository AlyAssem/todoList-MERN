import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTodo from '../components/AddTodo';
import Todos from '../components/Todos';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listTodos } from '../actions/userActions';
import { addTodo, removeTodo } from '../actions/userActions';

const HomePage = () => {
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.userTodos);
  const loggedIn = useSelector((state) => state.userLogin);

  const { loading, error, todos } = todoList;

  useEffect(() => {
    dispatch(listTodos());
  }, [dispatch]);

  const addTodoHandler = (title) => {
    dispatch(addTodo(title));
  };

  const removeTodoHandler = (todoId) => {
    dispatch(removeTodo(todoId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : !loggedIn.userInfo ? (
        <Message variant='danger'>Please logIn</Message>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <AddTodo addTodo={addTodoHandler} />

          {todos && <Todos todos={todos} removeTodo={removeTodoHandler} />}
        </>
      )}
    </>
  );
};

export default HomePage;
