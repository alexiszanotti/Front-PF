import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCard } from "../../Redux/Actions/index";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Badge from '@mui/material/Badge';
export default function CardShopingCart(props) {
  const [count, setCount] = useState(0);

  const stock = [];
  for (let i = 1; i <= props.stock; i++) {
    stock.push(i);
  }

  const dispatch = useDispatch();
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardActions>
        <Button onClick={() => dispatch(removeCard(props.id))}>ELIMINAR</Button>
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
