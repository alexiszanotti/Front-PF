import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  SEARCH_PRODUCTS,
  DETAIL_PRODUCTS,
  SHOPPING_CART,
  REMOVE_CARD,
  FAVORITE,
  REMOVE_FAVORITE,
  GET_COLLECTIONS,
  POST_REVIEW,
  GET_REVIEW,
  GET_ALL_USERS,
  GET_USER_LOGIN,
  FILTER_BY_PARAMS,
  RESET_FILTER,
  USER_LOGOUT,
  EMPTY_CART,
  EMPTY_FAVORITE,
  ADD_DATABASE_SHOPPING_CART,
  ADD_DATABASE_FAVORITE,
  CHECKOUT_PRODUCTS,
  MERCADO_PAGO,
} from "./actionTypes";

export function getAllProducts() {
  return async function (dispatch) {
    try {
      let res = await axios("products");

      return dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchProducts(name) {
  console.log(name);
  return async function (dispatch) {
    let res = await axios(`products/?name=${name}`);
    return dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
  };
}

export const detailProducts = id => {
  return async dispatch => {
    let res = await axios(`products/${id}`);
    return dispatch({
      type: DETAIL_PRODUCTS,
      payload: res.data,
    });
  };
};

export const shoppingCart = id => {
  return async dispatch => {
    let res = await axios(`products/${id}`);
    return dispatch({
      type: SHOPPING_CART,
      payload: res.data,
    });
  };
};

export const removeCard = id => {
  return {
    type: REMOVE_CARD,
    payload: id,
  };
};

export const favorite = id => {
  return async dispatch => {
    let res = await axios(`products/${id}`);
    return dispatch({
      type: FAVORITE,
      payload: res.data,
    });
  };
};

export const removeFavorite = id => {
  return {
    type: REMOVE_FAVORITE,
    payload: id,
  };
};

export const postCreateUser = payload => {
  return async () => {
    let res = await axios.post(`users/`, payload);
    return res.data;
  };
};

export const createProduct = payload => {
  return async () => {
    let res = await axios.post(`products/`, payload);
    return res;
  };
};

export const getCollection = payload => {
  return async dispatch => {
    let res = await axios(`categories`);
    return dispatch({
      type: GET_COLLECTIONS,
      payload: res.data,
    });
  };
};

export const postReview = payload => {
  return async dispatch => {
    let res = await axios.post(`reviews`, payload);
    return dispatch({ type: POST_REVIEW, payload: res.data });
  };
};

export const getReview = id => {
  return async dispatch => {
    let res = await axios(`reviews?id=${id}`);
    return dispatch({
      type: GET_REVIEW,
      payload: res.data,
    });
  };
};
export const getAllUsers = payload => {
  return async dispatch => {
    let res = await axios(`users`);
    return dispatch({
      type: GET_ALL_USERS,

      payload: res.data,
    });
  };
};
export const modifyUser = payload => {
  console.log(payload);
  return async () => {
    let res = await axios.patch(`users/`, payload);
    return res.data;
  };
};

export const postUserLogin = payload => {
  console.log(payload);
  return async dispatch => {
    return await axios
      .post(`users/loginUser`, payload)
      .then(user =>
        dispatch({
          type: GET_USER_LOGIN,
          payload: user.data,
        })
      )
      .catch(error => {
        alert("Usuario o contraseña incorrectos");
        return dispatch({
          type: GET_USER_LOGIN,
          payload: {},
        });
      });
  };
};

export const filterByParams = payload => {
  return dispatch =>
    dispatch({
      type: FILTER_BY_PARAMS,
      payload: payload,
    });
};
export const resetFilter = () => {
  return dispatch =>
    dispatch({
      type: RESET_FILTER,
    });
};

export const modifyProduct = payload => {
  return async () => {
    let res = await axios.patch(`products`, payload);
    return res;
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
    payload: {},
  };
};

export const createCollection = payload => {
  return async () => {
    let res = await axios.post(`categories`, payload);
    return res;
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
    payload: [],
  };
};
export const emptyFavorites = () => {
  return {
    type: EMPTY_FAVORITE,
    payload: [],
  };
};

export const postFavorite = payload => {
  return async () => {
    let res = await axios.post(`favorite`, payload);
    return res.data;
  };
};

export const deleteCollection = payload => {
  return async () => {
    let res = await axios.delete("categories", { data: payload });
    return res;
  };
};

export const postShoppingCart = payload => {
  return async () => {
    let res = await axios.post("cart", payload);
    return res;
  };
};
export const addDataBaseShoppingCart = userId => {
  return async dispatch => {
    let res = await axios(`cart?cartId=${userId}`);
    return dispatch({
      type: ADD_DATABASE_SHOPPING_CART,
      payload: res.data.ProductsInCarts,
    });
  };
};

export const addDataBaseFavorite = userId => {
  return async dispatch => {
    let res = await axios(`favorite?userId=${userId}`);
    return dispatch({
      type: ADD_DATABASE_FAVORITE,
      payload: res.data,
    });
  };
};

export const deleteDataBaseShoppingCart = payload => {
  return async () => {
    let res = await axios.delete("cart", { data: payload });
    return res;
  };
};

export const checkoutProducts = payload => {
  return {
    type: CHECKOUT_PRODUCTS,
    payload: payload,
  };
};

export const mercadoPago = cartId => {
  console.log(cartId);
  return async dispatch => {
    let res = await axios(`mercadoPago?cartId=${cartId}`);
    console.log(res.data);
    return dispatch({
      type: MERCADO_PAGO,
      payload: res.data,
    });
  };
};

export const deleteDataBaseFavorite = payload => {
  return async () => {
    let res = await axios.delete("favorite", { data: payload });
    return res;
  };
};
