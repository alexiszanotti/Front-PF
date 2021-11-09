import { GET_ALL_PRODUCTS, FILTER_PRODUCTS, SEARCH_PRODUCTS, DETAIL_PRODUCTS } from "../Actions/actionTypes";

const initialState = {
  products: [],

};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
      case FILTER_PRODUCTS:
        return{
          ...state,
          products: action.payload,
        }
      case SEARCH_PRODUCTS:
        return{
          ...state,
          products: action.payload,
        }
      case DETAIL_PRODUCTS:
        return{
          ...state,
          products: action.payload,
        }
    default:
      return state;
  }
}
