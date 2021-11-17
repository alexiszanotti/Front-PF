import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/navBar/navBar";
import Home from "./components/home/home";
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
import Landing from "./components/landing/landing";
import EditProduct from "./components/admin/editProduct/editProduct";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./Redux/Actions/index";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);



  const userLogeado = useSelector(state => state.userLogin);

  const setLocalStorage = () => {

    const localStorage = window.localStorage;

    if(userLogeado.email !== undefined) localStorage.setItem("user", JSON.stringify(userLogeado));
  };


  setLocalStorage();

  const logIn = JSON.parse(localStorage.getItem('user'));

  
  if (logIn.type === "Admin"){
    return(
      <BrowserRouter>
      <div className='App'>
        <NavBarAdmin />
        <Switch>
          <Route exact path="/" component={EstadisticasA}/>
          <Route path='/createProduct' component={createProduct} />
          <Route path='/userUpdata' component={UpDataUsers} />
          <Route path='/updateProduct' component={EditProduct} />
        </Switch>
      </div>
    </BrowserRouter>
    )
  }else{
  return (

    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route exact path='/detail/:id' component={Detail} />
          <Route path='/carrito/:id' component={ShopingCart} />
          <Route path='/favorites' component={Favorite} />
          <Route path='/pago' component={GoShopping} />

          

        </Switch>
      </div>
    </BrowserRouter>
  )
  

  }
}

export default App;
