import {
  GET_ALL_PRODUCTS,
  SEARCH_PRODUCTS,
  DETAIL_PRODUCTS,
  SHOPPING_CART,
  REMOVE_CARD,
  FAVORITE,
  REMOVE_FAVORITE,
  CREATE_PRODUCT,
  GET_COLLECTIONS,
  GET_USER_LOGIN,
  POST_REVIEW,
  GET_ALL_USERS,
  FILTER_BY_PARAMS,
  RESET_FILTER,
  USER_LOGOUT,
  EMPTY_CART,
  EMPTY_FAVORITE,
  ADD_DATABASE_SHOPPING_CART,
  ADD_DATABASE_FAVORITE,
  CHECKOUT_PRODUCTS,
  FILTER_STATUS,
  FILTER_BY_CART,
  MERCADO_PAGO,
  ADD_TOTAL_COMPRA,
  REMOVE_TOTAL_COMPRA,
  CHANGE_STATUS_CART,
  DELETE_PERSIST_SHOPPING,
  DELETE_ID_PERSIST_SHOOPING,
  GET_ALL_ORDERS,
} from "../Actions/actionTypes";

const initialState = {
  compras: [],
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
  },
  ShoppingAlmacen: [],
  favoriteAlmacen: [],
  orders: [],
  filterOrderStatus: [],
  misCompras: [],
  mercadoPago: [],
  checkoutProducts: [],
  checkoutProducts1: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsFilter: action.payload,
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
      const { collection, gender, price } = action.payload;
      let filtered = [...state.products];
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
        checkoutProducts1: action.payload,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
        filterOrderStatus: action.payload,
      };
    case FILTER_STATUS:
      let ordenes = state.filterOrderStatus;
      let ordenesFiltradas =
        action.payload === "TODOS"
          ? ordenes
          : ordenes.filter(e => e.status.includes(action.payload.toString().toUpperCase()));
      return {
        ...state,
        orders: ordenesFiltradas,
      };
    case FILTER_BY_CART:
      return {
        ...state,
        misCompras: action.payload,
      };
    case MERCADO_PAGO:
      return {
        ...state,
        mercadoPago: action.payload,
      };
    case ADD_TOTAL_COMPRA:
      //product id 1
      //cantidad 1
      let comprasActuales = state.checkoutProducts; //objeto con id de producto y cantidad que es un numero
      let aux = comprasActuales.filter(e => e.productId === action.payload.productId); // es un objeto que tine product id y cantidad
      if (aux.length > 0) {
        for (let i = 0; i < comprasActuales.length; i++) {
          //recorro todo
          if (comprasActuales[i].productId === aux[0].productId)
            comprasActuales[i].cantidad = comprasActuales[i].cantidad + 1;
          //cantidad 2
          //cantidad 3
        }
      } else {
        comprasActuales.push(action.payload);
      }

      return {
        ...state,
        checkoutProducts: comprasActuales,
        checkoutProducts1: comprasActuales,
      };
    case REMOVE_TOTAL_COMPRA:
      let comprasActuales1 = state.checkoutProducts;
      let aux1 = comprasActuales1.filter(e => e.productId === action.payload.productId);
      if (aux1.length > 0 && aux1[0].cantidad > 0) {
        for (let i = 0; i < comprasActuales1.length; i++) {
          if (
            comprasActuales1[i].productId === aux1[0].productId &&
            comprasActuales1[i].cantidad > 0
          ) {
            comprasActuales1[i].cantidad = comprasActuales1[i].cantidad - 1;
          }
        }
      }

      return {
        ...state,
        checkoutProducts: comprasActuales1,
        checkoutProducts1: comprasActuales1,
      };
    case CHANGE_STATUS_CART:
      return {
        ...state,
        checkoutProducts: [],

      };
      case DELETE_PERSIST_SHOPPING:
        return {
          ...state,
          checkoutProducts: action.payload,
          checkoutProducts1: action.payload
        };
        case DELETE_ID_PERSIST_SHOOPING:
          return {
            ...state,
            checkoutProducts: state.checkoutProducts.filter(el => el.productId !== action.payload),
            checkoutProducts1: state.checkoutProducts.filter(el => el.productId !== action.payload),
          };

    default:
      return state;
  }
}
