import "./product.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { favorite, removeFavorite } from "../../Redux/Actions/index";

export default function Products(props) {
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(false);
  const handleChange = event => {
    setChecked(event.target.checked);
    if (checked === false) {
      dispatch(favorite(props.id));
    } else {
      dispatch(removeFavorite(props.id));
    }
  };

  return (
    <div className='productContainer'>
      <Card className='contenedorProduct' sx={{ maxWidth: 335 }}>
        <CardHeader title={props.title} subheader={props.price} />
        <Link to={`/detail/${props.id}`}>
          <CardMedia component='img' height='400' image={props.image} title='adidas sneaker' />
        </Link>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
