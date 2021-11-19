import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useAuth0 } from '@auth0/auth0-react';

export default function GoShopping() {
    const usuario = useSelector((state) => state.userLogin);
    const usr = useSelector((state) => state.users);

    let usuarioLogeado = usr.filter((el) => el.id === usuario.id);


    const { loginWithRedirect } = useAuth0();

    if (Object.keys(usuario).length === 0) {
        loginWithRedirect();
    } else {
        return (
        <div>
            <h1>Estas en el shoping</h1>
            <div className="boxInvitados">
            <h3>Información de entrega</h3>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.name)} />
                <TextField required id="outlined-required" label={usuarioLogeado.map((el) => el.lastName)}/>
            </Box>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
            >
                <TextField required id="outlined-required" label="Calle" />
            </Box>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField required id="outlined-required" label="Número" />
                <TextField id="outlined-required" label="Piso" />
            </Box>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-required" label="Departamento" />
                <TextField required id="outlined-required" label="Código postal" />
            </Box>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="select-currency" select label="Provincia" required>
                <MenuItem value={10}>Buenos Aires</MenuItem>
                <MenuItem value={20}>Cordoba</MenuItem>
                <MenuItem value={30}>Mendoza</MenuItem>
                </TextField>
                <TextField required id="outlined-required" label="Localidad" />
            </Box>
            <label>
                <strong>País:</strong> Argentina
            </label>
            </div>
            <div className="informacionContacto">
            <h3>Información de contacto</h3>
            <label>Usaremos tus datos para informarte sobre la entrega</label>
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                required
                id="outlined-required"
                label={usuario.email}
                value={usuario.email}
                />
                <TextField required id="outlined-required" label="Teléfono" />
                {/* <label>Sólo llamaremos si tenemos alguna duda sobre tu pedido</label> */}
                <TextField
                required
                id="outlined-required"
                label="DNI (Ej. 12345678)"
                />
            </Box>
            </div>
            <div className="continuarPago">
            <Box
                component="form"
                sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <Button variant="outlined" startIcon={<AttachMoneyIcon />}>
                Ir a pagar
                </Button>
            </Box>
            </div>
        </div>
        );
    }
    }
