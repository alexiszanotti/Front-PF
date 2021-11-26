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
  deleteDataBaseShoppingCart
} from "../../Redux/Actions/index";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
export default function Products(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const users = useSelector((state) => state.users);
  let usr = users.filter((user) => user.id === userLogin.id);
  let cartId = usr.map((el) => el.Cart.id);
  let idUser = userLogin.id;

  // const shoppingCartLocal = useSelector((state) => state.shoppingCart);
  // const idShoppingCartLocal = shoppingCartLocal.map((el) => el.id);
  // console.log(idShoppingCartLocal.toString())
  
  //   if (idUser) {
  //     if(Object.keys(shoppingCartLocal).length !== 0){
  //           dispatch(
  //             postShoppingCart({
  //               cartId: cartId.toString(),
  //               productId: idShoppingCartLocal.toString() ,
  //             })
  //           );
  //           dispatch(addDataBaseShoppingCart(cartId.toString()));
  //           // dispatch(postFavorite({ userId: idUser, productId: idPorducs[i] }));
        
  //         }
  //         dispatch(emptyCart());
  //   }


  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked2] = React.useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked === false) {
      if(idUser){
        console.log("entro")
        dispatch(
          postFavorite({
            productId: props.id,
            userId: idUser,
          })
        );
        dispatch(addDataBaseFavorite(idUser));
        
      }else{
        dispatch(favorite(props.id));
      }
    } else {
      dispatch(removeFavorite(props.id));
    }
  };

  const handleChangeCarrito = (event) => {
    setChecked2(event.target.checked);
    if (checked1 === false) {
      if (idUser) {
          dispatch(
            postShoppingCart({
              cartId: cartId.toString(),
              productId: props.id,
            })
          );
          dispatch(addDataBaseShoppingCart(cartId.toString()));
        
          
      }else{

        dispatch(shoppingCart(props.id));
      }
    } else {
      if(idUser){
        dispatch(deleteDataBaseShoppingCart({cartId: cartId.toString(), productId: props.id}));
        
      }else{
        dispatch(removeCard(props.id));
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

          {props.stock === "0.00" ? (
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
              onChange={handleChangeCarrito}
              icon={<ShoppingCartIcon />}
              checkedIcon={<ShoppingCartIcon />}
            />
          )}
        </CardActions>
      </Card>
    </div>
  );
}
