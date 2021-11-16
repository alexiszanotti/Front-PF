import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Logo from "../../images/adidasLogo.png";
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import { useSelector, useDispatch } from "react-redux";
import { shoppingCart, favorite } from "../../Redux/Actions/index.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function NavBar() {


  // ----- esto pertenece al local storage donde guardamos el usuario --------
  const localStorage = window.localStorage;

  const logIn = JSON.parse(localStorage.getItem('user'));

  const avatar = logIn.userName?.slice(0,1).toUpperCase();

  //console.log(logIn)

  const logOut = () => {

    localStorage.setItem("user", JSON.stringify({

      id: null,
      type: 'Other',
      userName: '',

    }));

  }

  // ----- esto pertenece al local storage donde guardamos el usuario --------

  const dispatch = useDispatch();

  const aux = useSelector(state => state.shoppingCart);
  const fav = useSelector(state => state.favorite);
// --------------- por ahora no tocar esto-------------------
  var hash = {};
  let favo = fav.filter(function(current) {
   var exists = !hash[current.id];
   hash[current.id] = true;
   return exists;
 });
// -----------------------------------------------------------
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(shoppingCart());
    dispatch(favorite());
  }, [dispatch]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to='/login'>
        <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      </Link>
      {/* <Link to='/register'>
        <MenuItem onClick={handleMenuClose}>Register</MenuItem>
      </Link> */}
      <Link to='/upDateUser'>
        <MenuItem onClick={handleMenuClose}>Modificar Usuario</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>LOGIN</p>
      </MenuItem>
      <MenuItem>
        <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>REGISTER</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>PROFILE</p>
      </MenuItem>
    </Menu>
  );

  const [anchor, setAnchor] = React.useState(null);

  const open = Boolean(anchor);

  const handleClick = (event) => {

    setAnchor(event.currentTarget);

  };

  const handleClose = () => {

    setAnchor(null);
  };

  const renderAvatar = () => {

    if(logIn.type === 'User') {

      return (

        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>{avatar}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logOut} >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
  
      )

    } else {

      return (

        <>

          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
          <AccountCircle color='action' />
          </IconButton>

        </>

      )

    }

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' className='navBar' sx={{ bgcolor: "white" }}>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to='/'>
              <img src={Logo} width='50' height='40' />
            </Link>
          </Typography>

          <SearchBar />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              color='inherit'
            >
              <Link to='/createProduct'>
                <AddCircleIcon color='action' />
              </Link>
            </IconButton>

            {renderAvatar()}

            <Badge badgeContent={favo.length} color='error'>
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                color='inherit'
              >
                <Link to='/favorites/:'>
                  <FavoriteIcon color='action' />
                </Link>
              </IconButton>
            </Badge>
            <Badge badgeContent={aux.length} color='error'>
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                color='inherit'
              >
                <Link to='/carrito/:'>
                  <ShoppingCartIcon color='action' />
                </Link>
              </IconButton>
            </Badge>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
