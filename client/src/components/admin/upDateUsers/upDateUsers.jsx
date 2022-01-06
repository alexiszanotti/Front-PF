import React, { useState, useEffect } from "react";
import { getAllUsers, modifyUser } from "../../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
// import swal from 'sweetalert';
import "./upDateUsers.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpDataUsers() {
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.users);

  console.log(usersData)

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  const [input, setInput] = useState({
    id: "",
  });

  const successSubmit = () => {
    toast.success("Usuario modificado con éxito", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleButton = () => {
    setTimeout(() => {
      window.location.replace("");
    }, 2000);
  };

  const handleSelectChange = function (e) {
    setInput({ ...input, id: e.target.value });
  };

  const handleSelect = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(modifyUser(input));
    // swal("Modificacion Exitosa!", "Usuario modificado!", "success");
    successSubmit(handleButton());
    setInput({
      id: "",
    });
    // history.push('/')
  }

  let aux = usersData.filter(el => el.id === input.id);
  console.log(aux)
  return (
    <div className='updateUserContainer'>
      <h1>ELIJA EL USUARIO A MODIFICAR</h1>

      <Box sx={{ minWidth: 120 }}>
        <select onChange={e => handleSelectChange(e)} className='select' required='required'>
          <option value=''>USUARIOS</option>
          {usersData.map(el => {
            return (
              <option key={el.id} name='id' value={el.id}>
                {el.email}
              </option>
            );
          })}
        </select>
      </Box>
      <br />
      <Box sx={{ minWidth: 120 }}>
        <form onSubmit={e => handleSubmit(e)} className='CreacionUsuario'>
          <label>NOMBRE DE USUARIO</label>
          <input
            type='text'
            name='email'
            onChange={handleInputChange}
            placeholder={aux?.map(el => el.email)}
          />
          <label>NOMBRE</label>
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            placeholder={aux?.map(el => el.name)}
          />
          <label>APELLIDO</label>
          <input
            type='text'
            name='lastName'
            onChange={handleInputChange}
            placeholder={aux?.map(el => el.lastName)}
          />
          <label>FECHA</label>
          <input
            type='text'
            name='birthDay'
            onChange={handleInputChange}
            placeholder={aux?.map(el => el.birthDay)}
          />
          <label>GENERO</label>
          <select className='select' onChange={e => handleSelect(e)} name='gender'>
            <option value=''></option>
            <option value='Male' name='gender'>
              Male
            </option>
            <option value='Female' name='gender'>
              Female
            </option>
            <option value='Other' name='gender'>
              Other
            </option>
          </select>
          <label>TIPO</label>
          <select onChange={e => handleSelect(e)} name='type'>
            <option value=''></option>
            <option value='Admin' name='type'>
              Admin
            </option>
            <option value='User' name='type'>
              User
            </option>
            <option value='Locked' name='type'>
              Eliminar
            </option>
          </select>
          <br></br>
          <button className='btn'>Cargar datos</button>
        </form>
      </Box>
      <Link to='/'>
        <button className='botonAdmin'>
          Volver
        </button>
      </Link>
      <ToastContainer />
    </div>
  );
}
