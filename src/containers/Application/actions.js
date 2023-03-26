/*
 *
 * Application actions
 *
 */
import axios from "axios";
import { DEFAULT_ACTION,FETCH_SKILLS,FETCH_INDUSTRIES,FETCH_TECHNOLOGIES } from './constants';

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
};
export const fetchAvailableSkills = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/skills`);

      dispatch({ type: FETCH_SKILLS, payload: response.data.skills });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
    }
  };
};

export const fetchAvailableTechnologies = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/technologies`);

      dispatch({ type: FETCH_TECHNOLOGIES, payload: response.data.technologies });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
    }
  };
};

export const fetchAvailableIndustries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/industries`);

      dispatch({ type: FETCH_INDUSTRIES, payload: response.data.industries });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
    }
  };
};