import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch} from 'react-redux';
import {removeFavorite, deleteDataBaseFavorite, addDataBaseFavorite} from "../../Redux/Actions/index"
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import "./cardFavorite.css"

export default function CardFavorite(props) {
    const dispatch = useDispatch();
    const logIn = useSelector((state) => state.userLogin);
    let idUser = logIn.id;
    return (
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
                    {props.price + "$"}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() =>{
                    if(idUser){
                        console.log("entro")
                        window.location.reload("");
                        dispatch(deleteDataBaseFavorite({userId: idUser.toString(), productId: props.id}))
                        dispatch(addDataBaseFavorite(idUser));
                    }else{
                        dispatch(removeFavorite(props.id))
                    }
                } }>ELIMINAR</Button>
            </CardActions>
        </Card>
    );
}