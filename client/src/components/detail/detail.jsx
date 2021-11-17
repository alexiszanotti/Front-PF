import React, { useEffect, useState } from "react";
import {
  detailProducts,
  favorite,
  postReview,
  getReview,
  shoppingCart,
} from "../../Redux/Actions/index.jsx";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Modal } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "./detail.css";

const validateForm = input => {
  let error = {};
  if (!input.review) {
    error.review = "La descripción es requerida";
  } else if (input.review.length < 10 || input.review.length > 500) {
    error.review = "La descripción tiene que tener al menos 10 caracteres";
  }
  if (!input.score) {
    error.score = "La puntuación es requerida";
  } else if (isNaN(input.score) || input.score < 0 || input.score > 10) {
    error.score = "Tiene que ser un número entre 0 y 10";
  }
  return error;
};

export default function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const detail = useSelector(state => state.detail);
  const fav = useSelector(state => state.favorite);
  const reseña = useSelector(state => state.review);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    review: "",
    score: "",
    productId: props.match.params.id,
  });

  useEffect(() => {
    dispatch(detailProducts(props.match.params.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReview(props.match.params.id));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(favorite());
  // }, [dispatch]);

  const handleInputChange = e => {
    e.preventDefault();
    // console.log("campo: ", e.target.name, "valor: ", e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validateForm({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(postReview(input));
      console.log(input);
      alert("Reseña creada con éxito");
      openCloseModal();
      dispatch(getReview(input.productId));
      setInput({
        review: "",
        score: "",
        productId: props.match.params.id,
      });
      console.log(input, "actual");
    } else {
      alert("Por favor, complete todos los campos requeridos");
    }
  };

  const cart = useSelector(state => state.shoppingCart);
  let total = 0;
  let suma = cart.map(el => Number(el.salePrice));
  for (let i of suma) total += i;

  function handleButtonHome(e) {
    e.preventDefault();
    history.push("/home");
  }

  const useStyles = makeStyles(theme => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const openCloseModal = () => {
    setModal(!modal);
  };
  const openCloseModal1 = () => {
    setModal1(!modal1);
  };
  const dispatchCart = () => {
    dispatch(shoppingCart(props.match.params.id));
  };

  function handleButtonCart(e) {
    e.preventDefault();
    history.push(`/carrito/`+props.match.params.id);
  }

  // const style1 = {
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   p: 2,
  //   px: 4,
  //   pb: 3,
  // };

  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const reseñas = (
    <div>
      <Box sx={style1}>
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
        <h1>Probando</h1>
      </Typography> */}
        <form onSubmit={e => e}>
          <div className='detailContainer1'>
            <h3>Escriba su reseña</h3>
            <input
              onChange={handleInputChange}
              value={input.review}
              type='text'
              name='review'
              placeholder='Escriba su reseña aquí'
            />
            {error.review && <p className='error'>{error.review} </p>}
            <h3>Puntuación</h3>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating name='score' value={input.score} precision={1} onChange={handleInputChange} />
              {input.score !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : input.score]}</Box>
              )}
            </Box>
            <div>
              <button type='submit' onClick={handleSubmit} className='btn1'>
                Publicar
              </button>
              <button type='submit' onClick={() => openCloseModal()} className='btn2'>
                Cerrar
              </button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );

  const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Backdrop = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const carrito = (
    <div className='detailContainer'>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          <h3 className='carritoTitle'>Añadido al carrito correctamente</h3>
        </Typography>
        <div className='carritoDiv'>
          {detail?.map(products => {
            console.log(detail);
            return (
              <div>
                <h4>{products.productName}</h4>
                <ul className='detailUl'>
                  <li>{products.collection.name}</li>
                  <br></br>
                  <img className='img' src={products.images[0]} />
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
          {/* <Link to={`/carrito/${detail.map(el => el.id)}`}> */}
          <button className='btn2' onClick={handleButtonCart}>
            Ver carrito
          </button>
          {/* </Link> */}
        </Typography>
      </Box>
    </div>
  );

  return (
    <div className='container'>
      {detail.map(products => {
        return (
          <div className='detailContainer'>
            <h1>{products.productName}</h1>
            <ul className='detailUl'>
              <li>{products.collection.name}</li>
              <br></br>
              <img className='img' src={products.images[0]} />
              <br></br>
              <br></br>
              <br></br>
              <li className='detailSummary'>{products.description}</li>
              <br></br>
              <li>{Number(products.salePrice) + "$"}</li>
            </ul>
            <FormControl sx={{ m: 1, minWidth: 80 }} className='detailS'>
              <InputLabel id='demo-simple-select-label'>talle</InputLabel>
              <Select labelId='demo-simple-select-label' id='demo-simple-select' label='talle'>
                <MenuItem value={10}>40</MenuItem>
                <MenuItem value={20}>41</MenuItem>
                <MenuItem value={30}>45</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <br></br>
            <div>
              <button type='button' onClick={() => openCloseModal1(dispatchCart())} className='btn'>
                Agregar al carrito
              </button>
              <div>
                <Modal open={modal1} onClose={openCloseModal1}>
                  {carrito}
                </Modal>
              </div>
            </div>
          </div>
        );
      })}
      <div className='detailContainer'>
        <h1>Valoraciones y reseñas</h1>
        {reseña === undefined || reseña.length === 0 ? (
          <h4>No hay reseñas</h4>
        ) : (
          reseña.map(product => {
            return (
              <div>
                <h4>Reseña: {product.review}</h4>
                <Rating name='score' defaultValue={product.score} precision={1} readOnly />
                {/* <h5>Puntuación: {product.score}</h5> */}
              </div>
            );
          })
        )}
        <br></br>
        <div>
          <button type='button' onClick={openCloseModal} className='btn'>
            Tu reseña
          </button>
        </div>
      </div>
      <br></br>
      <div>
        <Modal open={modal} onClose={openCloseModal}>
          {reseñas}
        </Modal>
      </div>
      <button onClick={handleButtonHome} className='btn'>
        Home
      </button>
      <br></br>
    </div>
  );
}
