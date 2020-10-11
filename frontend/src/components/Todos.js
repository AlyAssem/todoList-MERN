import React from 'react';

import TodoItem from './TodoItem';

const Todos = (props) => {
  return props.todos.map((todo) => (
    <TodoItem
      key={todo._id}
      title={todo.title}
      removeTodo={props.removeTodo}
      id={todo._id}
    />
  ));
};

export default Todos;
