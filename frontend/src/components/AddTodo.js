import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setTitle('');
    addTodo(title);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      style={{ display: 'flex', margin: '1rem 0' }}
    >
      <input
        type='text'
        style={{ flex: '10', padding: '5px', borderRadius: '0' }}
        placeholder='Add Todo ...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='submit'
        value='Submit'
        className='btn'
        style={{ flex: '1' }}
      />
    </form>
  );
};

export default AddTodo;
