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

export const detailProducts = (id) => {
  // return async (dispatch) => {
  //     try{
  //         const {data} = await axios.get(`http://localhost:3001/products/${id}`);
  //         return dispatch ({
  //             type: DETAIL_PRODUCTS,
  //             payload: data
  //         })
  //     } catch (err) {
  //         alert('The ID you are looking for was not found');
  //     }
  // }
  try{
    return async (dispatch) => {
      let res = await axios(`http://localhost:3001/products/${id}`);
      return dispatch({
        type: DETAIL_PRODUCTS,
        payload: res.data
      })
    }
  }catch(error) {
    console.error(error)

  }
}
