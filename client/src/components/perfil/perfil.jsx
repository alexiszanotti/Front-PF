import "./perfil.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Modal } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { modifyUser, userLogout } from "../../Redux/Actions/index";
import swal from 'sweetalert';

export default function Perfil() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogeado = useSelector((state) => state.userLogin);
  const users = useSelector((state) => state.users);

  const { user, isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated && userLogeado.type === undefined) history.push("/home");

  let usuario = users.filter((user) => user.id === userLogeado.id);



  const [input, setInput] = useState({
    id: userLogeado.id,

  });

  const handleSelectChange = function (e) {
    setInput({ ...input, gender: e.target.value });
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [modal1, setModal1] = useState(false);

  const openCloseModal1 = () => {
    setModal1(!modal1);
  };

  function handleSubmit(e) {
    dispatch(modifyUser(input));
    swal("Modificacion Exitosa!", "El usuario se modifico con éxito!", "success");
    setInput({
      id: "",
    });
  }

  function handleSubmitLogout() {
    dispatch(userLogout());
    history.push("/home");
  }


  console.log(input);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 650,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const editar = (
    <div className='detailContainer'>
      <form onSubmit={e => handleSubmit(e)} className="formulario" >
        <Box sx={style} >
          <h1>EDITAR DATOS FISCALES</h1>

          <div className="contenido1">
            <div className="sarasa">
              <label><strong>NOMBRE</strong></label>
              <input type='text' name='name' onChange={handleInputChange} placeholder={usuario.map((el) => el.name)} />
            </div>
            <div className="sarasa">
              <label><strong>APELLIDO</strong></label>
              <input type='text' name='lastName' onChange={handleInputChange} placeholder={usuario.map((el) => el.lastName)} />
            </div>
            <div className="sarasa">
              <label><strong>EMAIL</strong></label>
              <input type='text' name='email' onChange={handleInputChange} placeholder={usuario.map((el) => el.email)} />
            </div>
            <div className="sarasa">
              <label><strong>DOCUMENTO</strong></label>
              <input type='text' name='document' onChange={handleInputChange} placeholder={usuario.map((el) => el.document)} />
            </div>
            <div className="sarasa">
              <label><strong>DIRECCION</strong></label>
              <input type='text' name='address' onChange={handleInputChange} placeholder={usuario.map((el) => el.address)} />
            </div>
            <div className="sarasa">
              <label><strong>ALTURA</strong></label>
              <input type='text' name='number' onChange={handleInputChange} placeholder={usuario.map((el) => el.number)} />
            </div>
            <div className="sarasa">
              <label><strong>LOCALIDAD</strong></label>
              <input type='text' name='location' onChange={handleInputChange} placeholder={usuario.map((el) => el.location)} />
            </div>
            <div className="sarasa">

              <label><strong>CODIGO POSTAL</strong> </label>
              <input type='text' name='cp' onChange={handleInputChange} placeholder={usuario.map((el) => el.cp)} />
            </div>
            <div className="sarasa">
              <label><strong>PISO</strong></label>
              <input type='text' name='floor' onChange={handleInputChange} placeholder={usuario.map((el) => el.floor)} />
            </div>
            <div className="sarasa">
              <label><strong>DEPARTAMENTO</strong></label>
              <input type='text' name='department' onChange={handleInputChange} placeholder={usuario.map((el) => el.department)} />
            </div>
            <div className="sarasa">

              <label><strong>PROVINCIA</strong></label>
              <input type='text' name='province' onChange={handleInputChange} placeholder={usuario.map((el) => el.province)} />
            </div>
            <div className="sarasa">
              <label><strong>TELEFONO</strong></label>
              <input type='text' name='telephone' onChange={handleInputChange} placeholder={usuario.map((el) => el.telephone)} />
            </div>
          </div>
          <div className="verdura">
            <button className='btn'>Guardar</button>
          </div>
        </Box>
      </form>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
  return (
    <div>
      <div className="contenedorName">
        <br></br>
        <h1 className="nombrePerfil">Hola {usuario.map((el) => `${el.name} ${el.lastName}`)}</h1>
      </div>
      <div className="contenedorPerfil">
        <div className="detallecontenedor">
          <h1>MIS DATOS</h1>
          <h3>
            En caso de querer actualizar sus datos haga click 
            <Button onClick={() => openCloseModal1()} >acá</Button>.
          </h3>
          <div className="modalPerfil">
            <Modal open={modal1} onClose={openCloseModal1}>
              {editar}
            </Modal>
          </div>
        </div>
        <form onSubmit={e => handleSubmit(e)} className="formulario" >
          <div className="contenido">
            <div className="sarasa">
              <label>NOMBRE</label>
              <input type='text' name='name' onChange={handleInputChange} value={usuario.map((el) => el.name)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>APELLIDO</label>
              <input type='text' name='lastName' onChange={handleInputChange} value={usuario.map((el) => el.lastName)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>EMAIL</label>
              <input type='text' name='email' onChange={handleInputChange} value={usuario.map((el) => el.email)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>DOCUMENTO</label>
              <input type='text' name='document' onChange={handleInputChange} value={usuario.map((el) => el.document)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>DIRECCION</label>
              <input type='text' name='address' onChange={handleInputChange} value={usuario.map((el) => el.address)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>ALTURA</label>
              <input type='text' name='number' onChange={handleInputChange} value={usuario.map((el) => el.number)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>LOCALIDAD</label>
              <input type='text' name='location' onChange={handleInputChange} value={usuario.map((el) => el.location)} readOnly={true} />
            </div>
            <div className="sarasa">

              <label>CODIGO POSTAL</label>
              <input type='text' name='cp' onChange={handleInputChange} value={usuario.map((el) => el.cp)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>PISO</label>
              <input type='text' name='floor' onChange={handleInputChange} value={usuario.map((el) => el.floor)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>DEPARTAMENTO</label>
              <input type='text' name='department' onChange={handleInputChange} value={usuario.map((el) => el.department)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>PROVINCIA</label>
              <input type='text' name='province' onChange={handleInputChange} value={usuario.map((el) => el.province)} readOnly={true} />
            </div>
            <div className="sarasa">
              <label>TELEFONO</label>
              <input type='text' name='telephone' onChange={handleInputChange} value={usuario.map((el) => el.telephone)} readOnly={true} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
