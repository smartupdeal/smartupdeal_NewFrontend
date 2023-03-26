/*
 *
 * Product reducer
 *
 */

import {
  FETCH_TEMPS,
  TEMP_CHANGE,
  ADD_TEMP,
  RESET_TEMP,
  SET_TEMP_FORM_ERRORS,
  SET_TEMP_FORM_EDIT_ERRORS,
  SET_TEMP_LOADING,
  SALE_TEMP_EDIT_CHANGE,
  FETCH_SALE_TEMP,
  REMOVE_TEMP,
  ADD_SALE_TEMP_PACKAGE,
  REMOVE_SALE_TEMP_PACKAGE,
  TEMP_PACKAGE_CHANGE,
  SHOW_LIST,
  ADD_SALE_TEMP_HIGHLIGHT,
  HIGH_LIGHT_CHANGE,
  REMOVE_HIGH_LIGHT,
  ADD_SALE_TEMP__FAQ,
  FAQ_CHANGE,
  REMOVE_FAQ,
  toggle_SALE_TEMP__FAQ,
  SET_SALE_TEMP__FAQ,
  SET_SALE_TEMP__PACKAGES,
  TOGGLE_SALE_TEMP__PACKAGE,
  SELECT_OP_PRODUCT,
  ADD_CONNECT_SLOT,
  CONNECT_SLOT_CHANGE,
  CONNECT_SLOT_SESSION_CHANGE
} from './constants';

const initialState = {
  // temp state
  showSaleList: false,
  tempPackages: [],
  saleTemps: [],
  highLights: [],

  FAQs: [],
  mappedSaleTempPackages: [],
  saleTemp: {
    _id: ''
  },
  connectSlot: {
    price: '',
    duration: '',
    frequency: '',
    noOfSessions: '',
    sessions: []
  },
  saleTempFormData: {
    name: '',
    description: '',
    category: '',
    industry: '',
    skill: '',
    technology: '',
    connectSlot: {
      price: '',
      duration: '',
      frequency: '',
      noOfSessions: '',
      sessions: []
    },
    image: [],
    packages: [],
    highLights: [],
    FAQs: [],
    isActive: true
  },
  isLoading: false,
  formErrors: {},
  editFormErrors: {},
  shopFormErrors: {},
  saleTempFAQs: []
  // mappedSaleTempPackages: []
};

const saleTempReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEMPS:
      return {
        ...state,
        saleTemps: action.payload
      };
    case FETCH_SALE_TEMP:
      return {
        ...state,
        saleTemp: action.payload,
        editFormErrors: {}
      };
    case SET_TEMP_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case toggle_SALE_TEMP__FAQ:
      let newFAQS = [...state.saleTempFAQs];
      newFAQS[action.payload]['isOpen'] = !newFAQS[action.payload]['isOpen'];

      return {
        ...state,
        saleTempFAQs: newFAQS
      };
    case SELECT_OP_PRODUCT:
      let newMappedSaleTempPackages = [...state.mappedSaleTempPackages];
      const { mappedSaleTempIndex, opProductIndex, selected } = action.payload;
      newMappedSaleTempPackages[mappedSaleTempIndex]['optionalProducts'][opProductIndex]['selected'] = selected;

      return {
        ...state,
        mappedSaleTempPackages: newMappedSaleTempPackages
      };
    case TOGGLE_SALE_TEMP__PACKAGE:
      let newSaleTempPackages = [...state.mappedSaleTempPackages];
      // newSaleTempPackages[action.payload]['isOpen'] = !newSaleTempPackages[action.payload]['isOpen'];
      const data = newSaleTempPackages.map((item, index) => {
        if (index === action.payload) {
          return {...item,isOpen : !item.isOpen};
        } else {
          return {...item,isOpen : false};
        }
      })
      console.log("data",data);
      return {
        ...state,
        mappedSaleTempPackages: data
      };
    case TEMP_CHANGE:
      return {
        ...state,
        saleTempFormData: {
          ...state.saleTempFormData,
          ...action.payload
        }
      };
    case CONNECT_SLOT_CHANGE:
      if (action.payload.edit) {
        delete action.payload.edit;
        return { ...state, saleTemp: { ...state.saleTemp, connectSlot: { ...state.saleTemp.connectSlot, ...action.payload } } };
      } else {
        return {
          ...state,
          connectSlot: {
            ...state.connectSlot,
            ...action.payload
          },
          saleTempFormData: {
            ...state.saleTempFormData,
            connectSlot: { ...state.connectSlot, ...action.payload }
          }
        };
      }

    case CONNECT_SLOT_SESSION_CHANGE:

      let { s_name, s_value, s_index, s_edit } = action.payload;
      let newConnectSlot = s_edit ? { ...state.saleTemp.connectSlot } : { ...state.connectSlot };

      console.log('before', newConnectSlot);
      if (newConnectSlot?.sessions && newConnectSlot.sessions.hasOwnProperty(s_index)) {

        newConnectSlot.sessions[s_index][s_name] = s_value;
      } else {
        let temp = {
          "date": "",
          "start": "",
          "end": "",
          "weekDays": [],
        }
        if (!newConnectSlot?.sessions) {
          newConnectSlot = {
            "sessions": []
          }

        }
        newConnectSlot.sessions[s_index] = temp;

        newConnectSlot.sessions[s_index][s_name] = s_value;
      }
      console.log('after', newConnectSlot);
      console.log({ ...state, saleTemp: { ...state.saleTemp, connectSlot: { ...state.saleTemp.connectSlot, ...newConnectSlot } } })

      if (s_edit)
        return { ...state, saleTemp: { ...state.saleTemp, connectSlot: { ...state.saleTemp.connectSlot, ...newConnectSlot } } };
      else {
        return {
          ...state,
          connectSlot: {
            ...state.connectSlot,
            ...action.payload
          },
          saleTempFormData: {
            ...state.saleTempFormData,
            connectSlot: { ...state.connectSlot, ...action.payload }
          }
        };
      }
    case TEMP_PACKAGE_CHANGE:
      let { name, value, position, packEdit, newEdit } = action.payload;
      let newPackages = packEdit ? [...state.saleTemp.packages] : [...state.tempPackages];

      if (name === 'optionalProducts') {
        newPackages[position][name] = [...value];
      } else {
        newPackages[position][name] = value;
      }


      return {
        ...state,
        tempPackages: packEdit ? [] : newPackages,
        saleTempFormData: { ...state.saleTempFormData, packages: state.tempPackages },
        saleTemp: packEdit || newEdit ? { ...state.saleTemp, packages: newPackages } : { ...state.saleTemp }
      };
    case HIGH_LIGHT_CHANGE:
      let { itemName, itemValue, itemPosition, itemEdit } = action.payload;
      let newHighLights = itemEdit ? [...state.saleTemp.highLights] : [...state.highLights];
      newHighLights[itemPosition][itemName] = itemValue;

      return {
        ...state,
        highLights: itemEdit ? [] : newHighLights,
        saleTempFormData: { ...state.saleTempFormData, highLights: state.highLights },
        saleTemp: itemEdit ? { ...state.saleTemp, highLights: newHighLights } : { ...state.saleTemp }
      };
    case FAQ_CHANGE:
      let { faqNName, faqValue, faqPosition, faqEdit } = action.payload;

      let newFAQs = faqEdit ? [...state.saleTemp.faqs] : [...state.FAQs];
      newFAQs[faqPosition][faqNName] = faqValue;

      return {
        ...state,
        FAQs: newFAQs,
        saleTempFormData: { ...state.saleTempFormData, FAQs: state.FAQs },
        saleTemp: faqEdit ? { ...state.saleTemp, faqs: newFAQs } : { ...state.saleTemp }
      };
    case ADD_SALE_TEMP_PACKAGE:
      const edit = action.payload.packAddEdit;

      return {
        ...state,
        tempPackages: edit ? null : [...state.tempPackages, action.payload],
        saleTemp: edit ? { ...state.saleTemp, packages: [...state.saleTemp.packages, action.payload] } : null
      };
    case ADD_SALE_TEMP_HIGHLIGHT:
      const { highlightEdit } = action.payload;
      return {
        ...state,
        highLights: highlightEdit ? null : [...state.highLights, action.payload],
        saleTemp: highlightEdit
          ? { ...state.saleTemp, highLights: [...state.saleTemp.highLights, action.payload] }
          : { ...state.saleTemp }
      };
    case ADD_SALE_TEMP__FAQ:
      const faqAddEdit = action.payload.faqAddEdit;

      return {
        ...state,
        FAQs: [...state.FAQs, action.payload],
        saleTemp: faqAddEdit ? { ...state.saleTemp, faqs: [...state.saleTemp.faqs, action.payload] } : null
      };
    case ADD_CONNECT_SLOT:
      return {
        ...state,
        connectSlot: action.payload
      };
    case REMOVE_SALE_TEMP_PACKAGE:
      const { packageIndex, packageEdit } = action.payload;

      let toRemovePackages = packageEdit ? [...state.saleTemp.packages] : [...state.tempPackages];
      toRemovePackages.splice(packageIndex, 1);
      return {
        ...state,
        tempPackages: packageEdit ? state.tempPackages : toRemovePackages,
        saleTemp: packageEdit ? { ...state.saleTemp, packages: toRemovePackages } : { ...state.saleTemp }
      };
    case REMOVE_HIGH_LIGHT:
      const { highLightIndex, highLightEdit } = action.payload;
      let toRemoveHighLight = highLightEdit ? [...state.saleTemp.highLights] : [...state.highLights];
      toRemoveHighLight.splice(highLightIndex, 1);
      return {
        ...state,
        highLights: highLightEdit ? [...state.highLights] : toRemoveHighLight,
        saleTemp: highLightEdit ? { ...state.saleTemp, highLights: toRemoveHighLight } : { ...state.saleTemp }
      };
    case REMOVE_FAQ:
      const { faqIndex, toRemoveFaqEdit } = action.payload;
      let toRemoveFAQ = toRemoveFaqEdit ? [...state.saleTemp.faqs] : [...state.FAQs];
      toRemoveFAQ.splice(faqIndex, 1);

      return {
        ...state,
        FAQs: toRemoveFaqEdit ? state.FAQs : toRemoveFAQ,
        saleTemp: toRemoveFaqEdit ? { ...state.saleTemp, faqs: toRemoveFAQ } : { ...state.saleTemp }
      };
    case SALE_TEMP_EDIT_CHANGE:
      return {
        ...state,
        saleTemp: {
          ...state.saleTemp,
          ...action.payload
        }
      };
    case SET_TEMP_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_TEMP_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case ADD_TEMP:
      return {
        ...state,
        saleTemps: [...state.saleTemps, action.payload]
      };

    case SET_SALE_TEMP__FAQ:
      return {
        ...state,
        saleTempFAQs: action.payload
      };

    case SET_SALE_TEMP__PACKAGES:
      return {
        ...state,
        mappedSaleTempPackages: action.payload
      };
    case REMOVE_TEMP:
      const index = state.saleTemps.findIndex(b => b._id === action.payload);
      return {
        ...state,
        saleTemps: [...state.saleTemps.slice(0, index), ...state.saleTemps.slice(index + 1)]
      };
    case RESET_TEMP:
      return {
        ...state,
        saleTempFormData: {
          name: '',
          description: '',
          category: '',
          industry: '',
          skill: '',
          technology: '',
          image: {},
          isActive: true
        },

        formErrors: {}
      };
    case SHOW_LIST:
      return {
        ...state,
        showSaleList: action.payload
      };
    default:
      return state;
  }
};

export default saleTempReducer;
