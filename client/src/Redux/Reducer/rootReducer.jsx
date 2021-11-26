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
  GET_ALL_USERS,
  FILTER_BY_PARAMS,
  RESET_FILTER,
  USER_LOGOUT,
  EMPTY_CART,
  EMPTY_FAVORITE,
  ADD_DATABASE_SHOPPING_CART,
  ADD_DATABASE_FAVORITE,
  CHECKOUT_PRODUCTS
} from "../Actions/actionTypes";

const initialState = {
  products: [],
  productsFilter: [],
  detail: [],
  shoppingCart: [],
  favorite: [],
  collections: [],
  users: [],
  userLogin: [],
  review: [],
  orden: {
    collection: "All",
    gender: "All",
    price: "default",
    discount: "All",
  },
  ShoppingAlmacen: [],
  favoriteAlmacen: [],
  mercadoPago: [],
  checkoutProducts: [],
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
        productsFilter: action.payload,
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
      return {
        ...state,
        // review: action.payload,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_LOGIN:
      return {
        ...state,
        userLogin: action.payload,
      };
    case FILTER_BY_PARAMS:
      const { collection, gender, price, discount } = action.payload;
      console.log(action.payload);
      let filtered = [...state.products];

      /////filter by collection
      filtered =
        collection === "All"
          ? filtered
          : [...filtered].filter(el => el.collection.name === collection);

      //filter by gender
      filtered =
        gender === "All"
          ? filtered
          : filtered.filter(
              el => el.gender.toLowerCase().charAt(0) === gender.toLowerCase().charAt(0)
            );
      ///Order by price
      filtered =
        price === "ASC"
          ? filtered.sort(function (a, b) {
              return a.salePrice - b.salePrice;
            })
          : filtered.sort(function (a, b) {
              return b.salePrice - a.salePrice;
            });
      ////filter by discount
      filtered = discount === "All" ? filtered : filtered.filter(el => el.discount === discount);

      return {
        ...state,
        productsFilter: filtered,
        orden: action.payload,
      };

    case RESET_FILTER:
      return {
        ...state,
        productsFilter: state.products,
        orden: {
          collection: "All",
          gender: "All",
          price: "default",
          discount: "All",
        },
      };
    case USER_LOGOUT:
      return {
        ...state,
        userLogin: action.payload,
      };
    case EMPTY_CART:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case EMPTY_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };
    case ADD_DATABASE_SHOPPING_CART:
      return {
        ...state,
        ShoppingAlmacen: action.payload,
      };
    case ADD_DATABASE_FAVORITE:
      return {
        ...state,
        favoriteAlmacen: action.payload,
      };
    case CHECKOUT_PRODUCTS:
      return {
        ...state,
        checkoutProducts: action.payload,
      };
    default:
      return state;
  }
}
