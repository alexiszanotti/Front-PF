import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser } from "../../Redux/Actions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { emptyCart } from "../../Redux/Actions";
import "./goShopping.css";

export default function GoShopping() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usuario = useSelector(state => state.userLogin);
  const usr = useSelector(state => state.users);
  const [input, setInput] = useState({
    id: usuario.id,
  });

  let usuarioLogeado = usr.filter(el => el.id === usuario.id);

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
  const vaciar = () => {
    dispatch(emptyCart());
    alert("😈")
    history.push("/");

}

  if (Object.keys(usuario).length === 0) {
    loginWithRedirect();
  } else {
    return (
      // <div className='shoppingGeneral'>
      //   {/* <h1>Estas en el shoping</h1> */}
      //   <form onSubmit={e => handleSubmit(e)} className='CreacionUsuario'>
      //     <label>NOMBRE</label>
      //     <input type='text' name='name' onChange={handleInputChange} />
      //     <label>APELLIDO</label>
      //     <input type='text' name='lastName' onChange={handleInputChange} />
      //     <label>EMAIL</label>
      //     <input type='text' name='email' onChange={handleInputChange} />
      //     <label>DOCUMENTO</label>
      //     <input type='text' name='document' onChange={handleInputChange} />
      //     <label>DIRECCION</label>
      //     <input type='text' name='address' onChange={handleInputChange} />
      //     <label>NUMERO DE CALLE</label>
      //     <input type='text' name='number' onChange={handleInputChange} />
      //     <label>PISO</label>
      //     <input type='text' name='floor' onChange={handleInputChange} />
      //     <label>DEPARTAMENTO</label>
      //     <input type='text' name='department' onChange={handleInputChange} />
      //     <label>LOCALIDAD</label>
      //     <input type='text' name='location' onChange={handleInputChange} />
      //     <label>PROVINCIA</label>
      //     <input type='text' name='province' onChange={handleInputChange} />
      //     <label>CODIGO POSTAL</label>
      //     <input type='text' name='cp' onChange={handleInputChange} />
      //     <label>TELEFONO</label>
      //     <input type='text' name='telephone' onChange={handleInputChange} />
      //     <button className='btn'>Cargar datos</button>
      //   </form>
      // </div>
      <div className="shoppingGeneral">
      {/* <h1>Estas en el shoping</h1> */}
      <div className="boxInvitados">
          <h2>Información de entrega</h2>
          <Box
              component="form"
              sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
          >
              <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.name)} />
              <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.lastName)} />
          </Box>
          <Box
              component="form"
              sx={{
                  "& .MuiTextField-root": { m: 1, width: "52ch" },
              }}
          >
              <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.address)} />
          </Box>
          <Box
              component="form"
              sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
          >
              <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.number)} />
              <TextField id="outlined-required" label={usuarioLogeado.map((el) => el.floor)} />
          </Box>
          <Box
              component="form"
              sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
          >
              <TextField id="outlined-required" label={usuarioLogeado.map((el) => el.department)} />
              <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.cp)} />
          </Box>
          <Box
              component="form"
              sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
          >
              <TextField id="select-currency"  label={usuarioLogeado.map((el) => el.province)} required />
              <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.location)} />
          </Box>
          <label>
              <strong>País:</strong> Argentina
          </label>
      </div>
      <div className="informacionContacto">
          <h2>Información de contacto</h2>
          <label>Usaremos tus datos para informarte sobre la entrega</label>
          <br></br>
          <TextField className="informacionContacto1"
              required
              id="outlined-required"
              label={usuario.email}
              value={usuario.email}
          />
          <br></br>
          <TextField className="informacionContacto1" required id="outlined-required" label={usuarioLogeado.map((el) => el.telephone)} />
          <label>Sólo llamaremos si tenemos alguna duda sobre tu pedido</label>
          <br></br>
          <TextField className="informacionContacto1"
              required
              id="outlined-required"
              label={usuarioLogeado.map((el) => el.codument)}
          />
      </div>
      <div className="continuarPago">
          <Box
              component="form"
              sx={{
                  "& .MuiTextField-root": { m: 1, width: "52ch" },
              }}
              noValidate
              autoComplete="off"
          >
              <Button variant="outlined" startIcon={<AttachMoneyIcon />} onClick={vaciar}>
                  Ir a pagar
              </Button>
          </Box>
      </div>
  </div>
    );
  }
}
