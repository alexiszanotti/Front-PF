import "./shopingCart.css"
import React from "react";
import { useSelector } from 'react-redux';
import CardShopingCart from "../cardShopingCart/cardShopingCart";
import TextField from '@mui/material/TextField';
import { Button} from "@mui/material";
import {Link} from "react-router-dom";
import { Box } from "@mui/system";
export default function ShopingCart() {


    const cart = useSelector((state) => state.shoppingCart);


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
                            <h1 className="tucarrito">TU CARRITO</h1>
                            <h2 className="total">TOTAL ({cart.length} {cart.length === 1 ? "PRODUCTO" : "PRODUCTOS"}  ): $ {total}</h2>
                            <div className="comprarAhora">
                                <h2 className="ahora">¡COMPRÁ AHORA! TU CARRITO NO ASEGURA INVENTARIO</h2>
                                <p className="tene">Tené en cuenta que los productos añadidos al carrito no se reservan. Finalizá tu compra ahora para hacerlos tuyos.</p>
                            </div>
                            <div className="contenedorTotal">
                                <h1>RESUMEN DEL PEDIDO </h1>
                                <h2>{cart.length} {cart.length === 1 ? "PRODUCTO" : "PRODUCTOS"}       $ {total}</h2>
                                <h2>TOTAL: $ {total}</h2>
                            <TextField label="Codigo de descuento" color="secondary" focused />
                            <Box>
                                <Link to="/pago">
                                <Button>IR A COMPRAR</Button>
                                </Link>
                            </Box>
                            <h1 className="metodoTarjeta">OPCIONES DE PAGO</h1>
                            <img alt="k" className="imagenTarjeta" src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esAR/Images/Logos_Argentina-sinMP_tcm216-730132.png" />
                            </div>
                            <Link to="/home">
                                <button className="botonCart1">volver</button>
                            </Link>
                        </div>
                    }
    
                </div>
                {
                    cart === undefined || cart.length === 0 ? <h1>no hay nada</h1> :
                    cart.map((products) => {
                        return(
                            <div className="contenedorCart">
                                <CardShopingCart 
                                    key={products.id}
                                    id={products.id}
                                    title={products.productName}
                                    price={Number(products.salePrice)}
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

