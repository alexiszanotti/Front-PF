import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import {removeCard} from "../../Redux/Actions/index"
import {Link} from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


export default function CardShopingCart(props) {
    const stock= []
    for (let i = 1; i <= props.stock; i++) {
        stock.push(i);
      }

    const dispatch = useDispatch();
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardActions>
                <Button onClick={() => dispatch(removeCard(props.id))}>ELIMINAR</Button>
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
                    {props.price + "$"}
                </Typography>
                </CardContent>
            </CardActionArea>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">dispobiles</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="dispobiles"
                    >
                    {
                        stock.map(item => {
                            return <MenuItem value={item}>{item}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
        </Card>
    );
}