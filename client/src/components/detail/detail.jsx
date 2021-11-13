// import Styles from "./detail.css";
import React, { useEffect } from "react";
import { detailProducts } from "../../Redux/Actions/index.jsx";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {Link} from "react-router-dom";
import "./detail.css"

export default function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { id } = useParams();
  const detail = useSelector((state) => state.detail);

  


  useEffect(() => {
    dispatch(detailProducts(props.match.params.id))
  }, [dispatch]);

  function handleButtonHome(e) {
    e.preventDefault();
    history.push("/home");
  }

  function handleButtonShop(e) {
    e.preventDefault();
    history.push("/home");
  }

  function handleButtonFavorite(e) {
    e.preventDefault();
    history.push("/home");
  }


  const review = [
    {
      Nombre: "Teo",
      Puntuacion: "1",
      DetalleDeLaCompra: "Muy malo el producto"
    },
    {
      Nombre: "Enzo",
      Puntuacion: "4",
      DetalleDeLaCompra: "Muy bueno"
    },
    {
      Nombre: "Ale",
      Puntuacion: "5",
      DetalleDeLaCompra: "Excelentes"
    }
  ]

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const [value, setValue] = React.useState(2);
const [hover, setHover] = React.useState(-1);
  
  return (
    <div className="container">


      {detail.map((products) => {
        return (
          <div className="detailContainer">
            <h1>{products.productName}</h1>
            <ul className="detailUl">
              <li>{products.collection.name}</li>
              <br></br>
              <img className="img" src={products.images[0]} />
              <br></br>
              <br></br>
              <br></br>
              <li className="detailSummary">{products.description}</li>
              <br></br>
              <li >{Number(products.salePrice) + "$"}</li>
            </ul>
            <FormControl sx={{ m: 1, minWidth: 80 }} className="detailS">
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
                </FormControl>
                <br></br>
                <br></br>
            <li>
            <Link to={`/favorites/${detail.map((el) =>el.id)}`}>
              <button  className="btn1"><FavoriteIcon /></button> 
            </Link>
            <Link to={`/carrito/${detail.map((el) =>el.id)}`}>
              <button className="btn2"><ShoppingCartIcon /></button>
            </Link>
              </li>
          </div>
        )
      })
      }

       <div className="detailContainer">
        <h1>Valoraciones y reseñas</h1>
        <table>
          <th scope="col">Nombre</th>
          {
            review.map((product) => {
              return (
                <th>{product.Nombre}</th>
              )
            })
          }
        </table>
        <table>
          <th scope="col">Detalle de la compra</th>
          {
            review.map((product) => {
              return (
                <th >{product.DetalleDeLaCompra}</th>
              )
            })
          }
        </table>
        <table>
          <th scope="col">Puntuación</th>
          {
            review.map((product) => {
              return (
                <th>{product.Puntuacion}</th>
              )
            })
          }
        </table>
        <div>
          <button type='submit' className="btn3">Escribir una reseña</button>
            </div>
      </div> 
      <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className = "detailContainer"
        >

        <div className="detailBox">
          <h1>Reseñas y validaciones</h1>
          <TextField
            required
            id="outlined-required"
            label="Nombre de usuario"
            // placeholder="Nombre de usuario"
            />
          <TextField
            required
            id="outlined-required"
            label="Detalle de la compra"
            // placeholder="Detalle de la compra"
            />

          <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
            >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}

          </Box>
          <br></br>
          <div>
          <button type='submit' className="btn">Publicar</button>
            </div>
        </div>
      </Box>      



      <button onClick={handleButtonHome} className="btn">Home</button>
      <br></br>
    </div>
  );
}
