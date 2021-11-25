import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyUser } from "../../Redux/Actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { getMercadoPago } from "../../Redux/Actions";
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

                <h3>Información de entrega</h3>
                <form onSubmit={e => handleSubmit(e)} >

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
                            <label>DIRECCION</label>
                            <input type='text' name='address' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.address)} />
                        </div>
                        <div className="sarasa">
                            <label>ALTURA</label>
                            <input type='text' name='number' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.number)} />
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
                            <label>LOCALIDAD</label>
                            <input type='text' name='location' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.location)} />
                        </div>
                        <div className="sarasa">

                            <label>CODIGO POSTAL</label>
                            <input type='text' name='cp' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.cp)} />
                        </div>
                        <div className="sarasa">

                            <label>PROVINCIA</label>
                            <input type='text' name='province' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.province)} />
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
                            <label>TELEFONO</label>
                            <input type='text' name='telephone' onChange={handleInputChange} placeholder={usuarioLogeado.map((el) => el.telephone)} />
                        </div>
                        <div>
                        </div>
                        <p>En el caso que algún dato este erroneo cambielo</p>
                        <div>
                        </div>
                        <div>
                        </div>
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

                        <Button variant="outlined" startIcon={<AttachMoneyIcon />} href="https://www.mercadopago.com.ar/checkout/v1/payment/redirect/644b005a-debd-4e39-b84c-e116e60b12b1/payment-option-form/?preference-id=255500937-d5de320a-9e6c-4247-b9e3-ee18a7cfcc2f&p=7cd4d9a374e78e54a8061566fd1eb19c#/">
                            Ir a pagar
                        </Button>
                    </Box>
                </div>
            </div>
        );
    }
}
