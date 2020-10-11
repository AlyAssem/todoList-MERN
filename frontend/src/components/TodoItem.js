import React, { useState } from 'react';

const TodoItem = ({ title, id, removeTodo }) => {
  const [completedTask, setCompletedTask] = useState(false);

  const todoItemStyle = {
    background: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted',
    textDecoration: completedTask ? 'line-through' : 'none',
  };

  const handleItemDelete = () => {
    removeTodo(id);
  };

  return (
    <div style={todoItemStyle}>
      <p>
        <input
          type='checkbox'
          defaultChecked={completedTask}
          onChange={() => setCompletedTask((prevState) => !prevState)}
        />{' '}
        <span style={{ marginTop: '1rem' }}>{title}</span>
        <button className='delete-button' onClick={handleItemDelete}>
          x
        </button>
      </p>
    </div>
  );
};

export default TodoItem;
