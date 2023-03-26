/*
 *
 * Application reducer
 *
 */

import { DEFAULT_ACTION, FETCH_INDUSTRIES, FETCH_SKILLS, FETCH_TECHNOLOGIES } from "./constants";

const initialState = {
  skills: [],
  technologies: [],
  industries: [],

};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_SKILLS:
      return {
        ...state,
        skills: [
          ...action.payload,
        ],
      };
      case FETCH_TECHNOLOGIES:
      return {
        ...state,
        technologies: [
          ...action.payload,
        ],
      };
      case FETCH_INDUSTRIES:
      return {
        ...state,
        industries: [
          ...action.payload,
        ],
      };
    default:
      return state;
  }
};

export default applicationReducer;
