import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import {removeFavorite} from "../../Redux/Actions/index"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
import "./cardFavorite.css"

export default function CardFavorite(props) {
    const dispatch = useDispatch();
    return (
        <Card sx={{ maxWidth: 345 }} className="contenedorCardFavorite">
            <CardActions>
                <Button onClick={() => dispatch(removeFavorite(props.id))}>ELIMINAR</Button>
            </CardActions>
            <CardActionArea>
                <CardMedia
                component="img"
                height="180"
                image={props.images}
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.title}
                </Typography>
                <Typography variant="h4" color="text.secondary">
                    {props.price + "$"}
                </Typography>
                </CardContent>
            </CardActionArea>
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