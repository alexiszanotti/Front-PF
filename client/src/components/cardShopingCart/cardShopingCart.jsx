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
  checkoutProducts,
  removeShoppingPersist
} from "../../Redux/Actions/index";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Alert from "@mui/material/Alert";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function CardShopingCart(props) {
  const checkoutProducts = useSelector(state => state.checkoutProducts);
  const logIn = useSelector(state => state.userLogin);
  const users = useSelector(state => state.users);
  const dataBaseShopping = useSelector(state => state.ShoppingAlmacen);
  const productShopping = dataBaseShopping.map(el => el.product);
  const dispatch = useDispatch();


  const stock = [];
  for (let i = 1; i <= props.stock; i++) {
    stock.push(i);
  }

  // const errorSubmitCart = () => {
  //   toast.error('Producto eliminado con éxito', {
  //     position: "bottom-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     });
  // }

  let idUser = logIn.id;
  let usr = users?.filter(user => user.id === logIn.id);
  let cartId = usr?.map(el => el.Cart.id);

  const eliminarProducto = () => {
    if (idUser) {
      dispatch(removeShoppingPersist(props.id))
      dispatch(
        deleteDataBaseShoppingCart({
          cartId: cartId.toString(),
          productId: props.id,
        })
      );
      setTimeout(() => {
        dispatch(addDataBaseShoppingCart(cartId.toString()));
      }, 300);
      // errorSubmitCart()
    } else {
      dispatch(removeCard(props.id));
    }
  };

  const [cantidad, setCantidad] = useState(1);
  // const [valor, setValor] = useState({
  //   checkoutProducts,
  // });
  //cantidad es una variable vacia 98
  //set cantidad es una funcion para modificar la cantidad
 
  useEffect(() =>{
    if(idUser){
      const auxId = checkoutProducts.map((el) => {
        if(el.cantidad === 1){
          return el.productId
        }
      } )
      if(!auxId.includes(props.id))
        dispatch(addtotalCompras({
          productId: props.id,
          cantidad: 1,
          images: props.images,
          price: props.price,
          title: props.title,
        }))

    }
  },[dispatch, addtotalCompras ])
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
      // dispatch(checkoutProducts(valor))
      console.log(checkoutProducts);
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
                {
                  idUser ?  cantidad == 0 || cantidad == undefined ? (
                    <h5>Seleccione una Cantidad</h5>
                  ) : cantidad === 1 ? (
                    <h5>$ {props.price}</h5>
                  ) : (
                    <h5>$ {props.price * cantidad}</h5>
                  ) : <h5>{props.price}</h5>
                }
               
              </Typography>
              {
                idUser ? <div>
                <h5>La Cantidad es : {cantidad} </h5>
                <ArrowBackIosNewIcon onClick={disminuirCantidad} />
                <ArrowForwardIosIcon onClick={agregarCantidad} />
              </div> : null
              }
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
