import {
  USER_ADD_TODO_FAIL,
  USER_ADD_TODO_REQUEST,
  USER_ADD_TODO_SUCCESS,
  USER_LIST_TODOS_FAIL,
  USER_LIST_TODOS_REQUEST,
  USER_LIST_TODOS_SUCCESS,
  USER_LIST_TODOS_EMPTY,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REMOVE_TODO_REQUEST,
  USER_REMOVE_TODO_SUCCESS,
  USER_REMOVE_TODO_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userTodoListReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case USER_LIST_TODOS_REQUEST:
      return { loading: true, todos: [] };

    case USER_ADD_TODO_REQUEST:
      return { loading: true, todos: [] };

    case USER_REMOVE_TODO_REQUEST:
      return { loading: true, todos: [] };

    case USER_LIST_TODOS_SUCCESS:
      return { loading: false, todos: action.payload };

    case USER_ADD_TODO_SUCCESS:
      return { loading: false, todos: action.payload };

    case USER_REMOVE_TODO_SUCCESS:
      return { loading: false, todos: action.payload };

    case USER_LIST_TODOS_FAIL:
      return { loading: false, error: action.payload };

    case USER_ADD_TODO_FAIL:
      return { loading: false, error: action.payload };

    case USER_REMOVE_TODO_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_TODOS_EMPTY:
      return {};

    default:
      return state;
  }
};
