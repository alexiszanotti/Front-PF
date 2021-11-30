import './misCompras.css';
import React, { useState, useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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
import Compras from "./compras/compras"


export default function MisCompras() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const usuarios = useSelector((state) => state.users)
    const usuariosCarritoFiltrado = usuarios.filter(el => el.id === userLogin.id)
    var compras = useSelector((state) => state.misCompras)

    useEffect(() => {
        // dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(filterByCart(usuariosCarritoFiltrado[0].Cart.id))
    }, [dispatch]);

    const productosFiltrados = compras.Cart
    const productosFiltros = compras?.Cart?.ProductsInCarts
    console.log(productosFiltrados, "GASTONNNN")
    console.log(compras, "sarasa")
    
    const userLogeado = useSelector((state) => state.userLogin);
    const history = useHistory();    
    const { user, isAuthenticated, logout } = useAuth0();

    if(!isAuthenticated && userLogeado.type === undefined) history.push("/home");

    return (
            <div className='misComprasContainer'>
                <h1>Mis compras</h1>
                <p>Total de compras</p>
                {
                    productosFiltros?.map((el) =>{
                        return(
                            <Compras 
                                id={el.product.id}
                                precioProducto={el.product.salePrice}
                                nombreProducto= {el.product.productName}
                                imagenProducto= {el.product.images} 
                                fechaCompra={productosFiltrados.dateOfPurchase}
                                estadoOrden={productosFiltrados.status}
                                cantidad={el?.quantity}
                            />
                        )
                    })
                }
            </div>
        )
}