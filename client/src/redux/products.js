import {
  SET_PRODUCTS,
  CREATE_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from "../types";

const initialState = {
  products: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case UPDATE_PRODUCT:
      let newProducts = [...state.products];
      const index = state.products.findIndex(
        (Item) => Item._id === action.payload._id
      );

      if (index >= 0) {
        newProducts.splice(index, 1);
      } else {
        console.log(`Cant remove (id: ${action.payload._id} )`);
      }
      newProducts = [...newProducts, action.payload];
      return {
        ...state,
        products: newProducts,
      };
    default:
      return state;
  }
};

export const setProducts = (products) => {
  return (dispatch) => {
    dispatch({
      type: SET_PRODUCTS,
      payload: products,
    });
  };
};

export const addProduct = (product) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: product,
    });
  };
};

export const updateProuct = (product) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PRODUCT,
      payload: product,
    });
  };
};
export default products;
