/*
 *
 * Account actions
 *
 */

import { success } from "react-notification-system-redux";
import axios from "axios";

import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  CLEAR_ACCOUNT,
  SET_PROFILE_LOADING,
} from "./constants";
import handleError from "../../utils/error";

export const accountChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ACCOUNT_CHANGE,
    payload: formData,
  };
};

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT,
  };
};

export const setProfileLoading = (value) => {
  return {
    type: SET_PROFILE_LOADING,
    payload: value,
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axios.get(`/api/user`);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};

export const updateProfile = (payload) => {
  return async (dispatch, getState) => {
    const profile = payload;

    try {
      const response = await axios.put(`/api/user`, profile);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateUserAchievements = (payload) => {
  return async (dispatch, getState) => {
    const achievements = payload;

    try {
      const response = await axios.post(`/api/user/achievements`, {
        achievements,
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateUserEducation = (payload) => {
  return async (dispatch, getState) => {
    const education = payload;
    try {
      const response = await axios.put(`/api/user/education`, education);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addUserEducation = (payload) => {
  return async (dispatch, getState) => {
    const education = payload;
    try {
      const response = await axios.post(`/api/user/education`, education);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
export const deleteUserEducation = (payload) => {
  return async (dispatch, getState) => {
    const { id } = payload;
    try {
      const response = await axios.delete(`/api/user/education/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addUserExperience = (payload) => {
  return async (dispatch, getState) => {
    const experience = payload;
    try {
      const response = await axios.post(`/api/user/experience`, experience);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateUserExperience = (payload) => {
  return async (dispatch, getState) => {
    const experience = payload;
    try {
      const response = await axios.put(`/api/user/experience`, experience);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
export const deleteUserExperience = (payload) => {
  return async (dispatch, getState) => {
    const { id } = payload;
    try {
      const response = await axios.delete(`/api/user/experience/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
export const updateUserSkills = (payload) => {
  return async (dispatch, getState) => {
    const skills = payload;
    try {
      const response = await axios.post(`/api/user/skills`, { skills });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateUserTechnologies = (payload) => {
  return async (dispatch, getState) => {
    const technologies = payload;
    try {
      const response = await axios.post(`/api/user/technologies`, {
        technologies,
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateUserIndustries = (payload) => {
  return async (dispatch, getState) => {
    const industries = payload;
    try {
      const response = await axios.post(`/api/user/industries`, { industries });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };
      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateProfilePicture = (payload) => {
  return async (dispatch, getState) => {
    const profile = payload;
    console.log(payload);
    try {
      const response = await axios.put(`/api/user/profile_picture`, profile);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: "tr",
        autoDismiss: 1,
      };

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
