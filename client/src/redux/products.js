import {
  SET_PRODUCTS,
  CREATE_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  PLUS_QTY_CART,
  ADD_TO_PREVIEW,
  REMOVE_FROM_PREVIEW,
  CLEAR_CART,
} from "../types";

const initialState = {
  products: [],
  cart: [],
  preview: [],
};

const inCart = (cart, _id) => {
  return cart.find((item) => (item._id === _id ? true : false));
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
      let indexProducts = state.products.findIndex(
        (Item) => Item._id === action.payload._id
      );

      if (indexProducts >= 0) {
        newProducts.splice(indexProducts, 1);
      } else {
        console.log(`Cant remove (id: ${action.payload._id} )`);
      }
      newProducts = [...newProducts, action.payload];
      return {
        ...state,
        products: newProducts,
      };

    case REMOVE_PRODUCT:
      let newData = [...state.products];
      let indexDate = state.products.findIndex(
        (Item) => Item._id === action.payload
      );

      if (indexDate >= 0) {
        newData.splice(indexDate, 1);
      } else {
        console.log(`Cant remove (id: ${action.payload} )`);
      }
      return {
        ...state,
        products: newData,
      };

    case ADD_TO_CART:
      let item = action.payload;
      return {
        ...state,
        cart: inCart(state.cart, action.payload._id)
          ? state.cart.map((item) =>
              item._id === action.payload._id
                ? item.stock === item.qty
                  ? item
                  : { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };

    case REMOVE_FROM_CART:
      let newCart = [...state.cart];
      let index = state.cart.findIndex((item) => item._id === action.payload);

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(`Cant remove (id: ${action.payload} )`);
      }

      return {
        ...state,
        cart: newCart,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case PLUS_QTY_CART:
      return {
        ...state,
        cart:
          inCart(state.cart, action.payload._id) &&
          state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, qty: parseInt(action.payload.qty) }
              : item
          ),
      };
    case ADD_TO_PREVIEW:
      return {
        ...state,
        preview: [...state.preview, action.payload],
      };

    case REMOVE_FROM_PREVIEW:
      let newPreview = [...state.preview];
      let indexPreview = state.preview.findIndex(
        (Item) => Item._id === action.payload
      );

      if (indexPreview >= 0) {
        newPreview.splice(indexPreview, 1);
      } else {
        console.warn(`Cant remove (id: ${action.payload} )`);
      }
      return {
        ...state,
        preview: newPreview,
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

export const removeProduct = (_id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: _id,
    });
  };
};

export const addToCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
};

export const removeFromCart = (_id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: _id,
    });
  };
};

export const plusQtyCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: PLUS_QTY_CART,
      payload: product,
    });
  };
};

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
  };
};

export const addToPreview = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_PREVIEW,
      payload: product,
    });
  };
};

export const removeFromPreview = (_id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_PREVIEW,
      payload: _id,
    });
  };
};

export default products;
