import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser } from "../../Redux/Actions";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import "./goShopping.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer/footer";

export default function GoShopping() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usuario = useSelector(state => state.userLogin);
  const usr = useSelector(state => state.users);

  let usuarioLogeado = usr.filter(el => el.id === usuario.id);
  let name = usuarioLogeado.map(el => el.name);
  let lastName = usuarioLogeado.map(el => el.lastName);
  let email = usuarioLogeado.map(el => el.email);
  let document = usuarioLogeado.map(el => el.document);
  let address = usuarioLogeado.map(el => el.address);
  let number = usuarioLogeado.map(el => el.number);
  let location = usuarioLogeado.map(el => el.location);
  let cp = usuarioLogeado.map(el => el.cp);
  let floor = usuarioLogeado.map(el => el.floor);
  let department = usuarioLogeado.map(el => el.department);
  let province = usuarioLogeado.map(el => el.province);
  let telephone = usuarioLogeado.map(el => el.telephone);

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
      errorSubmit();
    } else {
      history.push("/checkout");
    }
  };
  const successDate = () => {
    toast.success("Datos modificados correctamente", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(modifyUser(input));
    successDate();
  }

  if (Object.keys(usuario).length === 0 || !usuario) {
    loginWithRedirect();
  } else {
    return (
      <>
      <div className='shoppingGeneral'>
        <form onSubmit={handleSubmit} className='formulario'>
          <div className='contenedorPerfil'>
            <div className='div1'>
              <label>Nombre:</label>
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
            <div className='div2'>
              <label>Apellido:</label>
              <input
                type='text'
                name='lastName'
                value={input.lastName}
                onChange={handleInputChange}
                required
              />
              {/*  {error.lastName && <p className='error'>{error.lastName} </p>} */}
            </div>
            <div className='div3'>
              <label>E-mail:</label>
              <input
                type='text'
                name='email'
                value={input.email}
                onChange={handleInputChange}
                required
              />
              {/*   {error.email && <p className='error'>{error.email} </p>} */}
            </div>
            <div className='div4'>
              <label>Documento:</label>
              <input
                type='number'
                name='document'
                value={input.document}
                onChange={handleInputChange}
                required
              />
              {/*   {error.document && <p className='error'>{error.document} </p>} */}
            </div>
            <div className='div5'>
              <label>Dirección:</label>
              <input
                type='text'
                name='address'
                value={input.address}
                onChange={handleInputChange}
                required
              />
              {/* {error.address && <p className='error'>{error.address} </p>} */}
            </div>
            <div className='div6'>
              <label>Altura:</label>
              <input
                type='number'
                name='number'
                value={input.number}
                onChange={handleInputChange}
                required
              />
              {/* {error.number && <p className='error'>{error.number} </p>} */}
            </div>
            <div className='div7'>
              <label>Localidad:</label>
              <input
                type='text'
                name='location'
                value={input.location}
                onChange={handleInputChange}
                required
              />
              {/*  {error.location && <p className='error'>{error.location} </p>} */}
            </div>
            <div className='div8'>
              <label>CP:</label>
              <input
                type='number'
                name='cp'
                value={input.cp}
                onChange={handleInputChange}
                required
              />
              {/* {error.cp && <p className='error'>{error.cp} </p>} */}
            </div>
            <div className='div9'>
              <label>Piso:</label>
              <input
                type='number'
                name='floor'
                value={input.floor}
                onChange={handleInputChange}
        
              />
            </div>
            <div className='div10'>
              <label>Departamento:</label>
              <input
                type='number'
                name='department'
                value={input.department}
                onChange={handleInputChange}
             
              />
            </div>
            <div className='div11'>
              <label>Provincia:</label>
              <input
                type='text'
                name='province'
                value={input.province}
                onChange={handleInputChange}
                required
              />
              {/*    {error.province && <p className='error'>{error.province} </p>} */}
            </div>
            <div className='div12'>
              <label>Teléfono:</label>
              <input
                type='number'
                name='telephone'
                value={input.telephone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <Button type='submit' variant='outlined'>
            Modificar datos
          </Button>
          <br />
          <Button onClick={handleCheckOut} variant='outlined' startIcon={<AttachMoneyIcon />}>
            Continuar al pago
          </Button>
        </form>
        <ToastContainer />
      </div>
      <div className="footerGoShopping">
        <Footer />

      </div>
      </>
    );
  }
}
