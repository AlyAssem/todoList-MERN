import axios from 'axios';

import {
  USER_ADD_TODO_REQUEST,
  USER_ADD_TODO_SUCCESS,
  USER_ADD_TODO_FAIL,
  USER_LIST_TODOS_FAIL,
  USER_LIST_TODOS_REQUEST,
  USER_LIST_TODOS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LIST_TODOS_EMPTY,
  USER_REMOVE_TODO_REQUEST,
  USER_REMOVE_TODO_SUCCESS,
  USER_REMOVE_TODO_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(response.data));
    localStorage.setItem('userTodos', JSON.stringify(response.data.todos));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userTodos');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_TODOS_EMPTY });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem('userInfo', JSON.stringify(response.data));
    localStorage.setItem('userTodos', JSON.stringify(response.data.todos));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listTodos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_TODOS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get('/api/users/todos', config);

    dispatch({ type: USER_LIST_TODOS_SUCCESS, payload: response.data.todos });
  } catch (err) {
    dispatch({
      type: USER_LIST_TODOS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addTodo = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ADD_TODO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.patch(
      `/api/users/todos/${userInfo._id}`,
      {
        todo: {
          title: title,
        },
      },
      config
    );

    let currentUserInfo = localStorage.getItem(
      'userInfo',
      JSON.stringify(response.data)
    );

    currentUserInfo = JSON.parse(currentUserInfo);
    currentUserInfo['todos'] = currentUserInfo['todos'].concat(
      response.data.todos
    );

    dispatch({
      type: USER_ADD_TODO_SUCCESS,
      payload: response.data.todos,
    });

    localStorage.setItem('userTodos', JSON.stringify(currentUserInfo.todos));
  } catch (err) {
    dispatch({
      type: USER_ADD_TODO_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeTodo = (todoId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REMOVE_TODO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.delete(
      `/api/users/${userInfo._id}/${todoId}`,
      config
    );

    let currentUserInfo = localStorage.getItem(
      'userInfo',
      JSON.stringify(response.data)
    );

    currentUserInfo = JSON.parse(currentUserInfo);
    currentUserInfo['todos'] = currentUserInfo['todos'].concat(
      response.data.todos
    );

    dispatch({
      type: USER_REMOVE_TODO_SUCCESS,
      payload: response.data.todos,
    });

    localStorage.setItem('userTodos', JSON.stringify(currentUserInfo.todos));
  } catch (err) {
    dispatch({
      type: USER_REMOVE_TODO_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
