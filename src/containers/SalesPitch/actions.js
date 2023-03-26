/*
 * Product actions
 */
import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';
// import { uploadToFireStorage } from '../../firebase/storage';
import {
  FETCH_TEMPS,
  TEMP_CHANGE,
  RESET_TEMP,
  ADD_TEMP,
  SET_TEMP_FORM_ERRORS,
  SET_TEMP_LOADING,
  TEMP_PACKAGE_CHANGE,
  FETCH_SALE_TEMP,
  SALE_TEMP_EDIT_CHANGE,
  SET_TEMP_FORM_EDIT_ERRORS,
  REMOVE_TEMP,
  ADD_SALE_TEMP_PACKAGE,
  REMOVE_SALE_TEMP_PACKAGE,
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
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';

export const saleTempChange = (name, value) => {
  let formData = {};
  if (name === 'industry' || name === 'technology' || name ==='skill' ||  name ==='category' ) {
    formData[name] = getSelectedIds(value);// value.value;
  } else {
    formData[name] = value;
  }
  return {
    type: TEMP_CHANGE,
    payload: formData
  };
};
export const tempPackagesChange = (name, value, position, packEdit, newEdit, pack) => {
  let tempPackage = { name, value, position, packEdit, newEdit };
  if (name === 'optionalProducts' || name === 'noneOptionalProducts') {
    if (value) {
      tempPackage = { ...tempPackage, value: getSelectedIds(value) };
    } else {
      tempPackage = { ...tempPackage, value: [] };
    }
  }

  if (name === 'optionalProductsDefaultQuantity' || name === 'noneOptionalProductsDefaultQuantity') {
    let insertedValue = parseInt(value?.value);
    value.value = (insertedValue < 1 ) ? 1 : insertedValue;
    if (value) {
      tempPackage = { ...tempPackage, value: updateSelectedDefaultvalue(name, value, pack) };
    } else {
      tempPackage = { ...tempPackage, value: [] };
    }
  }
  return {
    type: TEMP_PACKAGE_CHANGE,
    payload: tempPackage
  };
};
export const highLightChange = (itemName, itemValue, itemPosition, itemEdit) => {
  let highLight = { itemName, itemValue, itemPosition, itemEdit };

  return {
    type: HIGH_LIGHT_CHANGE,
    payload: highLight
  };
};
export const faqChange = (faqNName, faqValue, faqPosition, faqEdit) => {
  let faq = { faqNName, faqValue, faqPosition, faqEdit };

  return {
    type: FAQ_CHANGE,
    payload: faq
  };
};

export const connectSlotChange = (slotName, slotValue, edit) => {
  const slotFormData = {};

  if (slotName === 'speakers' || slotName === 'weekDays') {
    slotFormData[slotName] = getSelectedIds(slotValue);
  } else if (slotName === 'frequency') {
    slotFormData[slotName] = slotValue.value;
  } else if (edit && slotName === 'start') {
    slotFormData[slotName] = slotValue;
    slotFormData['end'] = null;
  } else {
    slotFormData[slotName] = slotValue;
  }

  return {
    type: CONNECT_SLOT_CHANGE,
    payload: { ...slotFormData, edit }
  };
};

export const connectSlotSessionChange = (s_name, s_value, s_edit, s_index) => {

  
  if (s_name === 'weekDays') {
    s_value = getSelectedIds(s_value);
  }
  let slotFormData = { s_name, s_value, s_index, s_edit };
  return {
    type: CONNECT_SLOT_SESSION_CHANGE,
    payload: slotFormData
  };
};

export const addPackage = packAddEdit => {
  const tempPackage = {
    packTitle: '',
    description: '',
    highLight: '',
    optionalProducts: [],
    optionalProductsDefaultSize: [],
    noneOptionalProducts: [],
    noneOptionalProductsDefaultSize: [],
    packAddEdit
  };
  if (!packAddEdit) delete tempPackage['packAddEdit'];

  return {
    type: ADD_SALE_TEMP_PACKAGE,
    payload: tempPackage
  };
};
export const addConnectSlot = () => {
  const connectSlot = {
    price: '',
    duration: '',
    frequency: '',
    noOfSessions:'',
    sessions:[]
  };

  return {
    type: ADD_CONNECT_SLOT,
    payload: connectSlot
  };
};

export const addHighLight = highlightEdit => {
  const highLight = {
    text: '',
    highlightEdit
  };

  return {
    type: ADD_SALE_TEMP_HIGHLIGHT,
    payload: highLight
  };
};

export const addFAQ = faqAddEdit => {
  const FAQ = {
    Q: '',
    A: '',
    faqAddEdit
  };

  return {
    type: ADD_SALE_TEMP__FAQ,
    payload: FAQ
  };
};
export const removePackage = (packageIndex, packageEdit) => {
  return {
    type: REMOVE_SALE_TEMP_PACKAGE,
    payload: { packageIndex, packageEdit }
  };
};

export const removeHighLight = (highLightIndex, highLightEdit) => {
  return {
    type: REMOVE_HIGH_LIGHT,
    payload: { highLightIndex, highLightEdit }
  };
};

export const removeFAQ = (faqIndex, toRemoveFaqEdit) => {
  return {
    type: REMOVE_FAQ,
    payload: { faqIndex, toRemoveFaqEdit }
  };
};

export const saleTempEditChange = (name, value) => {
  let formData = {};

  if (name === 'industry' || name === 'technology' || name ==='skill' ||  name ==='category' ) {
    formData[name] = getSelectedIds(value);// value.value;
  } else {
    formData[name] = value;
  }

  return {
    type: SALE_TEMP_EDIT_CHANGE,
    payload: formData
  };
};

export const toggleFAQ = faqIndex => {
  return {
    type: toggle_SALE_TEMP__FAQ,
    payload: faqIndex
  };
};

// toggle packages
export const togglePackages = packageIndex => {
  return {
    type: TOGGLE_SALE_TEMP__PACKAGE,
    payload: packageIndex
  };
};

export const setSaleTempFAQs = faqs => {
  const modifiedFAQs = faqs?.map((item, index) => {
    return { ...item, isOpen: index === 0 ? true : false };
  });

  return {
    type: SET_SALE_TEMP__FAQ,
    payload: modifiedFAQs
  };
};

// set SaleTemp packages
export const setSaleTempPackages = packages => {
  const modifiedPackages = packages?.map((item, index) => {
    return {
      ...item,
      optionalProducts: mapOptionalProduct(item.optionalProducts),
      isOpen: index === 0 ? true : false
    };
  });

  return {
    type: SET_SALE_TEMP__PACKAGES,
    payload: modifiedPackages
  };
};

export const selectOptionalProduct = (mappedSaleTempIndex, opProductIndex, selected) => {
  return {
    type: SELECT_OP_PRODUCT,
    payload: { mappedSaleTempIndex, opProductIndex, selected }
  };
};

// add saleTemp api
export const addSaleTemp = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_TEMP_LOADING, payload: true });
      const rules = {
        name: 'required',
        description: 'required|max:200',
        category: 'required',
        industry: 'required',
        skill: 'required',
        technology: 'required',
        image: 'required',
        packages: 'required',
        'packages.*.packTitle': 'required',
        'packages.*.highLight': 'required',
        'packages.*.noneOptionalProducts': 'required',
        //'packages.*.noneOptionalProductsDefaultSize': 'min:1',
        'packages.*.optionalProducts': 'required',
        //'packages.*.optionalProductsDefaultSize': 'min:1',
        'packages.*.description': 'required',
        highLights:'required',
        'highLights.*.text': 'required',
        faqs:'required',
        'faqs.*.Q': 'required',
        'faqs.*.A': 'required',

        connectSlot: {
          price: 'required',
          frequency: 'required',
          noOfSessions:'required',
          sessions:'required',
         // 'sessions.*.date': 'required',
          'sessions.*.start': 'required',
          'sessions.*.end': 'required',
        }
      };

      const temp = getState().saleTemp.saleTempFormData;
      const user = getState().account.user;

      let newTemp = {
        name: temp.name,
        description: temp.description,
        category: temp.category,
        industry: temp.industry,
        skill: temp.skill,
        technology: temp.technology,
        isActive: temp.isActive,
        image: temp.image,
        packages: temp.packages,
        highLights: temp.highLights,
        faqs: temp.FAQs,
        connectSlot: { ...temp.connectSlot, speakers: [...temp.connectSlot.speakers, user._id] }
      };

      const { isValid, errors } = allFieldsValidation(newTemp, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'required.category': 'Category is required.',
        'required.industry': 'Industry is required.',
        'required.skill': 'Skill is required.',
        'required.technology': ' technology is required.',
        'required.image': 'Please upload files with jpg, jpeg, png format.',
        'required.connectSlot.price': 'Please Enter Price',
        'required.connectSlot.frequency': 'please Choose frequency',
        'required.connectSlot.noOfSessions': 'please Enter No of sessions',
        'required.connectSlot.sessions': 'please Enter session details',
       // 'required.connectSlot.sessions.*.date': 'Please Enter Date',
        //'required.connectSlot.weekDays': 'Please Enter Week Days',
        'required.connectSlot.sessions.*.start': 'Please Enter Start Time',
        'required.connectSlot.sessions.*.end': 'Please Enter End Time',
        'required.packages': 'Please Enter Packages',
        'required.packages.packTitle':'Please Enter Packages title',
        'required.packages.*.highLight':'Please Enter highlight',
        'required.packages.noneOptionalProducts':'Please Choose None Optional Product',
        //'min.packages.noneOptionalProductsDefaultSize' :'Size can not be 0',
        'required.packages.optionalProducts':'Please Choose Optional Product',
        //'min.packages.optionalProductsDefaultSize' :'Size can not be 0',
        'required.packages.description':'Please Enter description',
        'required.highLights': 'Please Enter HighLights',
        'required.highLights.*.text':'Please Enter text',
        'required.faqs':'Please Enter FAQs',

      });

     // if (newTemp.connectSlot.frequency === 'repeated') delete errors['connectSlot.sessions.*.date'];
     // if (newTemp.connectSlot.frequency === 'once') delete errors['connectSlot.sessions.*.weekDays'];
       console.log('action errors',errors)
      if (!isValid&&Object.keys(errors).length>0) {
        return dispatch({ type: SET_TEMP_FORM_ERRORS, payload: errors });
      }

      const imageUrls = await uploadMultipleImgToFirestore(newTemp.image);
      newTemp = { ...newTemp, imageUrls };

      const response = await axios.post(`/api/saleTemp/add`, newTemp);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_TEMP,
          payload: response.data.savedTemp
        });
        dispatch(resetTemp());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_TEMP_LOADING, payload: false });
    }
  };
};

export const resetTemp = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_TEMP });
  };
};

// fetch saleTemp List  api
export const fetchSaleTemps = (slug) => {
  return async (dispatch, getState) => {
    try {
      let URL = '/api/saleTemp';
      if(slug){
        URL = URL+'/category/'+slug
      }
      dispatch({ type: SET_TEMP_LOADING, payload: true });
      const response = await axios.get(URL);

      dispatch({
        type: FETCH_TEMPS,
        payload: response.data.saleTemps
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_TEMP_LOADING, payload: false });
    }
  };
};

// fetch saleTemp  api by id
export const fetchSaleTemp = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/saleTemp/${id}`);
      const saleTemp = response.data.saleTemp;

      dispatch({
        type: FETCH_SALE_TEMP,
        payload: saleTemp
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch saleTemp  api by slug
export const fetchSaleTempBySlug = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_TEMP_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/saleTemp/item/${slug}`);

      const saleTemp = response.data.saleTemp;

      dispatch({
        type: FETCH_SALE_TEMP,
        payload: saleTemp
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_TEMP_LOADING, payload: false });
    }
  };
};

export const updateSaleTemp = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required',
        description: 'required|max:200',
        category: 'required',
        industry: 'required',
        skill: 'required',
        technology: 'required',
        //image: 'required'
      };

      const temp = getState().saleTemp.saleTemp;

      let newTemp = {
        name: temp.name,
        description: temp.description,
        category: temp.category,
        industry: temp.industry,
        skill: temp.skill,
        technology: temp.technology,
        isActive: temp.isActive,
        image: temp.imageUrl,
        packages: temp.packages,
        highLights: temp.highLights,
        faqs: temp.faqs,
        connectSlot: temp.connectSlot
      };

      const { isValid, errors } = allFieldsValidation(newTemp, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'required.category': 'Category is required.',
        'required.industry': 'Industry is required.',
        'required.skill': 'Skill is required.',
        'required.technology': ' technology is required.',
       // 'required.image': 'Please upload files with jpg, jpeg, png format.'
      });
      if (!isValid) {
        return dispatch({
          type: SET_TEMP_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/saleTemp/${temp._id}`, {
        saleTemp: newTemp
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const deleteSaleTemp = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/saleTemp/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_TEMP,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// temp show list
export const toggleList = showState => {
  return {
    type: SHOW_LIST,
    payload: showState
  };
};
// extract selected products ID
const getSelectedIds = selectedItems => {
  const selectedIds = [];
  if(selectedItems !== null){
      selectedItems.forEach(e => selectedIds.push(e.value));
  }
 
  return selectedIds;
};

//update defaul size of product
const updateSelectedDefaultvalue = (name, value, pack) => {
  
  let updatedArr = [];
  let foundFlag = false;
  
  pack[name]?.forEach(obj => {
          if(obj.id === value.id){
          foundFlag = true;
          obj.value = value.value;
          }
          updatedArr.push(obj);
  })
  if(!foundFlag){
    updatedArr.push(value);
    
  }
  return updatedArr;
  
}

const mapOptionalProduct = opProduct => {
  return opProduct.map(e => {
    return {
      ...e,
      selected: false
    };
  });
};

const uploadMultipleImgToFirestore = async images => {
  let downloadUrlArray = [];
  // images.forEach(e => downloadUrlArray.push(uploadToFireStorage(e, e.name)));
  return await Promise.all(downloadUrlArray);
};

export const getProductRating = async slug => {
  try {
    const response = await axios.get(`/api/product/getRating/${slug}`);

    return response.data.product[0].averageRating;
  } catch (error) {
    // handleError(error, dispatch);
    console.log("error from handleError without dispatch")
  }
};
