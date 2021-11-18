import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {userLogout} from '../../../Redux/Actions/index';
import { useHistory } from 'react-router-dom';
const drawerWidth = 240;
export default function NavBarAdmin() {
  const history = useHistory();
  const dispatch = useDispatch();



  const logOut = () => {

    dispatch(userLogout())
    history.push("/")

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
                    <Link to="/updateProduct">
                    <Button>MODIFICAR PRODUCTOS</Button> 
                    </Link>
              </ListItem>
              <ListItem button >
                  <Link to="/createProduct">
                    <Button>CREAR PRODUCTOS</Button> 
                    </Link>
              </ListItem>
              <ListItem button >
                  <Link to="/createCollection">
                    <Button>CREAR CATEGORIAS</Button> 
                    </Link>
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