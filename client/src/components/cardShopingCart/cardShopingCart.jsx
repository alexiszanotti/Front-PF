import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCard,
  deleteDataBaseShoppingCart,
  addDataBaseShoppingCart,
  addtotalCompras,
  removetotalCompras,
  removeShoppingPersist,
} from "../../Redux/Actions/index";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Alert from "@mui/material/Alert";

export default function CardShopingCart(props) {
  const checkoutProducts = useSelector(state => state.checkoutProducts);
  const logIn = useSelector(state => state.userLogin);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const stock = [];
  for (let i = 1; i <= props.stock; i++) {
    stock.push(i);
  }

  let idUser = logIn.id;
  let usr = users?.filter(user => user.id === logIn.id);
  let cartId = usr?.map(el => el.Cart.id);

  const eliminarProducto = () => {
    if (idUser) {
      dispatch(removeShoppingPersist(props.id));
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
       
      }, 300);
    } else {
      dispatch(removeCard(props.id));
    }
  };

  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (idUser) {
      const auxId = checkoutProducts.map(el => {
        if (el.cantidad === 1) {
          return el.productId;
        }
        return null;
      });
      if (!auxId.includes(props.id))
        dispatch(
          addtotalCompras({
            productId: props.id,
            cantidad: 1,
            images: props.images,
            price: props.price,
            title: props.title,
          })
        );
    }
  }, [dispatch, checkoutProducts, idUser, props.id, props.images, props.price, props.title]);
  const agregarCantidad = () => {
    if (cantidad === props.stock) {
      setCantidad(cantidad);
      // dispatch(checkoutProducts(valor))
    } else {
      setCantidad(cantidad + 1);
      dispatch(
        addtotalCompras({
          productId: props.id,
          cantidad: 1,
          images: props.images,
          price: props.price,
          title: props.title,
        })
      );
      // dispatch(checkoutProducts(valor))
    }
  };

  const disminuirCantidad = () => {
    if (cantidad < 1) {
      setCantidad(cantidad);
      // dispatch(checkoutProducts(valor))
    } else {
      setCantidad(cantidad - 1);
      dispatch(
        removetotalCompras({
          productId: props.id,
        })
      );
    }
  };

  return (
    <div>
      <div>
        <Card sx={{ maxWidth: 350 }}>
          <CardActions>
            <Button onClick={eliminarProducto}>ELIMINAR</Button>
            {props.stock > 0 ? null : (
              <Alert variant='outlined' severity='error'>
                Stock no disponible
              </Alert>
            )}
          </CardActions>
          <CardActionArea>
            <Link to={`/detail/${props.id}`}>
              <CardMedia component='img' height='200' image={props.images} alt='green iguana' />
            </Link>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {props.title}
              </Typography>
              <Typography variant='h4' color='text.secondary'>
                {idUser ? (
                  cantidad === 0 || cantidad === undefined ? (
                    <p>Seleccione una Cantidad</p>
                  ) : cantidad === 1 ? (
                    <p>$ {props.price}</p>
                  ) : (
                    <p>$ {props.price * cantidad}</p>
                  )
                ) : (
                  <p>$ {props.price}</p>
                )}
              </Typography>
              {idUser ? (
                <div>
                  <h5>La Cantidad es : {cantidad} </h5>
                  <ArrowBackIosNewIcon onClick={disminuirCantidad} />
                  <ArrowForwardIosIcon onClick={agregarCantidad} />
                </div>
              ) : null}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
