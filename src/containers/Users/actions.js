/*
 *
 * Users actions
 *
 */

import axios from 'axios';

import { FETCH_USERS } from './constants';

import handleError from '../../utils/error';

export const fetchUsers = filter => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/user/search`, {
        params: {
          search: filter.value
        }
      });

      dispatch({ type: FETCH_USERS, payload: response.data.users });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const getUsersList= ()=> {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/user/userList`)

      
      dispatch({ type: FETCH_USERS, payload: response.data.userList });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const searchUsers = filter => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchUsers(filter));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
