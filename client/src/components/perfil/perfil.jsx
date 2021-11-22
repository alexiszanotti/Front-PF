import "./perfil.css";
import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Modal } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel"; 
import {modifyUser, userLogout} from "../../Redux/Actions/index"


export default function Perfil() {
    const dispatch = useDispatch();
    const history = useHistory();
  const userLogeado = useSelector((state) => state.userLogin);
  const users = useSelector((state) => state.users);

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
    alert("USUARIO MODIFICADO");
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
    height: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const editar = (
    <div className='detailContainer'>
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box sx={style} >
            <h1>EDITAR DATOS FISCALES</h1>
            <TextField label={"Email: " + usuario.map((el) => el.email)} color="secondary"  fullWidth name="email" onChange={handleInputChange} />
            
            <TextField label={"Nombre: " + usuario.map((el) => el.name)} color="secondary" fullWidth name="name" onChange={handleInputChange} />
            
            <TextField label={"Apellido: " + usuario.map((el) => el.lastName)} color="secondary"  fullWidth  name="lastName"  onChange={handleInputChange}/>
            
            <TextField label={"Fecha de nacimiento: " + usuario.map((el) => el.birthDay)} color="secondary"  fullWidth name="birthDay" onChange={handleInputChange} />
            
            <TextField label={"Número de documento: " + usuario.map((el) => el.document)} color="secondary"  fullWidth name="document" onChange={handleInputChange} />
            
            <TextField label={"Teléfono: " +  usuario.map((el) => el.telephone)} color="secondary"  fullWidth name="telephone" onChange={handleInputChange} />
            
            <TextField label={"Dirección: " + usuario.map((el) => el.address)} color="secondary"  fullWidth name="address" onChange={handleInputChange} />
            
            <TextField label={"Altura: " + usuario.map((el) => el.number)} color="secondary"  fullWidth name="number" onChange={handleInputChange} />

            <TextField label={"Piso: " + usuario.map((el) => el.floor)} color="secondary"  fullWidth name="floor" onChange={handleInputChange} />

            <TextField label={"Departamento: " + usuario.map((el) => el.department)} color="secondary"  fullWidth name="department" onChange={handleInputChange} />
            <TextField label={"Código postal: " + usuario.map((el) => el.cp)} color="secondary"  fullWidth name="cp" onChange={handleInputChange} />
            
            <TextField label={"Localidad: " + usuario.map((el) => el.location)} color="secondary"  fullWidth name="location" onChange={handleInputChange} />
            
            <TextField label={"Provincia: " + usuario.map((el) => el.province)} color="secondary"  fullWidth name="province" onChange={handleInputChange} />
            
            
            <FormControl fullWidth color="secondary">
                        <InputLabel >{usuario.map((el) => el.gender)}</InputLabel>
                        <Select
                            name="gender"
                            onChange={(e) => handleSelectChange(e)}
                            label="gender"
                        >
                            
                            <MenuItem  name="gender" value={"Female"}>FEMENINO</MenuItem>
                            <MenuItem  name="gender" value={"Male"}>MASCULINO</MenuItem>
                            <MenuItem  name="gender" value={"Other"}>OTRO</MenuItem>
                        </Select>
                </FormControl>
                <br></br>
                <br></br>
                <br></br>
                <button color="secondary">Guardar</button>

      </Box>
    </form>
    </div>
  );
  return (
    <div>
      <div className="contenedorName">
        <br></br>
        <h1 className="nombrePerfil">Hola {usuario.map((el) => el.name)}</h1>
      </div>
      <div className="contenedorPerfil">
        <div className="detallecontenedor">
          <h1>MIS DATOS</h1>
          <h3>
            Modifica tus datos personales a continuación para que tu cuenta esté
            actualizada.
          </h3>
        </div>
        <br></br>
        {usuario.map((el) => {
          return (
            <div className="detallecontenedor">
              <h2>DETALLE</h2>
              <h3>Nombre: {el.name}</h3>
              <h3>Apellido: {el.lastName}</h3>
              <h3>Mail: {el.email}</h3>
              <h3>Documento: {el.document}</h3>
              <h3>Teléfono: {el.telephone}</h3>
              <h3>Cumpleaños: {el.birthDay}</h3>
              <h3>Genero: {el.gender}</h3>
              <h3>Dirección: {el.address}</h3>
              <h3>Código postal: {el.cp}</h3>
              <h3>Localidad: {el.location}</h3>
              <h3>Provincia: {el.province}</h3>
              <h3>Altura: {el.number}</h3>
              <h3>Piso: {el.floor}</h3>
              <h3>Departamento: {el.department}</h3>


              <Modal open={modal1} onClose={openCloseModal1}>
                  {editar}
                </Modal>
              <Button onClick={() => openCloseModal1()} >EDITAR</Button>
            </div>
          );
        })}
        <div className="detallecontenedor">
          <h2>CERRAR SESIÓN</h2>
          <Button onClick={handleSubmitLogout}>CERRAR SESIÓN</Button>
        </div>
      </div>
    </div>
  );
}
