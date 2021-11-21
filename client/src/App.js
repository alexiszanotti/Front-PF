import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navBar/navBar";
import Home from "./components/home/home";
import Landing from "./components/landing/landing";
import Detail from "./components/detail/detail";
import Login from "./components/login/login";
import Register from "./components/register/register";
import ShopingCart from "./components/shopingCar/shopingCart";
import Favorite from "./components/favorite/favorite";
import createProduct from "./components/admin/createProduct/createProduct";
import UpDataUsers from "./components/admin/upDateUsers/upDateUsers";
import GoShopping from "./components/goShopping/goShopping";
import NavBarAdmin from "./components/admin/navBarAdmin/navBarAdmin";
import EstadisticasA from "./components/admin/estadisticasA/estadisticasA";
import AdminRoute from "./components/routes/adminRoute/adminRoute";
import EditProduct from "./components/admin/editProduct/editProduct";
import CreateCollection from "./components/admin/createCategory/createCategory";
import Perfil from "./components/perfil/perfil";
import Pago from "./components/pago/pago"
import DefaultError from "./components/error/error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  postCreateUser,
  getAllUsers,
  postUserLogin,
  userLogout,
} from "./Redux/Actions/index";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, logout } = useAuth0();

  const [estadoLogeado, setEstadoLogeado] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  const usersDB = useSelector(state => state.users);

  const emailUsersDB = usersDB.map(e => e.email);

  const logIn = useSelector(state => state.userLogin);

  if (isAuthenticated) {
    if (emailUsersDB.indexOf(user.email) === -1) {
      dispatch(
        postCreateUser({
          password: "1234passADIDAS",
          email: user.email,
          name: user.given_name ? user.given_name : "name",
          lastName: user.family_name ? user.family_name : "lastName",
          birthDay: "2000-01-01",
          gender: "Other",
        })
      );
    } else {
      if (logIn.type === undefined) {
        let email = user.email;

        dispatch(postUserLogin({ email }));

        setEstadoLogeado(true);
      }
    }
  }

  if (Object.keys(logIn).length === 0) {
    if (estadoLogeado) {
      setEstadoLogeado(false);

      logout({ returnTo: window.location.origin });
    }
  }

  if (logIn.type === "Admin") {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBarAdmin />
          <Switch>
            <Route exact path='/' component={EstadisticasA} />
            <Route path='/createProduct' component={createProduct} />
            <Route path='/userUpdata' component={UpDataUsers} />
            <Route path='/updateProduct' component={EditProduct} />
            <Route path='/createCollection' component={CreateCollection} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/home' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route exact path='/detail/:id' component={Detail} />
            <Route path='/carrito/:id' component={ShopingCart} />
            <Route path='/favorites' component={Favorite} />
            <Route path='/pago' component={GoShopping} />
            <Route path='/perfil' component={Perfil} />
            <Route path='/tarjeta' component={Pago} />
            <Route path='*' component={DefaultError} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
