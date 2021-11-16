import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/navBar/navBar";
import Home from "./components/home/home";
import Landing from "./components/landing/landing";
import Detail from "./components/detail/detail";
import Login from "./components/login/login";
import Register from "./components/register/register";
import ShopingCart from "./components/shopingCar/shopingCart";
import Favorite from "./components/favorite/favorite";
import createProduct from "./components/createProduct/createProduct";
import GoShopping from "./components/goShopping/goShopping";
import Admin from "./components/admin/homeA/homeA";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./Redux/Actions/index";
function App() {
  const dispatch = useDispatch();
  const [admin, setAdmin] = React.useState(false);
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='App'>
        {
          admin ? 
          <div> 
            <Route path='/admin' component={Admin} /> 
            </div> : 
          <div>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route exact path='/detail/:id' component={Detail} />
              <Route path='/carrito/:id' component={ShopingCart} />
              <Route path='/favorites' component={Favorite} />
              <Route path='/createProduct' component={createProduct} />
              <Route path='/pago' component={GoShopping} />
            </Switch>
            </div>
      }
      </div>
    </BrowserRouter>
  );
}

export default App;
