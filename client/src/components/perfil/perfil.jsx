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
import Footer from "../footer/footer";
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

  const editar = (
    <form onSubmit={e => handleSubmit(e)} className='formulario1'>
      <div className='contenedorPerfil1'>
        <div className='div1'>
          <label>
            <strong>Nombre:</strong>
          </label>
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.name)}
          />
        </div>
        <div className='div2'>
          <label>
            <strong>Apellido:</strong>
          </label>
          <input
            type='text'
            name='lastName'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.lastName)}
          />
        </div>
        <div className='div3'>
          <label>
            <strong>E-mail:</strong>
          </label>
          <input
            type='text'
            name='email'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.email)}
          />
        </div>
        <div className='div4'>
          <label>
            <strong>Documento</strong>
          </label>
          <input
            type='text'
            name='document'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.document)}
          />
        </div>
        <div className='div5'>
          <label>
            <strong>Dirección:</strong>
          </label>
          <input
            type='text'
            name='address'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.address)}
          />
        </div>
        <div className='div6'>
          <label>
            <strong>Altura</strong>
          </label>
          <input
            type='text'
            name='number'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.number)}
          />
        </div>
        <div className='div7'>
          <label>
            <strong>Localidad:</strong>
          </label>
          <input
            type='text'
            name='location'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.location)}
          />
        </div>
        <div className='div8'>
          <label>
            <strong>CP:</strong>{" "}
          </label>
          <input
            type='text'
            name='cp'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.cp)}
          />
        </div>
        <div className='div9'>
          <label>
            <strong>Piso:</strong>
          </label>
          <input
            type='text'
            name='floor'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.floor)}
          />
        </div>
        <div className='div10'>
          <label>
            <strong>Departamento:</strong>
          </label>
          <input
            type='text'
            name='department'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.department)}
          />
        </div>
        <div className='div11'>
          <label>
            <strong>Provincia:</strong>
          </label>
          <input
            type='text'
            name='province'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.province)}
          />
        </div>
        <div className='div12'>
          <label>
            <strong>Teléfono:</strong>
          </label>
          <input
            type='text'
            name='telephone'
            onChange={handleInputChange}
            placeholder={usuario.map(el => el.telephone)}
          />
        </div>
      </div>
      <Button type='submit' alignItems='center' size='large' variant='contained'>
        GUARDAR
      </Button>
    </form>
  );

  return (
    <div>
      <Modal open={modal1} onClose={openCloseModal1}>
        {editar}
      </Modal>
      <div className='fondo'></div>
      <h3 className='titulo-form'>Hola {usuario.map((el) => el.name)} {usuario.map((el) => el.lastName)}</h3>      
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
            width: 600,
          }}
        >
          <Button
            alignItems='center'
            size='large'
            variant='outlined'
            onClick={() => openCloseModal1()}
          >
            EDITAR
          </Button>
        </Box>
      </form>
      <div className="footerPerfil">
      <Footer />
      </div>
    </div>
  );
}
