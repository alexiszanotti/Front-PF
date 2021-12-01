import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser, checkoutProducts } from "../../Redux/Actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";
import "./goShopping.css";
import swal from "sweetalert";

const validateForm = input => {
  let error = {};
  if (!input.name) error.name = "El nombre del producto es requerido";
  else if (!input.lastName) error.lastName = "El apellido es requerido";
  else if (!input.email) error.email = "El mail es requerido";
  else if (!input.document) error.document = "El documento es requerido";
  else if (!input.address) error.address = "La dirección es requerida";
  else if (!input.number) error.number = "La altura es requerida";
  else if (!input.location) error.location = "La localidad es requerida";
  else if (!input.cp) error.cp = "El código postal es requerido";
  else if (!input.province) error.province = "La provincia es requerida";
  else if (!input.telephone) error.telephone = "El teléfono postal es requerido";

  return error;
};

export default function GoShopping() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usuario = useSelector(state => state.userLogin);
  const usr = useSelector(state => state.users);
  const dataBaseShopping = useSelector(state => state.ShoppingAlmacen);
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    id: usuario.id,
  });

  let usuarioLogeado = usr.filter(el => el.id === usuario.id);

  const { loginWithRedirect } = useAuth0();

  const handleInputChange = e => {
    e.preventDefault();

    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validateForm({ ...input, [e.target.name]: e.target.value }));
  };

  function handleSubmit(e) {
    dispatch(modifyUser(input));
    // alert("USUARIO RECARGADO");
    if (Object.keys(error).length === 0) {
      setInput({
        id: "",
      });
    }
  }

  const handleCheckOut = () => {
    if (
      usuarioLogeado.name == null ||
      usuarioLogeado.lastName == null ||
      usuarioLogeado.email == null ||
      usuarioLogeado.documento == null ||
      usuarioLogeado.address == null ||
      usuarioLogeado.number == null ||
      usuarioLogeado.location == null ||
      usuarioLogeado.cp == null ||
      usuarioLogeado.province == null ||
      usuarioLogeado.telephone == null
    ) {
      swal("Error!", "Por favor, complete todos los campos requeridos!", "error");
    } else {

      history.push("/checkout");
    }
  };

  if (Object.keys(usuario).length === 0) {
    loginWithRedirect();
  } else {
    return (
      <div className='shoppingGeneral'>
        <div className='title'>
          <h3>Información de entrega</h3>
        </div>
        <form onSubmit={e => handleSubmit(e)} className='formulario'>
          <div className='contenido'>
            <div className='sarasa'>
              <label>NOMBRE</label>
              <input
                type='text'
                name='name'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.name)}
                className='inputSarasa'
              />
              {error.name && <p className='error'>{error.name} </p>}
            </div>
            <div className='sarasa'>
              <label>APELLIDO</label>
              <input
                type='text'
                name='lastName'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.lastName)}
              />
              {error.lastName && <p className='error'>{error.lastName} </p>}
            </div>
            <div className='sarasa'>
              <label>EMAIL</label>
              <input
                type='text'
                name='email'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.email)}
              />
              {error.email && <p className='error'>{error.email} </p>}
            </div>
            <div className='sarasa'>
              <label>DOCUMENTO</label>
              <input
                type='number'
                name='document'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.document)}
              />
              {error.document && <p className='error'>{error.document} </p>}
            </div>
            <div className='sarasa'>
              <label>DIRECCION</label>
              <input
                type='text'
                name='address'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.address)}
              />
              {error.address && <p className='error'>{error.address} </p>}
            </div>
            <div className='sarasa'>
              <label>ALTURA</label>
              <input
                type='number'
                name='number'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.number)}
              />
              {error.number && <p className='error'>{error.number} </p>}
            </div>
            <div className='sarasa'>
              <label>LOCALIDAD</label>
              <input
                type='text'
                name='location'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.location)}
              />
              {error.location && <p className='error'>{error.location} </p>}
            </div>
            <div className='sarasa'>
              <label>CODIGO POSTAL</label>
              <input
                type='number'
                name='cp'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.cp)}
              />
              {error.cp && <p className='error'>{error.cp} </p>}
            </div>
            <div className='sarasa'>
              <label>PISO</label>
              <input
                type='number'
                name='floor'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.floor)}
              />
            </div>
            <div className='sarasa'>
              <label>DEPARTAMENTO</label>
              <input
                type='text'
                name='department'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.department)}
              />
            </div>
            <div className='sarasa'>
              <label>PROVINCIA</label>
              <input
                type='text'
                name='province'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.province)}
              />
              {error.province && <p className='error'>{error.province} </p>}
            </div>
            <div className='sarasa'>
              <label>TELEFONO</label>
              <input
                type='number'
                name='telephone'
                onChange={handleInputChange}
                placeholder={usuarioLogeado.map(el => el.telephone)}
              />
              {error.telephone && <p className='error'>{error.telephone} </p>}
            </div>
          </div>
          <div className='verdura'>
            <p>
              En el caso que algún dato esté mal modifíquelo y presione en "modificar datos" para
              guardar los cambios. Luego podrá continuar con el pago.
            </p>
            <button className='btn'>Modificar datos</button>
          </div>
        </form>
        <div className='continuarPago'>
          <Box
            component='form'
            sx={{
              "& .MuiTextField-root": { m: 1, width: "52ch" },
            }}
            noValidate
            autoComplete='off'
          >
            {/* <Link to='/checkout'> */}
            <Button onClick={handleCheckOut} variant='outlined' startIcon={<AttachMoneyIcon />}>
              Continuar al pago
            </Button>
            {/* </Link> */}
          </Box>
        </div>
      </div>
    );
  }
}
