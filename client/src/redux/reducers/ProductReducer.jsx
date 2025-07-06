import { ActionTypes } from "../constants/actionTypes";
const initialState={
    products:[]
}


export const productsReducer = (state=initialState,{ type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELECTED_PRODUCT":
      return { ...action.payload };
    case "REMOVE_SELECTED_PRODUCT":
      return {};
    default:
      return state;
  }
};
