import { GET_ALL_PRODUCTS, FILTER_PRICE , SEARCH_PRODUCTS, DETAIL_PRODUCTS, FILTER_DISCOUNT, FILTER_MODEL } from "../Actions/actionTypes";

const initialState = {
  products: [],
  productsFilter: [],
  detail: [],

};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsFilter: action.payload,
      };
      case FILTER_PRICE :
        let sortedArr = action.payload === "ASC"?
        state.products.sort(function(a,b){
          return a.salePrice - b.salePrice
        }) :
        state.products.sort(function(a,b){
          return b.salePrice - a.salePrice
        });
        return{
          ...state,
          products: sortedArr,
        }
      case FILTER_DISCOUNT:
        const products = state.productsFilter;
        const statusFilter = action.payload === "All" ? products: products.filter(el => el.discount === action.payload)
        return{
          ...state,
          products: statusFilter
    
        }
      case FILTER_MODEL:
        const product = state.productsFilter;
        const statuFilter = action.payload === "All" ? product: product.filter(el => el.brand.name === action.payload)
        return{
          ...state,
          products: statuFilter
    
        }
      case SEARCH_PRODUCTS:
        return{
          ...state,
          products: action.payload,
        }
      case DETAIL_PRODUCTS:
        return{
          ...state,
          detail: action.payload,
        }
    default:
      return state;
  }
}
