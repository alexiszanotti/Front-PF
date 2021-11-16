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

const drawerWidth = 240;

export default function NavBarA() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , bgcolor: "white"}}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{color: "black"}}>
            <Link to='/admin'>
            ADMIN
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem button >
                  <Link to='/admin/userUpdata'>
                    <Button>MODIFICAR USUARIOS</Button> 
                    </Link>
              </ListItem>
              <ListItem button >
                  <Link to="/admin/createProduct">
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
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}