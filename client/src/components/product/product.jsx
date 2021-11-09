import "./product.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Products(props) {


  return (
    <div>
    <Card className="contenedorProduct" sx={{ maxWidth: 345 }} >
      <CardHeader
        title={props.title}
        subheader={props.price}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="Imagen no disponible"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>

    </div>
  );
}