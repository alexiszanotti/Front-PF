import './App.css';
import Navbar from './components/navBar/navBar';
import Home from './components/home/home';
import Container from '@mui/material/Container';
function App() {
  return (
    <div className="App">
      <Container fixed>
        <Navbar />
        <Home />
      </Container>
    </div>
  );
}

export default App;
