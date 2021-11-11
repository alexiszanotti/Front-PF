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

  
  return (
    <div className="container">


      {detail.map((products) => {
        return (
          <div className="detailContainer">
            <h1>{products.productName}</h1>
            <ul className="detailUl">
              {/* <li>{products.coleccion}</li> */}
              <br></br>
              <img className="img" src={products.images[0]} />
              <br></br>
              <br></br>
              <br></br>
              <li className="detailSummary">{products.description}</li>
              <br></br>
              <li >{products.salePrice + "$"}</li>
            </ul>
            <li>
            <Link to={`/carrito/${props.id}`}>
              <button onClick={handleButtonFavorite} className="btn1"><FavoriteIcon />
              </button> 
            </Link>
            <Link to={`/carrito/${detail.map((el) =>el.id) }`}>
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
      



      <button onClick={handleButtonHome} className="btn">Home</button>
      <br></br>
    </div>
  );
}
