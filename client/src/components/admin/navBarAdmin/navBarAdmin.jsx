import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

export default function NavBarAdmin() {
  const History = useHistory()
  const localStorage = window.localStorage;

  const logOut = () => {

    localStorage.setItem("user", JSON.stringify({

      id: null,
      type: 'Other',
      userName: '',

    }));
    History.push("/")
    window.location.replace('');

  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Link to="/" >
        <Button>ADMIN</Button> 
        </Link>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem button >
                  <Link to='/userUpdata'>
                    <Button>MODIFICAR USUARIOS</Button> 
                    </Link>
              </ListItem>
              <ListItem button >
                  <Link to="/createProduct">
                    <Button>CREAR PRODUCTOS</Button> 
                    </Link>
              </ListItem>
              <ListItem button >
                    <Button>EDITAR PRODUCTOS</Button> 
              </ListItem>
              <ListItem button >
                    <Button>STOCK</Button> 
              </ListItem>
              <ListItem button >
                    <Button>ESTADOS DE ORDEN</Button> 
              </ListItem>


          </List>
          <ListItem button >
                    <Button onClick={logOut}>SALIR</Button> 
              </ListItem>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}