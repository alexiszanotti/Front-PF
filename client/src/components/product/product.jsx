import "./product.css";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

import {
  favorite,
  removeFavorite,
  shoppingCart,
  removeCard,
  postShoppingCart,
  addDataBaseShoppingCart,
  postFavorite,
  addDataBaseFavorite,
  emptyCart,
  emptyFavorites,
  deleteDataBaseShoppingCart,
  deleteDataBaseFavorite,
} from "../../Redux/Actions/index";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const users = useSelector(state => state.users);
  const favoritosUser = useSelector(state => state.favoriteAlmacen);
  const shoppingUser = useSelector(state => state.ShoppingAlmacen);
  let usr = users.filter(user => user.id === userLogin.id);
  let cartId = usr.map(el => el.Cart.id);
  let idUser = userLogin.id;

  const shoppingCartLocal = useSelector(state => state.shoppingCart);
  const idShoppingCartLocal = shoppingCartLocal.map(el => el.id);
  const favoritosLocal = useSelector(state => state.favorite);
  const idFavoritosLocal = favoritosLocal.map(el => el.id);

  
  const successSubmitFavorite = () => {
    toast.success('Producto guardado con éxito', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
  }

  const errorSubmitFavorite = () => {
    toast.error('Producto eliminado éxito', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
  }

  const successSubmitCart = () => {
    toast.success('Producto agregado con éxito', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
  }

  const errorSubmitCart = () => {
    toast.error('Producto eliminado con éxito', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
  }

  if (idUser) {
    if (Object.keys(shoppingCartLocal).length !== 0) {
      for (let i = 0; i < idShoppingCartLocal.length; i++) {
        dispatch(
          postShoppingCart({
            cartId: cartId.toString(),
            productId: idShoppingCartLocal[i].toString(),
          })
        );
        setTimeout(() => {
          if(cartId){
            dispatch(addDataBaseShoppingCart(cartId.toString()));
          }
         
        }, 200);
      }
      dispatch(emptyCart());
    }
  }

  if (idUser) {
    if (Object.keys(favoritosLocal).length !== 0) {
      for (let i = 0; i < idFavoritosLocal.length; i++) {
        dispatch(
          postFavorite({
            userId: idUser,
            productId: idFavoritosLocal[i].toString(),
          })
          );
        setTimeout(() => {
          dispatch(addDataBaseFavorite(idUser));
        }, 200);
      }
      dispatch(emptyFavorites());
    }
  }

  const idShop = shoppingUser?.map(el => el.product.id);
  const idFav = favoritosUser?.products?.map(e => e.id);

  let [checked, setChecked] = React.useState(idFav?.includes(props.id) ? true : false);
  let [checked1, setChecked2] = React.useState(idShop?.includes(props.id) ? true : false);

  const handleChange = event => {
    setChecked(event.target.checked);
    if (checked === false) {
      if (idUser) {
        dispatch(
          postFavorite({
            productId: props.id,
            userId: idUser,
          })
        );
        setTimeout(() => {
          dispatch(addDataBaseFavorite(idUser));
        }, 200);
        successSubmitFavorite()
      } else {
        dispatch(favorite(props.id));
        successSubmitFavorite()
      }
    } else {
      if (idUser) {
        dispatch(
          deleteDataBaseFavorite({
            userId: idUser.toString(),
            productId: props.id,
          })
        );
        setTimeout(() => {
          dispatch(addDataBaseFavorite(idUser));
        }, 200);
        errorSubmitFavorite()
      } else {
        dispatch(removeFavorite(props.id));
        errorSubmitFavorite()
      }
    }
  };

  const handleChangeCarrito = event => {
    setChecked2(event.target.checked);
    if (checked1 === false) {
      if (idUser) {
        dispatch(
          postShoppingCart({
            cartId: cartId.toString(),
            productId: props.id,
          })
        );
        setTimeout(() => {
          if(cartId){
            dispatch(addDataBaseShoppingCart(cartId.toString()));
          }
          
        }, 200);
        successSubmitCart()
      } else {
        dispatch(shoppingCart(props.id));
        successSubmitCart()
      }
    } else {
      if (idUser) {
        dispatch(
          deleteDataBaseShoppingCart({
            cartId: cartId.toString(),
            productId: props.id,
          })
        );

        setTimeout(() => {
          if(cartId){
            dispatch(addDataBaseShoppingCart(cartId.toString()));
          }
          
        }, 200);
        errorSubmitCart()
      } else {
        dispatch(removeCard(props.id));
        errorSubmitCart()
      }
    }
  };

  return (
    <div className='productContainer' key={props.id}>
      <Card className='contenedorProduct' sx={{ maxWidth: 400 }}>
        <CardHeader title={props.title} subheader={props.price} />
        <Link to={`/detail/${props.id}`}>
          <CardMedia component='img' height='400' image={props.image} title={props.title} />
        </Link>
        <CardActions disableSpacing>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />

          {props.stock === 0 ? (
            <>
              <Checkbox
                checked={checked1}
                onChange={handleChangeCarrito}
                icon={<ShoppingCartIcon />}
                checkedIcon={<ShoppingCartIcon />}
                disabled
              />
              <Alert variant='outlined' severity='error'>
                Stock no disponible
              </Alert>
            </>
          ) : Number(props.stock) < 10 ? (
            <>
              <Checkbox
                checked={checked1}
                onChange={handleChangeCarrito}
                icon={<ShoppingCartIcon />}
                checkedIcon={<ShoppingCartIcon />}
              />
              <Alert variant='filled' severity='warning'>
                Ultimas en stock
              </Alert>
            </>
          ) : (
            <Checkbox
              checked={checked1}
              onClick={handleChangeCarrito}
              icon={<ShoppingCartIcon />}
              checkedIcon={<ShoppingCartIcon />}
            />
          )}
        </CardActions>
      </Card>
      <ToastContainer />
    </div>
  );
}
