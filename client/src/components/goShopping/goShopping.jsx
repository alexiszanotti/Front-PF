import React, { useEffect } from "react";
import { shoppingCart } from "../../Redux/Actions/index"
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function GoShopping() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.shoppingCart);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // useEffect(() => {
    //     dispatch(shoppingCart());
    // }, [dispatch]);

    console.log(products);
    return (
        <div>
            <h1>Estas en el shoping</h1>
            <div className="boxInvitados">
                <h3>Información de entrega</h3>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Nombre(S)"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Apellido"
                    />
                </Box>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Calle"
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Número"
                    />
                    <TextField
                        id="outlined-required"
                        label="Piso"
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-required"
                        label="Departamento"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Código postal"
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="select-currency"
                        select
                        label="Provincia"
                        required
                    >
                        <MenuItem value={10}>Buenos Aires</MenuItem>
                        <MenuItem value={20}>Cordoba</MenuItem>
                        <MenuItem value={30}>Mendoza</MenuItem>
                    </TextField>
                    <TextField
                        required
                        id="outlined-required"
                        label="Localidad"
                    />
                </Box>
                <label><strong>País:</strong> Argentina</label>
            </div>
            <div className="informacionContacto">
                <h3>Información de contacto</h3>
                <label>Usaremos tus datos para informarte sobre la entrega</label>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Correo electrónico"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Teléfono"
                    />
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
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Button variant="outlined" startIcon={<AttachMoneyIcon />}>
                        Ir a pagar
                    </Button >
                </Box>
            </div>
        </div>
    )
}