import React, { useEffect, useState } from "react";
import { detailProducts, shoppingCart } from "../../Redux/Actions/index.jsx";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Modal } from "@material-ui/core";
import "./detail.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CreateReview from "../createReview/createReview";
import Rating from "@mui/material/Rating";

export default function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const detail = useSelector(state => state.detail);

  useEffect(() => {
    setTimeout(() => {
      dispatch(detailProducts(props.match.params.id));
    }, 500);
  }, [dispatch, props.match.params.id]);

  const cart = useSelector(state => state.shoppingCart);
  let total = 0;
  let suma = cart.map(el => Number(el.salePrice));
  for (let i of suma) total += i;

  function handleButtonHome(e) {
    e.preventDefault();
    history.push("/home");
  }

  const [modal1, setModal1] = useState(false);

  const openCloseModal1 = () => {
    setModal1(!modal1);
  };
  const dispatchCart = () => {
    dispatch(shoppingCart(props.match.params.id));
  };

  function handleButtonCart(e) {
    e.preventDefault();
    history.push(`/carrito/` + props.match.params.id);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const carrito = (
    <div className='detailContainer'>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          <h3 className='carritoTitle'>Añadido al carrito correctamente</h3>
        </Typography>
        <div className='carritoDiv'>
          {detail?.map(products => {
            return (
              <div>
                <h4>{products.productName}</h4>
                <ul className='detailUl'>
                  <li>{products.collection.name}</li>
                  <br></br>
                  <img alt='k' className='img' src={products.images} />
                  <br></br>
                  <br></br>
                  <li>{"$ " + Number(products.salePrice)}</li>
                </ul>
              </div>
            );
          })}
          <div className='carritoTotal'>
            <h4>TU CARRITO</h4>
            <h4>
              TOTAL ({cart.length} {cart.length === 1 ? "PRODUCTO" : "PRODUCTOS"} ): $ {total}
            </h4>
          </div>
        </div>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <Link to={"/home"}>
            <button className='btn1'>Seguir comprando</button>
          </Link>
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <button className='btn2' onClick={handleButtonCart}>
            Ver carrito
          </button>
        </Typography>
      </Box>
    </div>
  );

  const stock = [];
  let stock1 = detail?.map(products => products.stock);
  for (let i = 1; i <= stock1; i++) {
    stock.push(i);
  }

  let primero = [];
  let segundo = [
    {
      review: null,
      score: null,
    },
  ];
  console.log("DETALLE", detail);
  if (detail.length > 0) {
    if (detail[0].hasOwnProperty("reviews")) {
      if (detail[0].reviews.length > 0) {
        if (detail[0].reviews[0].hasOwnProperty("review")) {
          primero = detail.map(el => el.reviews);
          segundo = primero.flat();
        }
      }
    }
  }

  return (
    <div className='container'>
      {detail.map(products => {
        return (
          <div className='detailContainer'>
            <Card sx={{ maxWidth: 820 }}>
              <CardContent className='misComprasCard'>
                <div>
                  <Typography gutterBottom variant='h5' component='div'>
                    <div className='cardTitle'>
                      <h3>{products.productName}</h3>
                    </div>
                    <li>{products.collection.name}</li>
                    <br></br>
                    <li>{products.gender}</li>
                    <br></br>
                    <img alt='k' className='img' src={products.images} />
                  </Typography>
                </div>
                <div className='detailContainerCard'>
                  <Typography variant='body2' color='text.secondary'>
                    <li className='detailSummary'>{products.description}</li>
                    <br></br>
                    <li>{"$" + Number(products.salePrice)}</li>
                    <div>
                      <button
                        type='button'
                        onClick={() => openCloseModal1(dispatchCart())}
                        className='btn6'
                      >
                        Agregar al carrito
                      </button>
                      <Modal open={modal1} onClose={openCloseModal1}>
                        {carrito}
                      </Modal>
                    </div>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
      <div className='detailContainer'>
        {/* {segundo.length === 0 || segundo === undefined ? (
          <h4>No hay reseñas</h4>
        ) : (
          segundo.map(el => {
            return (
              <div>
                <CreateReview review={el.review} score={el.score} />
              </div>
            );
          })
        )}
        <h2>Puntuación general</h2>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        > */}
        {/* <Rating name="half-rating-read" value={average1} precision={0.5} readOnly /> */}
        {/* <h4>{average1}</h4> */}
        {/* </Box> */}
        <Card sx={{ maxWidth: 820 }}>
          <h1 className='title-reneged'>Reseñas</h1>
          <CardContent className='misComprasCard'>
            <div>
              <Typography gutterBottom variant='h5' component='div'>
                {segundo.length === 0 || segundo === undefined
                  ? null
                  : segundo.map(el => {
                      return (
                        <div>
                          <CreateReview review={el.review} score={el.score} />
                        </div>
                      );
                    })}
                {/* <h4>Puntuación general</h4>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                > 
              <Rating name="half-rating-read" value={average1} precision={0.5} readOnly /> 
              <h4>{average1}</h4> 
              </Box>  */}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <button onClick={handleButtonHome} className='btn5'>
        Home
      </button>
      <br></br>
    </div>
  );
}
