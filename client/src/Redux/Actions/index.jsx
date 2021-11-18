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
  RESET_FILTER,
  USER_LOGOUT
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

export function filterModel(collection) {
  return async function (dispatch) {
    try {
      let res = await axios(
        `http://localhost:3001/categories/collections/?collection=${collection}`
      );

      return dispatch({ type: FILTER_MODEL, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterSexo(gender) {
  return async function (dispatch) {
    try {
      let res = await axios(`http://localhost:3001/categories/gender/?gender=${gender}`);

      return dispatch({ type: FILTER_SEXO, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchProducts(name) {
    console.log(name)
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
      let res = await axios.post(`http://localhost:3001/users/`, payload);
      return res.data;
    };

};

export const createProduct = payload => {
    return async () => {
      let res = await axios.post(`http://localhost:3001/products/`, payload);
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
  console.log(payload);
    return async () => {
      let res = await axios.patch(`http://localhost:3001/users/`, payload);
      return res.data;
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
          payload: {}},
        )});
    };

};

export const filterByParams = payload => {
  return dispatch => 
  dispatch({
  type: FILTER_BY_PARAMS,
  payload: payload

  });
};
export const resetFilter = () => {
  return dispatch => 
  dispatch({
  type: RESET_FILTER,
  });
}

export const modifyProduct = payload => {
  console.log(payload, "asdasd");
    return async () => {
      let res = await axios.patch(`http://localhost:3001/products`, payload);
      return res;
    };

};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
    payload: {}
  };
};

export const createCollection = payload => {
  try {
    return async () => {
      let res = await axios.post(`http://localhost:3001/categories`, payload);
      return res;
    };
  } catch (error) {
    console.error(error);
  }
};
