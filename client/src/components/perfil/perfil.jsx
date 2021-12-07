import "./perfil.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Modal } from "@material-ui/core";
import { modifyUser } from "../../Redux/Actions/index";
import swal from "sweetalert";

export default function Perfil() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogeado = useSelector(state => state.userLogin);
  const users = useSelector(state => state.users);

  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated && userLogeado.type === undefined) history.push("/home");

  let usuario = users.filter(user => user.id === userLogeado.id);

  const [input, setInput] = useState({
    id: userLogeado.id,
  });

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 5,
  };
  const editar = (
    <div className='detailContainer'>
      <form onSubmit={e => handleSubmit(e)} className='formulario'>
        <Box sx={style}>
          <h1>EDITAR DATOS PERSONALES</h1>

          <div className='contenido1'>
            <div className='sarasa'>
              <label>
                <strong>NOMBRE</strong>
              </label>
              <input
                type='text'
                name='name'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.name)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>APELLIDO</strong>
              </label>
              <input
                type='text'
                name='lastName'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.lastName)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>EMAIL</strong>
              </label>
              <input
                type='text'
                name='email'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.email)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>DOCUMENTO</strong>
              </label>
              <input
                type='text'
                name='document'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.document)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>DIRECCION</strong>
              </label>
              <input
                type='text'
                name='address'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.address)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>ALTURA</strong>
              </label>
              <input
                type='text'
                name='number'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.number)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>LOCALIDAD</strong>
              </label>
              <input
                type='text'
                name='location'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.location)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>CODIGO POSTAL</strong>{" "}
              </label>
              <input
                type='text'
                name='cp'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.cp)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>PISO</strong>
              </label>
              <input
                type='text'
                name='floor'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.floor)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>DEPARTAMENTO</strong>
              </label>
              <input
                type='text'
                name='department'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.department)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>PROVINCIA</strong>
              </label>
              <input
                type='text'
                name='province'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.province)}
              />
            </div>
            <div className='sarasa'>
              <label>
                <strong>TELEFONO</strong>
              </label>
              <input
                type='text'
                name='telephone'
                onChange={handleInputChange}
                placeholder={usuario.map(el => el.telephone)}
              />
            </div>
          </div>
          <div className='verdura'>
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
      <Modal open={modal1} onClose={openCloseModal1}>
        {editar}
      </Modal>
      <h3 className='titulo-form'>Perfil de usuario</h3>
      <form onSubmit={e => handleSubmit(e)} className='formulario'>
        <div className='contenedorPerfil'>
          <div className='div1'>
            <label>Nombre: </label>
            <input
              className='inputs-form'
              type='text'
              name='name'
              onChange={handleInputChange}
              value={usuario.map(el => el.name)}
              readOnly={true}
            />
          </div>
          <div className='div2'>
            <label>Apellido: </label>
            <input
              className='inputs-form'
              type='text'
              name='lastName'
              onChange={handleInputChange}
              value={usuario.map(el => el.lastName)}
              readOnly={true}
            />
          </div>
          <div className='div3'>
            <label>E-mail: </label>
            <input
              className='inputs-form'
              type='text'
              name='email'
              onChange={handleInputChange}
              value={usuario.map(el => el.email)}
              readOnly={true}
            />
          </div>
          <div className='div4'>
            <label>Documento: </label>
            <input
              className='inputs-form'
              type='text'
              name='document'
              onChange={handleInputChange}
              value={usuario.map(el => el.document)}
              readOnly={true}
            />
          </div>
          <div className='div5'>
            <label>Telefono:</label>
            <input
              className='inputs-form'
              type='text'
              name='telephone'
              onChange={handleInputChange}
              value={usuario.map(el => el.telephone)}
              readOnly={true}
            />
          </div>
          <div className='div6'>
            <label>Dirección: </label>
            <input
              className='inputs-form'
              type='text'
              name='address'
              onChange={handleInputChange}
              value={usuario.map(el => el.address)}
              readOnly={true}
            />
          </div>
          <div className='div7'>
            <label>Altura: </label>
            <input
              className='inputs-form'
              type='text'
              name='number'
              onChange={handleInputChange}
              value={usuario.map(el => el.number)}
              readOnly={true}
            />
          </div>
          <div className='div8'>
            <label>Localidad: </label>
            <input
              className='inputs-form'
              type='text'
              name='location'
              onChange={handleInputChange}
              value={usuario.map(el => el.location)}
              readOnly={true}
            />
          </div>
          <div className='div9'>
            <label>CP: </label>
            <input
              className='inputs-form'
              type='text'
              name='cp'
              onChange={handleInputChange}
              value={usuario.map(el => el.cp)}
              readOnly={true}
            />
          </div>
          <div className='div10'>
            <label>Piso: </label>
            <input
              className='inputs-form'
              type='text'
              name='floor'
              onChange={handleInputChange}
              value={usuario.map(el => el.floor)}
              readOnly={true}
            />
          </div>
          <div className='div11'>
            <label>Depto: </label>
            <input
              className='inputs-form'
              type='text'
              name='department'
              onChange={handleInputChange}
              value={usuario.map(el => el.department)}
              readOnly={true}
            />
          </div>
          <div className='div12'>
            <label>Provincia: </label>
            <input
              className='inputs-form'
              type='text'
              name='province'
              onChange={handleInputChange}
              value={usuario.map(el => el.province)}
              readOnly={true}
            />
          </div>
        </div>
        <Box
          textAlign='center'
          sx={{
            width: 300,
          }}
        >
          <Button
            alignItems='center'
            size='medium'
            variant='outlined'
            onClick={() => openCloseModal1()}
          >
            EDITAR
          </Button>
        </Box>
      </form>
    </div>
  );
}
