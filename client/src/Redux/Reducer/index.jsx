import { GET_ALL_PRODUCTS, FILTER_PRECIO , SEARCH_PRODUCTS, DETAIL_PRODUCTS } from "../Actions/actionTypes";

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
      case FILTER_PRECIO :
        let sortedArr = action.payload === "ASC"?
        state.products.sort(function(a,b){
          if(a.name > b.name){
            return 1;
          }
          if(b.name > a.name){
            return -1;
          }
          return 0;
        }) :
        state.products.sort(function(a,b){
          if(a.name > b.name){
            return -1;
          }
          if(b.name > a.name){
            return 1;
          }
          return 0;
        });
        return{
          ...state,
          products: sortedArr,
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
