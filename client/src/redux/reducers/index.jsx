import { combineReducers } from "redux";
import { productsReducer,selectedProductReducer } from "./ProductReducer";

 export const reducers= combineReducers({
    allProducts:productsReducer,
    product: selectedProductReducer
})

