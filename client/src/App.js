import './App.css';
import Navbar from './components/navBar/navBar';
import Home from './components/home/home';
import Container from '@mui/material/Container';
import Landing from './components/landing/landing';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container fixed>
        <Navbar />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;