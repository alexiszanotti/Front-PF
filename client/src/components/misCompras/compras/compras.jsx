import "./compras.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview } from "../../../Redux/Actions/index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link, useHistory } from "react-router-dom";
import { Modal } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
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

export default function Compras({
  nombreProducto,
  imagenProducto,
  fechaCompra,
  precioProducto,
  estadoOrden,
  cantidad,
  productId,
  cartId,
  userId,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    review: "",
    score: "",
  });

  const handleInputChange = e => {
    e.preventDefault();

    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validateForm({ ...input, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      openCloseModal();
      setTimeout(() => {
        dispatch(
          postReview({
            score: input.score,
            review: input.review,
            productId: productId,
            userId: userId,
            cartId: cartId,
          })
        );
      }, 100);
      setTimeout(() => {
        setInput({
          review: "",
          score: "",
        });
      }, 500);
      setTimeout(() => {
        successSubmitFavorite()
        history.push(`/detail/${productId}`);
      }, 300);
    } else {
      swal("Error!", "Por favor, complete todos los campos requeridos!", "error");
    }
  };
  const [hover] = React.useState(-1);
  const [modal, setModal] = useState(false);

  const openCloseModal = () => {
    setModal(!modal);
  };

  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 380,
    bgcolor: "rgb(236,236,236)",
    p: 4,
  };

  const labels = {
    1: "Malo",
    2: "Regulo",
    3: "Bueno",
    4: "Muy bueno",
    5: "Excelente",
  };
  const successSubmitFavorite = () => {
    toast.success('Producto guardado con éxito', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
  }

  const reseñas = (
    <div>
      {/* <Box sx={style1}> */}
        <form onSubmit={e => e} className="formulario2">
          <div className='contenedorPerfil2'>
            <h3>Escriba su reseña</h3>
            <textarea
              onChange={handleInputChange}
              value={input.review}
              type='text'
              name='review'
              placeholder='Escriba su reseña aquí'
              className='textareaReseña'
            />
            {error.review && <p className='error'>{error.review} </p>}
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
            <br></br>
            <div className="botonesCompras">
              <button type='submit' onClick={handleSubmit} className='btn7'>
                Publicar
              </button>
              <button onClick={() => openCloseModal()} className='btn8'>
                Cerrar
              </button>
            </div>
          </div>
        </form>
      {/* </Box> */}
    </div>
  );

  return (
    <div className='misComprasCardDetail'>
      <Card sx={{ maxWidth: 1200 }}>
        <CardActionArea>
          <TextField
            id='outlined-read-only-input'
            fullWidth
            defaultValue={fechaCompra}
            InputProps={{
              readOnly: true,
            }}
            label='Fecha de compra'
            variant='filled'
          />

          <CardContent className='misComprasCard'>
            <img alt='l' src={imagenProducto} className='imagen' />
            <div className='misCompras'>
              <Typography gutterBottom variant='h5' component='div'>
                {nombreProducto}
              </Typography>
              <Typography gutterBottom variant='h5' component='div'>
                ${precioProducto}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {estadoOrden}
              </Typography>
            </div>
            <Typography variant='body2' color='text.secondary'>
              <h2>Cantidad: {cantidad}</h2>
            </Typography>
            <Stack direction='column' spacing={2}>
              <Button variant='contained' onClick={openCloseModal}>
                Dejar reseña
              </Button>
              <div>
                <Modal open={modal} onClose={openCloseModal}>
                  {reseñas}
                </Modal>
              </div>
              <Link to={`/detail/${productId}`}>
                <Button className='btn-volver' variant='contained'>
                  {" "}
                  Volver a comprar
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      <ToastContainer />
    </div>
  );
}