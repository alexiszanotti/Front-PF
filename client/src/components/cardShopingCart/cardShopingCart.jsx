import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeCard, deleteDataBaseShoppingCart } from "../../Redux/Actions/index";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Badge from '@mui/material/Badge';
export default function CardShopingCart(props) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const logIn = useSelector(state => state.userLogin);
  let idUser = logIn.id;
  const users = useSelector((state) => state.users);
  let usr = users.filter((user) => user.id === logIn.id);
  let cartId = usr.map((el) => el.Cart.id);

  const stock = [];
  for (let i = 1; i <= props.stock; i++) {
    stock.push(i);
  }

  console.log(props.stock);

  useEffect(() => {
    dispatch(deleteDataBaseShoppingCart())
  },[dispatch])

  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActions>
        <Button onClick={
          idUser ? () => dispatch(deleteDataBaseShoppingCart({cartId: cartId.toString() , productId: props.id})) : () => dispatch(removeCard(props.id))
        }>ELIMINAR</Button>
        <Badge badgeContent={
            count === 0 ? props.stock : props.stock - count
        } color="primary">
          <Inventory2Icon />
        </Badge>
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
            {count <= 0 ? <h3>ERROR</h3> : count ===1 ?  props.price : props.price * count}
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
