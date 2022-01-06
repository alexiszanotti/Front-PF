import "./estadisticaA.css";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Redux/Actions/index";
import { useHistory, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function EstadisticasA() {
  const history = useHistory();

  const dispatch = useDispatch();

  const { logout } = useAuth0();

  const logOut = () => {
    dispatch(userLogout());
    logout({ returnTo: window.location.origin });
    history.push("/");
  };
  return (
    <div className='adminContainer'>
      <h1>Panel Administrador</h1>
      <div className='contenedorAdmin'>
        <div className='btnAdmin'>
          <Link to="/userUpdata">
            <button className='btn10'>MODIFICAR USUARIOS</button>
          </Link>
        </div>
        <div className='btnAdmin'>
          <Link to="/updateProduct">
            <button className='btn10'>MODIFICAR PRODUCTOS</button>
          </Link>
        </div>
        <div className='btnAdmin'>
          <Link to="/createProduct">
            <button className='btn10'>CREAR PRODUCTOS</button>
          </Link>
        </div>
        <div className='btnAdmin'>
          <Link to="/createCollection">
            <button className='btn10'>CREAR CATEGORÍAS</button>
          </Link>
        </div>
        <div className='btnAdmin'>
          <Link to="/deleteCollection">
            <button className='btn10'>ELIMINAR CATEGORÍAS</button>
          </Link>
        </div>
        <div className='btnAdmin'>
          <Link to="/stock">
            <button className='btn10'>STOCK</button>
          </Link>
        </div>
        <div className='btnAdmin'>
          <Link to='/verOrdenes'>
            <button className='btn10'>ESTADOS DE ORDEN</button>
          </Link>
        </div>
      </div>
      {/* <div className='botonCart1'> */}
        <button className='botonAdmin' onClick={logOut}>SALIR</button>
      {/* </div> */}
    </div>
  );
}
