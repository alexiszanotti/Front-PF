import './misCompras.css';
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getAllOrders, getAllUsers, filterByCart } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";


export default function MisCompras() {
    const dispatch = useDispatch();
    const allOrders = useSelector(state => state.orders);
    const userLogin = useSelector((state) => state.userLogin);
    const logIn = useSelector(state => state.userLogin);
    const usuarios = useSelector((state) => state.users)
    const usuariosCarritoFiltrado = usuarios.filter(el => el.id === userLogin.id)
    const compras = useSelector((state) => state.compras)
    console.log((usuariosCarritoFiltrado[0].Cart.id), "ID CARRITO")
    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(filterByCart(usuariosCarritoFiltrado[0].Cart.id))
    }, [dispatch]);

    const productosAFiltrar = compras.Cart
    console.log(compras, "asdasdasd")
    console.log(productosAFiltrar, "aprendimosque hay qyue yusar AWAIT")
    
    return (
        <div className='misComprasContainer'>
            <h1>Mis compras</h1>
            <p>Total de compras</p>
            <div>
                {
                    allOrders.map(el => {
                        return (
                            <Card sx={{ maxWidth: 1200 }}>
                                <CardActionArea>
                                    <CardMedia
                                    // component="img"
                                    // height="140"
                                    // image="/static/images/cards/contemplative-reptile.jpg"
                                    // alt="green iguana"
                                    />
                                    <TextField
                                        id="outlined-read-only-input"
                                        fullWidth
                                        // defaultValue={el.dateOfPurchase}
                                InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <CardContent className="misComprasCard">
                                        <Typography gutterBottom variant="h5" component="div">
                                            Imagen
                                        </Typography>
                                        <div className="misCompras">
                                            <Typography gutterBottom variant="h5" component="div">
                                                Status
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Fecha de entrega
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Nombre del producto
                                            </Typography>
                                        </div>
                                        <Stack direction="column" spacing={2}>
                                            <Button variant="contained">Ver compra</Button>
                                            <Button variant="contained"> Volver a comprar</Button>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })
                }

            </div>
        </div>
    )
}