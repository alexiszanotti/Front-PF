import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser, checkoutProducts, getAllUsers } from "../../Redux/Actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";
import "./goShopping.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function GoShopping() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usuario = useSelector(state => state.userLogin);
  const usr = useSelector(state => state.users);
  const dataBaseShopping = useSelector(state => state.ShoppingAlmacen);
  const [error, setError] = useState({});

  let usuarioLogeado = usr.filter(el => el.id === usuario.id);
  let name = usuarioLogeado.map((el) => el.name)
  let lastName = usuarioLogeado.map((el) => el.lastName)
  let email = usuarioLogeado.map((el) => el.email)
  let document = usuarioLogeado.map((el) => el.document)
  let address = usuarioLogeado.map((el) => el.address)
  let number = usuarioLogeado.map((el) => el.number)
  let location = usuarioLogeado.map((el) => el.location)
  let cp = usuarioLogeado.map((el) => el.cp)
  let floor = usuarioLogeado.map((el) => el.floor)
  let department = usuarioLogeado.map((el) => el.department)
  let province = usuarioLogeado.map((el) => el.province)
  let telephone = usuarioLogeado.map((el) => el.telephone)

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getAllUsers());
  //   },000)
  // }, [dispatch]);

  const [input, setInput] = useState({
    id: usuario.id,
    name: name.toString(),
    lastName: lastName.toString(),
    email: email.toString(),
    document: document.toString(),
    address: address.toString(),
    number: number.toString(),
    location: location.toString(),
    cp: cp.toString(),
    floor: floor.toString(),
    department: department.toString(),
    province: province.toString(),
    telephone: telephone.toString(),
  });

  const errorSubmit = () => {
    toast.error('Complete todos los campos requeridos', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  const { loginWithRedirect } = useAuth0();

  const handleInputChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    /* setError(validateForm({ ...input, [e.target.name]: e.target.value })); */
  };

  
  const handleCheckOut = () => {
    if (
      usuarioLogeado[0].name === null ||
      usuarioLogeado[0].lastName === null ||
      usuarioLogeado[0].email === null ||
      usuarioLogeado[0].document === null ||
      usuarioLogeado[0].address === null ||
      usuarioLogeado[0].number === null ||
      usuarioLogeado[0].location === null ||
      usuarioLogeado[0].cp === null ||
      usuarioLogeado[0].province === null ||
      usuarioLogeado[0].telephone === null
      ) {
        errorSubmit()
      } else {
        history.push("/checkout");
      }
    };

    function handleSubmit() {
      console.log("hola")
      console.log(usuario, "usuario")
      console.log(input, input)
      dispatch(modifyUser(input));
      setTimeout(() => {
        dispatch(getAllUsers());
      }, 30000);
           
        
     
      /* if (Object.keys(error).length === 0) {
        setInput({
          id: "",
        });
      } */
    }
    
  if (Object.keys(usuario).length === 0 || !usuario ) {
    loginWithRedirect();
  } else {
    return (
      <div className='shoppingGeneral'>
        <div className='title'>
          <h3>Información de entrega</h3>
        </div>
        <form  onSubmit={handleSubmit} className='formulario'>
          <div className='contenido'>
            <div className='sarasa'>
              <label>NOMBRE</label>
              <input
                type='text'
                name='name'
                value={input.name}
                onChange={handleInputChange}
                required
                className='inputSarasa'
              />
          {/*     {error.name && <p className='error'>{error.name} </p>} */}
            </div>
            <div className='sarasa'>
              <label>APELLIDO</label>
              <input
                type='text'
                name='lastName'
                value={input.lastName}
                onChange={handleInputChange}
                required
              />
             {/*  {error.lastName && <p className='error'>{error.lastName} </p>} */}
            </div>
            <div className='sarasa'>
              <label>EMAIL</label>
              <input
                type='text'
                name='email'
                value={input.email}
                onChange={handleInputChange}
                required
              />
            {/*   {error.email && <p className='error'>{error.email} </p>} */}
            </div>
            <div className='sarasa'>
              <label>DOCUMENTO</label>
              <input
                type='number'
                name='document'
                value={input.document}
                onChange={handleInputChange}
                required
              />
            {/*   {error.document && <p className='error'>{error.document} </p>} */}
            </div>
            <div className='sarasa'>
              <label>DIRECCION</label>
              <input
                type='text'
                name='address'
                value={input.address}
                onChange={handleInputChange}
                required
              />
              {/* {error.address && <p className='error'>{error.address} </p>} */}
            </div>
            <div className='sarasa'>
              <label>ALTURA</label>
              <input
                type='number'
                name='number'
                value={input.number}
                onChange={handleInputChange}
                required
              />
              {/* {error.number && <p className='error'>{error.number} </p>} */}
            </div>
            <div className='sarasa'>
              <label>LOCALIDAD</label>
              <input
                type='text'
                name='location'
                value={input.location}
                onChange={handleInputChange}
                required
              />
             {/*  {error.location && <p className='error'>{error.location} </p>} */}
            </div>
            <div className='sarasa'>
              <label>CODIGO POSTAL</label>
              <input
                type='number'
                name='cp'
                value={input.cp}
                onChange={handleInputChange}
                required
              />
              {/* {error.cp && <p className='error'>{error.cp} </p>} */}
            </div>
            <div className='sarasa'>
              <label>PISO</label>
              <input
                type='number'
                name='floor'
                value={input.floor}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='sarasa'>
              <label>DEPARTAMENTO</label>
              <input
                type='number'
                name='department'
                value={input.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='sarasa'>
              <label>PROVINCIA</label>
              <input
                type='text'
                name='province'
                value={input.province}
                onChange={handleInputChange}
                required
              />
           {/*    {error.province && <p className='error'>{error.province} </p>} */}
            </div>
            <div className='sarasa'>
              <label>TELEFONO</label>
              <input
                type='number'
                name='telephone'
                value={input.telephone}
                onChange={handleInputChange}
                required
              />
            {/*   {error.telephone && <p className='error'>{error.telephone} </p>} */}
            </div>
          </div>
          <div className='verdura'>
            <p>
              En el caso que algún dato esté mal modifíquelo y presione en "modificar datos" para
              guardar los cambios. Luego podrá continuar con el pago.
            </p>
          </div>
          <button className='btn' >Modificar datos</button>
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
            <Button onClick={handleCheckOut} variant='outlined' startIcon={<AttachMoneyIcon />}>
              Continuar al pago
            </Button>
          </Box>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
