import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  removeFavorite,
  deleteDataBaseFavorite,
  addDataBaseFavorite,
} from "../../Redux/Actions/index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./cardFavorite.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardFavorite(props) {
  const dispatch = useDispatch();
  const logIn = useSelector((state) => state.userLogin);
  let idUser = logIn.id;

  const errorSubmit = () => {
    toast.error('Producto eliminado con éxito', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  function handleClick() {
    if (idUser) {
      dispatch(
        deleteDataBaseFavorite({
          userId: idUser.toString(),
          productId: props.id,
        })
      );
      setTimeout(() => {
        dispatch(addDataBaseFavorite(idUser));
      }, 200)
      errorSubmit()
    } else {
      dispatch(removeFavorite(props.id));
    }
  }
  return (
    <div>
      <Card sx={{ maxWidth: 345 }} className="contenedorCardFavorite">
        <CardActionArea>
          <Link to={`/detail/${props.id}`}>
            <CardMedia
              component="img"
              height="180"
              image={props.images}
              alt="green iguana"
            />
          </Link>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="h4" color="text.secondary">
              { "$" + props.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={handleClick}>ELIMINAR</Button>
        </CardActions>
      </Card>
      <ToastContainer />
    </div>
  );
}
