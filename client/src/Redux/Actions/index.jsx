import axios from "axios";
import { GET_ALL_PRODUCTS, FILTER_PRODUCTS, SEARCH_PRODUCTS, DETAIL_PRODUCTS } from "./actionTypes";

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

export function filterProducts() {
  return {
    type: FILTER_PRODUCTS,
  };
}

export function searchProducts() {
  return {
    type: SEARCH_PRODUCTS,
  };
}

export function detailProducts() {
  return {
    type: DETAIL_PRODUCTS,
  };
}
