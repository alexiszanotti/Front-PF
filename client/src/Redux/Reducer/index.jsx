import {
  GET_ALL_PRODUCTS,
  FILTER_PRICE,
  SEARCH_PRODUCTS,
  DETAIL_PRODUCTS,
  FILTER_DISCOUNT,
  FILTER_MODEL,
  FILTER_SEXO,
  SHOPPING_CART,
  REMOVE_CARD,
  FAVORITE,
  REMOVE_FAVORITE,
  CREATE_PRODUCT,
  GET_COLLECTIONS,
  POST_REVIEW,
  GET_REVIEW,
} from "../Actions/actionTypes";

const initialState = {
  products: [],
  productsFilter: [],
  detail: [],
  shoppingCart: [],
  favorite: [],
  collections: [],
  review: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsFilter: action.payload,
      };
    case FILTER_PRICE:
      let sortedArr =
        action.payload === "ASC"
          ? state.products.sort(function (a, b) {
              return a.salePrice - b.salePrice;
            })
          : state.products.sort(function (a, b) {
              return b.salePrice - a.salePrice;
            });
      return {
        ...state,
        products: sortedArr,
      };
    case FILTER_DISCOUNT:
      const products = state.productsFilter;
      const statusFilter =
        action.payload === "All" ? products : products.filter(el => el.discount === action.payload);
      return {
        ...state,
        products: statusFilter,
      };
    case FILTER_MODEL:
      return {
        ...state,
        products: action.payload,
      };
    case FILTER_SEXO:
      return {
        ...state,
        products: action.payload,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case DETAIL_PRODUCTS:
      return {
        ...state,
        detail: action.payload,
      };
    case SHOPPING_CART:
      return {
        ...state,
        shoppingCart: state.shoppingCart.concat(action.payload),
      };
    case REMOVE_CARD:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(el => el.id !== action.payload),
      };
    case FAVORITE:
      return {
        ...state,
        favorite: state.favorite.concat(action.payload),
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(el => el.id !== action.payload),
      };
    case CREATE_PRODUCT:
      return {
        ...state,
      };
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
      case POST_REVIEW:
        return{
          ...state,
          // review: action.payload,
        }
      case GET_REVIEW:
        return{
          ...state,
          review: action.payload,
        }
    default:
      return state;
  }
}
