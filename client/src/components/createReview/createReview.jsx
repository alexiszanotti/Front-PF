import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postReview,
  getReview,
} from "../../Redux/Actions/index.jsx";
import Rating from "@mui/material/Rating";
import { Modal } from "@material-ui/core";

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

export default function createReview() {
  const dispatch = useDispatch();
  const reseña = useSelector(state => state.review);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    review: "",
    score: "",
    productId: props.match.params.id,
  });
  if (reseña.length) {
    const puntuacionGeneral = reseña.map(el => el.score);
    let cantidadReseñas = puntuacionGeneral.length
    function promedio() {
      let suma = puntuacionGeneral.reduce(function (valorAnterior, valorActual) {
        return valorAnterior + valorActual;
      });
      let redondeo = suma / cantidadReseñas
      return redondeo.toFixed(1)
    }
    var average1 = promedio();
  }

  useEffect(() => {
    dispatch(getReview(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleInputChange = e => {
    e.preventDefault();

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

  const [modal, setModal] = useState(false);

  const openCloseModal = () => {
    setModal(!modal);
  };

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
    1: "Malo",
    2: "Regulo",
    3: "Bueno",
    4: "Muy bueno",
    5: "Excelente",
  };

  const reseñas = (
    <div>
      <Box sx={style1}>
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

  return (
    <div>
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
              </div>
            );
          })
        )}
        <h3>Puntuacion general</h3>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating name="half-rating-read" value={average1} precision={0.5} readOnly />
          <h4>{average1}</h4>
        </Box>
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
    </div>
  )

}