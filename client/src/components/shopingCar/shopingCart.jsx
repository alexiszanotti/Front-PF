import "./shopingCart.css"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { shoppingCart}  from "../../Redux/Actions/index.jsx";
import CardShopingCart from "../cardShopingCart/cardShopingCart";
import "./shopingCart.css"
import TextField from '@mui/material/TextField';
import { Button} from "@mui/material";
import {Link} from "react-router-dom";
import { Box } from "@mui/system";
export default function ShopingCart(props) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.shoppingCart);

    useEffect(() =>{
        dispatch(shoppingCart(props.match.params.id));
    },[dispatch])

    let total = 0;
    let suma = cart.map((el) => Number(el.salePrice));
    for(let i of suma) total+=i;
    

    return(
            <div>
                <div>
                    {
                        cart.length === 0 ? 
                        <div>
                            <h1>EL CARRITO ESTÁ VACÍO</h1>
                            <p>Una vez que añadas algo a tu carrito, aparecerá acá. ¿Listo para empezar?</p>
                            <Link to="/home">
                                <Button>Empezar</Button>
                            </Link>
                        </div> : 
                        <div>
                            <h1>TU CARRITO</h1>
                            <h2>TOTAL: ${total}</h2>
                            <div className="contenedorTotal">
                                <h1>RESUMEN DEL PEDIDO </h1>
                                <h2>{cart.length} {cart.length === 1 ? "PRODUCTO" : "PRODUCTOS"}       ${total}</h2>
                                <h2>TOTAL: {total}</h2>
                            <TextField label="Codigo de descuento" color="secondary" focused />
                            <Box>
                                <Button>IR A COMPRAR</Button>
                            </Box>
                            </div>
                            <Link to="/home">
                                <button className="botonCart1">volver</button>
                            </Link>
                        </div>
                    }
    
                </div>
                {
                    cart === undefined || cart.length === 0 ? <h1></h1> :
                    cart.map((products) => {
                        return(
                            <div className="contenedorCart">
                                <CardShopingCart 
                                    key={products.id}
                                    id={products.id}
                                    title={products.productName}
                                    price={products.salePrice}
                                    brand={products.collection.name}
                                    images={products.images[0]}
                             
                                    />
                            
                            </div>
                            
                        )
                    })
                }
            </div>
   
    ) 
}

