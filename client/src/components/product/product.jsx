import "./product.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom"
const defaultIMG = "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Zapatillas_Superstar_Blanco_EG4958_01_standard.jpg"

export default function Products(props) {

  const onMediaFallback = event => event.target.src = defaultIMG;
  return (
    <div>
      
    <Card className="contenedorProduct" sx={{ maxWidth: 345 }} >
      <CardHeader
        title={props.title}
        subheader={props.price}
      />
      <Link to= {`/detail/${props.id}`}>
      <CardMedia
          component="img"
          height="200"
          image={props.image}
          title="adidas sneaker"
          onError={onMediaFallback}
        />
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>

    </div>
  );
}