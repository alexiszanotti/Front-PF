import axios from "axios";
import { GET_ALL_PRODUCTS, FILTER_PRECIO , SEARCH_PRODUCTS, DETAIL_PRODUCTS } from "./actionTypes";

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

export function filterPrecio(payload) {
  return {
    type: FILTER_PRECIO ,
    payload
  };
}

export function searchProducts(name) {
  try {
    return async function (dispatch) {
      let res = await axios(`http://localhost:3001/products/?name=${name}`);
      return dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
}

export function detailProducts() {
  return {
    type: DETAIL_PRODUCTS,
  };
}
