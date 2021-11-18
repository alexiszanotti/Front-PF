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
  GET_USER_LOGIN,
  POST_REVIEW,
  GET_REVIEW,
  GET_ALL_USERS

} from "../Actions/actionTypes";

const initialState = {
  products: [],
  productsFilter: this?.products,
  detail: [],
  shoppingCart: [],
  favorite: [],
  collections: [],
  users: [],
  userLogin: [],
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
      const statusDiscount =
        action.payload === "All" ? products : products.filter(el => el.discount === action.payload);
      return {
        ...state,
        products: statusDiscount,
        
      };
    case FILTER_MODEL:
      const producto = state.productsFilter;
      const statusFilters =
        action.payload === "All" ? producto : producto.filter(el => el.collection.name === action.payload);
      return {
        ...state,
        products: statusFilters,
        
      };
    case FILTER_SEXO:
      const product = state.productsFilter;
      const statusSexo =
        action.payload === "All" ? product : product.filter(e => {
          return e.productName.toLowerCase().charAt(0) === action.payload.toLowerCase().charAt(0);});
      return {
        ...state,
        products: statusSexo,
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case DETAIL_PRODUCTS:
      return {
        ...state,
        detail: [action.payload],
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
    case GET_ALL_USERS:
      return{
        ...state,
        users: action.payload
      };
    case GET_USER_LOGIN:
      return {

        ...state,
        userLogin: action.payload,
        
      };
    default:
      return state;
  }
}
