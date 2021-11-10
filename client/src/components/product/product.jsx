
import "./product.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom"
const defaultIMG = [
  "https://essential.vteximg.com.br/arquivos/ids/435382-454-423/261-2401_1.jpg?v=637582266896100000",
  "https://media.revistagq.com/photos/5f3a392d64de88802df64e59/master/w_1024,h_683,c_limit/20200609-adidas-11.jpg",
  "https://cdn.shopify.com/s/files/1/0024/0992/2620/products/Zapatillas_Superstar_Bold_Mujer_Blanco_FV3334_01_standard_480x480.jpg?v=1596721771",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/56f72915b0de4d0ca8adacd100e41c77_9366/Zapatillas_adidas_Grand_Court_Verde_GV7149_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/6650f81809b7414abffbacd100e4bc50_9366/Zapatillas_Grand_Court_SE_Blanco_H02029_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c7227d99699243099c24ac5e00406c2c_9366/Zapatillas_Forum_Mid_Blanco_FY4976_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/21ac463c2ed24e269f25ad4a009ba11f_9366/Zapatillas_EQ21_Run_Azul_H00513_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/df99c51ff48d4967aeb0ac3700737271_9366/Zapatillas_Run_60s_2.0_Blanco_FZ0963_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/92aa10ad991842cda680ab8200d6d30e_9366/Zapatillas_Nite_Jogger_Negro_FV1277_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/b19f906a930a48da810bad1801602f3b_9366/Zapatillas_Racer_TR21_Granate_GZ8183_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/8951a65dbcf9491f92c8ac9900f45c2d_9366/Zapatillas_Ultraboost_21_Naranja_FZ1924_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/e565b750023e409d9658ad5600e489ff_9366/Zapatillas_X9000L3_COLD.RDY_Gris_FZ4088_01_standard.jpg",
  "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/16216c130f5846ed8c9eabc600b3ea6f_9366/Zapatillas_ZX_2K_Boost_Blanco_FX8835_01_standard.jpg"

]
export default function Products(props) {

  let random = defaultIMG[Math.floor(Math.random()*defaultIMG.length)]
  console.log(random)


  const onMediaFallback = event => event.target.src = random;
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
    </div>
  );
}
