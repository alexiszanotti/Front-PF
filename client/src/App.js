import './App.css';
import React, { useEffect } from "react";
import Navbar from './components/navBar/navBar';
import Home from './components/home/home';
import Landing from './components/landing/landing';
import Detail from './components/detail/detail';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useDispatch} from "react-redux";
import {getAllProducts} from "./Redux/Actions/index"
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
            <Route exact path="/">
              <Landing />
            </Route>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/detail/:id" component={Detail}>
        </Route>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;