import "./product.css";
import React, {useEffect} from "react";
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
import swal from 'sweetalert';
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
  deleteDataBaseShoppingCart
} from "../../Redux/Actions/index";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
export default function Products(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const users = useSelector((state) => state.users);
  const allProducts= useSelector((state) => state.products);
  const favoritosUser = useSelector((state) => state.favoriteAlmacen);
  let usr = users.filter((user) => user.id === userLogin.id);
  let cartId = usr.map((el) => el.Cart.id);
  let idUser = userLogin.id;

  const shoppingCartLocal = useSelector((state) => state.shoppingCart);
  const idShoppingCartLocal = shoppingCartLocal.map((el) => el.id);
  const favoritosLocal = useSelector((state) => state.favorite);
  const idFavoritosLocal = favoritosLocal.map((el) => el.id);

  if(idUser){
    if(Object.keys(shoppingCartLocal).length !== 0){
      for(let i=0; i<idShoppingCartLocal.length; i++){
        dispatch(
          postShoppingCart({
            cartId: cartId.toString(),
            productId: idShoppingCartLocal[i].toString() ,
          })
        );
        dispatch(addDataBaseShoppingCart(cartId.toString()));
      }
      dispatch(emptyCart());
    }
  }

  if(idUser){
    if(Object.keys(favoritosLocal).length !== 0){
      for(let i=0; i<idFavoritosLocal.length; i++){
        dispatch(
          postFavorite({
            userId: idUser,
            productId: idFavoritosLocal[i].toString() ,
          })
        );
        dispatch(addDataBaseFavorite(idUser));
      }
      dispatch(emptyFavorites());
    }
  }



  
  
  
  let [checked, setChecked] = React.useState(false);
  let [checked1, setChecked2] = React.useState(false);
  

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked === false) {
      if(idUser){
        dispatch(
          postFavorite({
            productId: props.id,
            userId: idUser,
          })
        );
        dispatch(addDataBaseFavorite(idUser));
        swal("Se agrego a favoritos", "Producto agregado con éxito!", "success");
      }else{
        dispatch(favorite(props.id));
        swal("Se agrego a favoritos", "Producto agregado con éxito!", "success");
      }
    } else {
      dispatch(removeFavorite(props.id));
    }
  };

  const handleChangeCarrito = (event) => {
    setChecked2(event.target.checked);
    if (checked1 === false) {
      if (idUser) {
        dispatch(addDataBaseShoppingCart(cartId.toString()));
          dispatch(
            postShoppingCart({
              cartId: cartId.toString(),
              productId: props.id,
            })
          );
          dispatch(addDataBaseShoppingCart(cartId.toString()));
          swal("Se agrego al carrito", "Producto agregado con éxito!", "success");
      }else{
        swal("Se agrego al carrito", "Producto agregado con éxito!", "success");
        dispatch(shoppingCart(props.id));
      }
    } else {
      if(idUser){
        dispatch(deleteDataBaseShoppingCart({cartId: cartId.toString(), productId: props.id}));
        swal("Se elimino con exito", "Producto agregado con éxito!", "error");
        dispatch(addDataBaseShoppingCart(cartId.toString()));
        
      }else{
        dispatch(removeCard(props.id));
        swal("Se elimino con exito", "Producto agregado con éxito!", "error");
      }
      
    }
  };

  



  return (
    <div className="productContainer">
      <Card className="contenedorProduct" sx={{ maxWidth: 400 }}>
        <CardHeader title={props.title} subheader={props.price} />
        <Link to={`/detail/${props.id}`}>
          <CardMedia
            component="img"
            height="400"
            image={props.image}
            title="adidas sneaker"
          />
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
                checked
              />
              <Alert variant="outlined" severity="error">
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
              <Alert variant="filled" severity="warning">
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
    </div>
  );
}
