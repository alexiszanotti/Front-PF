import "./shopingCart.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardShopingCart from "../cardShopingCart/cardShopingCart";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import Alert from "@mui/material/Alert";
import { emptyCart, addDataBaseShoppingCart } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
export default function Comprar(){
    const totalCompra = useSelector((state) => state.totalCompra);
    
    
    return (
        <div>
            <div>
                <Box>
                    <Link to='/pago'>
                        <Button>IR A COMPRAR</Button>
                    </Link>
                </Box>
            </div>
            <div>
                <Link to='/home'>
                    <button className='botonCart1'>volver</button>
                </Link>
            </div>
        </div >
    );
}
