import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCard,
  deleteDataBaseShoppingCart,
  addDataBaseShoppingCart
} from "../../Redux/Actions/index";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Alert from "@mui/material/Alert";
export default function CardShopingCart(props) {
  const logIn = useSelector((state) => state.userLogin);
  const users = useSelector((state) => state.users);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const stock = [];
  for (let i = 1; i <= props.stock; i++) {
    stock.push(i);
  }

  let idUser = logIn.id;
  let usr = users?.filter((user) => user.id === logIn.id);
  let cartId = usr?.map((el) => el.Cart.id);

  const handleDetele = () => {
    if (idUser) {
      dispatch(
        deleteDataBaseShoppingCart({
          cartId: cartId.toString(),
          productId: props.id,
        })
      );
      setTimeout(() =>{
        dispatch(addDataBaseShoppingCart(cartId.toString()));
      }, 200)
    } else {
      dispatch(removeCard(props.id));
    }
  };

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActions>
        <Button onClick={handleDetele}>ELIMINAR</Button>
        {
          props.stock > 0 ? (
            null
          ) : (
            <Alert variant="outlined" severity="error">
            Stock no disponible
          </Alert>
          )
        }
      </CardActions>
      <CardActionArea>
        <Link to={`/detail/${props.id}`}>
          <CardMedia
            component="img"
            height="200"
            image={props.images}
            alt="green iguana"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {count <= 0 ? (
              <h3>ERROR</h3>
            ) : count === 1 ? (
              props.price
            ) : (
              props.price * count
            )}
          </Typography>
          <div>
            <p>Cantidad/es {count} </p>
            <ArrowBackIosNewIcon onClick={() => setCount(count - 1)} />
            <ArrowForwardIosIcon onClick={() => setCount(count + 1)} />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
