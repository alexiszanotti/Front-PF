import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch} from 'react-redux';
import {removeFavorite} from "../../Redux/Actions/index"
import {Link} from "react-router-dom";
import "./cardFavorite.css"

export default function CardFavorite(props) {
    const dispatch = useDispatch();
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
                <Button onClick={() => dispatch(removeFavorite(props.id))}>ELIMINAR</Button>
            </CardActions>
                {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">talle</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="talle"
                    >
                    <MenuItem value={10}>40</MenuItem>
                    <MenuItem value={20}>41</MenuItem>
                    <MenuItem value={30}>45</MenuItem>
                    </Select>
                </FormControl> */}
        </Card>
    );
}