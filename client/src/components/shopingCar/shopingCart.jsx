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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShopingCart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.shoppingCart);
  const logIn = useSelector(state => state.userLogin);
  const users = useSelector(state => state.users);
  const dataBaseShopping = useSelector(state => state.ShoppingAlmacen);
  const productShopping = dataBaseShopping.map(el => el.product);
  const stockTotal = productShopping.map(el => el.stock);
  let idUser = logIn.id;

  let usr = users?.filter(user => user.id === logIn.id);
  let cartId = usr?.map(el => el.Cart.id);

  const errorSubmitCart = () => {
    toast.error('Productos eliminados con éxito', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
  }

  let total = 0;
  if (idUser) {
    if (productShopping) {
      let suma = productShopping.map(el => Number(el.salePrice));
      for (let i of suma) total += i;
    }
  } else {
    let suma = cart.map(el => Number(el.salePrice));
    for (let i of suma) total += i;
  }

  const vaciar = () => {
    dispatch(emptyCart());
    errorSubmitCart()
  };

  useEffect(() => {
    if (idUser) {
      dispatch(addDataBaseShoppingCart(cartId.toString()));
    }
  }, [dispatch]);

  return (
    <div>
      <div>
        {productShopping?.length === 0 && cart.length === 0 ? (
          <div className='carritoVacio'>
            <h1>EL CARRITO ESTÁ VACÍO</h1>
            <p>Una vez que añadas algo a tu carrito, aparecerá acá. ¿Listo para empezar?</p>
            <Link to='/home'>
              <Button>Empezar</Button>
            </Link>
          </div>
        ) : idUser ? (
          <div>
            <h1 className='tucarrito'>TU CARRITO</h1>
            <h2 className='total'>
              TOTAL ({productShopping?.length}{" "}
              {productShopping?.length === 1 ? "PRODUCTO" : "PRODUCTOS"} ): $ {total}
            </h2>
            <div className='comprarAhora'>
              <h2 className='ahora'>¡COMPRÁ AHORA! TU CARRITO NO ASEGURA INVENTARIO</h2>
              <p className='tene'>
                Tené en cuenta que los productos añadidos al carrito no se reservan. Finalizá tu
                compra ahora para hacerlos tuyos.
              </p>
              <button onClick={vaciar}>BORRAR TODO</button>
            </div>
            <div className='contenedorTotal'>
              <h1>RESUMEN DEL PEDIDO </h1>
              <h2>
                {productShopping?.length} {productShopping?.length === 1 ? "PRODUCTO" : "PRODUCTOS"}{" "}
                $ {total}
              </h2>
              <h2>TOTAL: $ {total}</h2>
              {stockTotal.every(el => el > 0) ? (
                <Box>
                  <Link to='/pago'>
                    <Button>Ir a comprar</Button>
                  </Link>
                </Box>
              ) : (
                <>
                  <Alert variant='outlined' severity='error'>
                    Stock no disponible
                  </Alert>
                </>
              )}
            </div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
          </div>
        ) : (
          <div>
            <h1 className='tucarrito'>TU CARRITO</h1>
            <h2 className='total'>
              TOTAL ({productShopping.length}{" "}
              {productShopping.length === 1 ? "PRODUCTO" : "PRODUCTOS"} ): $ {total}
            </h2>
            <div className='comprarAhora'>
              <h2 className='ahora'>¡COMPRÁ AHORA! TU CARRITO NO ASEGURA INVENTARIO</h2>
              <p className='tene'>
                Tené en cuenta que los productos añadidos al carrito no se reservan. Finalizá tu
                compra ahora para hacerlos tuyos.
              </p>
              <button onClick={vaciar}>BORRAR TODO</button>
            </div>
            <div className='contenedorTotal'>
              <h1>RESUMEN DEL PEDIDO </h1>
              <h2>
                {productShopping.length} {productShopping.length === 1 ? "PRODUCTO" : "PRODUCTOS"} ${" "}
                {total}
              </h2>
              <h2>TOTAL: $ {total}</h2>
              <Box>
                <Link to='/pago'>
                  <Button>IR A COMPRAR</Button>
                </Link>
              </Box>
            </div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
          </div>
        )}
      </div>
      <div className='botonCart'>
        {idUser ? (
          <>
            {productShopping?.map(products => {
              return (
                <>
                  <CardShopingCart
                    key={products.id}
                    id={products.id}
                    images={products.images}
                    title={products.productName}
                    stock={products.stock}
                    price={Number(products.salePrice)}
                  />
                </>
              );
            })}
          </>
        ) : (
          cart.map(products => {
            return (
              <div className='contenedorCart'>
                <CardShopingCart
                  key={products.id}
                  id={products.id}
                  title={products.productName}
                  price={Number(products.salePrice)}
                  brand={products.collection.name}
                  images={products.images}
                  stock={products.stock}
                />
              </div>
            );
          })
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
