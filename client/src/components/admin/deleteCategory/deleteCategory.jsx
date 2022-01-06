import "./deleteCategory.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCollection, getCollection } from "../../../Redux/Actions/index";
// import swal from 'sweetalert';
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

export default function DeleteCollection() {
  const dispatch = useDispatch();

  const collections = useSelector(state => state.collections);

  const [error] = useState({});

  const [input, setInput] = useState({
    name: "",
  });
  useEffect(() => {
    dispatch(getCollection());
    validateForm(input);
  }, [dispatch, input]);

  const successSubmit = () => {
    toast.success("Categoría eliminada con éxito", {
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

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(deleteCollection(input));
      successSubmit();
      setInput({
        name: "",
      });
      // swal("Eliminacion Exitosa!", "Categoría eliminada con éxito!", "success");
    } else {
      errorSubmit();
      // swal("Error!", "Por favor, complete todos los campos requeridos!", "error");
    }
  };

  const handleSelectChange = e => {
    setInput({ name: e.target.value });
  };

  return (
    <div className='deleteCollectionContainer'>
      <h1>ELIMINAR CATEGORIA</h1>
      <br></br>
      <div>
        <form className='form-inputs' onSubmit={e => handleSubmit(e)}>
          <select value={input.name} onChange={e => handleSelectChange(e)}>
            <option>Seleccione una categoria...</option>
            {error.name && <p className='error'>{error.name} </p>}

            {collections?.map(c => {
              return (
                <>
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                </>
              );
            })}
          </select>
          <br></br>
          <br></br>
          <br></br>
          <button className='btn'>Eliminar categoría</button>
        </form>
      </div>
      <Link to='/'>
        <button className='botonAdmin'>
          Volver
        </button>
      </Link>
      <ToastContainer />
    </div>
  );
}
