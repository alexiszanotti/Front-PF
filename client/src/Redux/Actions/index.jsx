import axios from "axios";
import { GET_ALL_PRODUCTS, FILTER_PRODUCTS, SEARCH_PRODUCTS, DETAIL_PRODUCTS} from "./actionTypes";

export function getAllProducts() {
  return {
    type: GET_ALL_PRODUCTS,
  };
}

export function filterProducts(){
  return {
    type: FILTER_PRODUCTS,
  }
}

export function searchProducts(){
  return {
    type: SEARCH_PRODUCTS,
  }
}

export function detailProducts(){
  return {
    type: DETAIL_PRODUCTS,
  }
}

