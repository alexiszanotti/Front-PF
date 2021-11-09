import './App.css';
import Navbar from './components/navBar/navBar';
import Home from './components/home/home';
import Container from '@mui/material/Container';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container fixed>
          <Switch>
            <Route path="/home">
              <Navbar />
              <Home />
            </Route>
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
