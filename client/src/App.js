import './App.css';
import React, { useEffect } from "react";
import Navbar from './components/navBar/navBar';
import Home from './components/home/home';
import Landing from './components/landing/landing';
import Detail from './components/detail/detail';
import Login from './components/login/login';
import ShopingCart from './components/shopingCar/shopingCart';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useDispatch} from "react-redux";
import {getAllProducts} from "./Redux/Actions/index"
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
            <Route exact path="/" component={Landing} />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route exact path="/detail/:id" component={Detail} /> 
            <Route path="/carrito/:id" component={ShopingCart}  />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

