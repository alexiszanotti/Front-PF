import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser } from "../../Redux/Actions";
import "./goShopping.css";

export default function GoShopping() {
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userLogin);
  const [input, setInput] = useState({
    id: usuario.id,
  });


  const { loginWithRedirect } = useAuth0();

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    dispatch(modifyUser(input));
    // alert("USUARIO RECARGADO");
    setInput({
      id: "",
    });
  }

  if (Object.keys(usuario).length === 0) {
    loginWithRedirect();
  } else {
    return (
      <div className='shoppingGeneral'>
        {/* <h1>Estas en el shoping</h1> */}
        <form onSubmit={e => handleSubmit(e)} className='CreacionUsuario'>
          <label>NOMBRE</label>
          <input type='text' name='name' onChange={handleInputChange} />
          <label>APELLIDO</label>
          <input type='text' name='lastName' onChange={handleInputChange} />
          <label>EMAIL</label>
          <input type='text' name='email' onChange={handleInputChange} />
          <label>DOCUMENTO</label>
          <input type='text' name='document' onChange={handleInputChange} />
          <label>DIRECCION</label>
          <input type='text' name='address' onChange={handleInputChange} />
          <label>NUMERO DE CALLE</label>
          <input type='text' name='number' onChange={handleInputChange} />
          <label>PISO</label>
          <input type='text' name='floor' onChange={handleInputChange} />
          <label>DEPARTAMENTO</label>
          <input type='text' name='department' onChange={handleInputChange} />
          <label>LOCALIDAD</label>
          <input type='text' name='location' onChange={handleInputChange} />
          <label>PROVINCIA</label>
          <input type='text' name='province' onChange={handleInputChange} />
          <label>CODIGO POSTAL</label>
          <input type='text' name='cp' onChange={handleInputChange} />
          <label>TELEFONO</label>
          <input type='text' name='telephone' onChange={handleInputChange} />
          <button className='btn'>Cargar datos</button>
        </form>
      </div>
    );
  }
}
