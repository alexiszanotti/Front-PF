import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser } from "../../Redux/Actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";
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
  
    if (Object.keys(usuario).length === 0) {
        loginWithRedirect();
    } else {
        return (
            <div className='shoppingGeneral'>
                <div className='title'>
                <h3>Información de entrega</h3>

                </div>
                <form onSubmit={e => handleSubmit(e)} className="formulario" >

                    <div className="contenido">
                        <div className="sarasa">
                            <label>NOMBRE</label>
                            <input type='text' name='name' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.name)} />
                        </div>
                        <div className="sarasa">
                            <label>APELLIDO</label>
                            <input type='text' name='lastName' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.lastName)} />
                        </div>
                        <div className="sarasa">
                            <label>EMAIL</label>
                            <input type='text' name='email' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.email)} />
                        </div>
                        <div className="sarasa">
                            <label>DOCUMENTO</label>
                            <input type='text' name='document' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.document)} />
                        </div>
                        <div className="sarasa">
                            <label>DIRECCION</label>
                            <input type='text' name='address' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.address)} />
                        </div>
                        <div className="sarasa">
                            <label>ALTURA</label>
                            <input type='text' name='number' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.number)} />
                        </div>
                        <div className="sarasa">
                            <label>LOCALIDAD</label>
                            <input type='text' name='location' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.location)} />
                        </div>
                        <div className="sarasa">

                            <label>CODIGO POSTAL</label>
                            <input type='text' name='cp' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.cp)} />
                        </div>
                        <div className="sarasa">
                            <label>PISO</label>
                            <input type='text' name='floor' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.floor)} />
                        </div>
                        <div className="sarasa">
                            <label>DEPARTAMENTO</label>
                            <input type='text' name='department' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.department)} />
                        </div>
                        <div className="sarasa">

                            <label>PROVINCIA</label>
                            <input type='text' name='province' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.province)} />
                        </div>
                        <div className="sarasa">
                            <label>TELEFONO</label>
                            <input type='text' name='telephone' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.telephone)} />
                        </div>
                    </div>
                    <div className="verdura">
                        <p>En el caso que algún dato esté mal modifíquelo y presione en "modificar datos" para guardar los cambios. Luego podrá continuar con el pago.</p>                      
                        <button className='btn'>Modificar datos</button>
                    </div>
                </form>
                <div className="continuarPago">
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "52ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Link to="/checkout">
                            <Button variant="outlined" startIcon={<AttachMoneyIcon />} >
                                Ver todo
                            </Button>
                        </Link>
                    </Box>
                </div>
            </div>
        );
    }
}
