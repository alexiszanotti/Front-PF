import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  FILTER_PRICE,
  FILTER_DISCOUNT,
  FILTER_MODEL,
  FILTER_SEXO,
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
} from "./actionTypes";



export function getAllProducts() {
  return async function (dispatch) {
    try {
      let res = await axios("http://localhost:3001/products");

      return dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterPrice(payload) {
  return {
    type: FILTER_PRICE,
    payload,
  };
}

export function filterDiscount(payload) {
  return {
    type: FILTER_DISCOUNT,
    payload,
  };
}

export function filterModel(payload) {
  return {
    type: FILTER_MODEL,
    payload,
  };
}

export function filterSexo(payload) {
  return {
    type: FILTER_SEXO,
    payload,
  };
}

export function searchProducts(name) {
    return async function (dispatch) {
      let res = await axios(`http://localhost:3001/products/?name=${name}`);
      return dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
    };
}

export const detailProducts = id => {
    return async dispatch => {
      let res = await axios(`http://localhost:3001/products/${id}`);
      return dispatch({
        type: DETAIL_PRODUCTS,
        payload: res.data,
      });
    };
};

export const shoppingCart = id => {
    return async dispatch => {
      let res = await axios(`http://localhost:3001/products/${id}`);
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
      let res = await axios(`http://localhost:3001/products/${id}`);
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
      let res = await axios.post(`http://localhost:3001/users/createUser`, payload);
      return res.data;
    };

};

export const createProduct = payload => {

    return async () => {
      let res = await axios.post(`http://localhost:3001/products/createProduct`, payload);
      return res;
    };

};

export const getCollection = payload => {
    return async dispatch => {
      let res = await axios(`http://localhost:3001/categories`);
      return dispatch({
        type: GET_COLLECTIONS,
        payload: res.data,
      });
    };

};

export const postReview = payload => {

    return async dispatch => {
      let res = await axios.post(`http://localhost:3001/reviews`, payload);
      return dispatch({ type: POST_REVIEW, payload: res.data });
    };

};

export const getReview = id => {
    return async dispatch => {
      let res = await axios(`http://localhost:3001/reviews?id=${id}`);
      return dispatch({
        type: GET_REVIEW,
        payload: res.data,
      });
    };

};
export const getAllUsers = payload => {
 
    return async dispatch => {
      let res = await axios(`http://localhost:3001/users`);
      return dispatch({
        type: GET_ALL_USERS,

        payload: res.data,
      });
    };

};
export const modifyUser = payload => {
    return async () => {
      let res = await axios.post(`http://localhost:3001/users/updateUser`, payload);
      return res;
    };

};

export const postUserLogin = payload => {

    return async dispatch => {
      return await axios.post(`http://localhost:3001/users/loginUser`, payload).then(user =>
        dispatch({
          type: GET_USER_LOGIN,
          payload: user.data,
        })
      ).catch(error => {

        alert("Usuario o contraseña incorrectos");
        return dispatch({
          type: GET_USER_LOGIN,
          payload: {error}},
        )});
    };

};


export const filterByParams = payload => {
  return dispatch => 
  dispatch({
  type: FILTER_BY_PARAMS,
  payload: payload

  });

export const modifyProduct = payload => {
  return async () => {
    let res = await axios.post(`http://localhost:3001/users/updateProduct`, payload);
    return res;
  };


};