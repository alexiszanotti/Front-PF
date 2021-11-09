import axios from "axios";
import { GET_ALL_PRODUCTS, FILTER_PRODUCTS } from "./actionTypes";

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


