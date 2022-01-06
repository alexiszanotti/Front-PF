import React, { useEffect, useState } from "react";
import Navbar from "./components/navBar/navBar";
import Home from "./components/home/home";
import Landing from "./components/landing/landing";
import Detail from "./components/detail/detail";
import ShopingCart from "./components/shopingCar/shopingCart";
import Favorite from "./components/favorite/favorite";
import createProduct from "./components/admin/createProduct/createProduct";
import UpDataUsers from "./components/admin/upDateUsers/upDateUsers";
import GoShopping from "./components/goShopping/goShopping";
// import NavBarAdmin from "./components/admin/navBarAdmin/navBarAdmin";
import EstadisticasA from "./components/admin/estadisticasA/estadisticasA";
import EditProduct from "./components/admin/editProduct/editProduct";
import CreateCollection from "./components/admin/createCategory/createCategory";
import DeleteCollection from "./components/admin/deleteCategory/deleteCategory";
import VerOrdenes from "./components/admin/verOrdenes/verOrdenes";
import Stock from "./components/admin/stock/stock";
import Perfil from "./components/perfil/perfil";
import Pago from "./components/pago/pago";
import DefaultError from "./components/error/error";
import Checkuot from "./components/checkuot/checkuot";
import MisCompras from "./components/misCompras/misCompras";
import Realizado from "./components/realizado/realizado";
import aboutUs from "./components/aboutUs/aboutUs";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  postCreateUser,
  getAllUsers,
  postUserLogin,
  addDataBaseFavorite,
  addDataBaseShoppingCart,
} from "./Redux/Actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import useIsFocusVisible from "@material-ui/utils/useIsFocusVisible";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { user, isAuthenticated, logout } = useAuth0();

  const [estadoLogeado, setEstadoLogeado] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  const usersDB = useSelector(state => state.users);
  const emailUsersDB = usersDB.map(e => e.email);
  const users = useSelector(state => state.users);

  const logIn = useSelector(state => state.userLogin);

  useEffect(() => {
    if (logIn.type === "User") {
      let idUser = logIn.id;
      let usr = users?.filter(user => user.id === logIn.id);
      let cartId = usr?.map(el => el.Cart.id);
      dispatch(addDataBaseFavorite(idUser));
      dispatch(addDataBaseShoppingCart(cartId.toString()));
     
     
    }
  }, [dispatch, logIn.id, logIn.type, users]);

  if (isAuthenticated) {
    setTimeout(function () {
      if (emailUsersDB.indexOf(user.email) === -1) {
        dispatch(
          postCreateUser({
            email: user.email,
            name: user.given_name ? user.given_name : "name",
            lastName: user.family_name ? user.family_name : "lastName",
            birthDay: "2000-01-01",
            gender: "Other",
          })
        );

        setTimeout(function () {
          if (logIn.type === undefined) {
            let email = user.email;
            dispatch(postUserLogin({ email }));
            setEstadoLogeado(true);
          }
        }, 2000);
      } else {
        setTimeout(function () {
          if (logIn.type === undefined) {
            let email = user.email;
            dispatch(postUserLogin({ email }));
            setEstadoLogeado(true);
          }
        }, 1000);
      }
    }, 2000);
  }

  if (Object.keys(logIn).length === 0) {
    if (estadoLogeado) {
      console.log("ema trolo ");
      setEstadoLogeado(false);

      logout({ returnTo: window.location.origin });
    }
  }

  if (logIn.type === "Admin") {
    return (
      <BrowserRouter>
        <div className='App'>
          {/* <NavBarAdmin /> */}
          <Switch>
            <Route exact path='/' component={EstadisticasA} />
            <Route path='/createProduct' component={createProduct} />
            <Route path='/userUpdata' component={UpDataUsers} />
            <Route path='/updateProduct' component={EditProduct} />
            <Route path='/createCollection' component={CreateCollection} />
            <Route path='/deleteCollection' component={DeleteCollection} />
            <Route path='/stock' component={Stock} />
            <Route path='/verOrdenes' component={VerOrdenes} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar setCurrentPage={setCurrentPage} />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/home'>
              <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </Route>
            <Route exact path='/detail/:id' component={Detail} />
            <Route path='/carrito/:id' component={ShopingCart} />
            <Route path='/favorites' component={Favorite} />
            <Route path='/pago' component={GoShopping} />
            <Route path='/perfil' component={Perfil} />
            <Route path='/tarjeta' component={Pago} />
            <Route path='/checkout' component={Checkuot} />
            <Route path='/misCompras' component={MisCompras} />
            <Route path='/realizado' component={Realizado} />
            <Route path='/aboutUs' component={aboutUs} />
            <Route path='*' component={DefaultError} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
