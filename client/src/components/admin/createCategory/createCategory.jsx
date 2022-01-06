import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { createCollection, getCollection } from "../../../Redux/Actions/index";
import "./createCategory.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validateForm = input => {
  let error = {};
  if (!input.name) {
    error.name = "El nombre es requerido";
  } else if (input.name.length < 4 || input.name.length > 10) {
    error.name = "El nombre debe tener entre 4 y 15 caracteres";
  }

  return error;
};

export default function CreateCollection() {
  const dispatch = useDispatch();

  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
  });

  const successSubmit = () => {
    toast.success("Categoría creada con éxito", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const errorSubmit = () => {
    toast.error("Complete todos los campos requeridos", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    dispatch(getCollection());
    validateForm(input);
  }, [dispatch, input]);

  const handleInputChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validateForm({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(createCollection(input));
      // swal("Creacion Exitosa!", "Colección creada con éxito!", "success");
      successSubmit();
      setInput({
        name: "",
      });
      // history.push('/');
    } else {
      // swal("Error!", "Por favor, complete todos los campos requeridos!", "error");
      errorSubmit();
    }
  };

  return (
    <div className='createCategoryContainer'>
      <h1>CREAR CATEGORIA</h1>

      <br></br>
      <div>
        <form className='form-inputs' onSubmit={e => handleSubmit(e)}>
          <input
            onChange={handleInputChange}
            value={input.name}
            type='text'
            name='name'
            placeholder='Nombre'
          />
          {error.name && <p className='error'>{error.name} </p>}
          <br></br>
          <br></br>
          <br></br>
          {/* <button onClick={notify}>Crear categoría</button> */}
          <button className='btn'>Crear categoría</button>
        </form>
        <Link to='/'>
        <button className='botonAdmin'>
          Volver
        </button>
        </Link>
        <ToastContainer />
      </div>
    </div>
  );
}
