import "./shopingCart.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardShopingCart from "../cardShopingCart/cardShopingCart";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  emptyCart,
  addDataBaseShoppingCart,
  deleteDataBaseShoppingCart,
  emptyShoppingPersist,
} from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comprar from "../shopingCar/Comprar.jsx";

export default function ShopingCart() {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.shoppingCart);
  const logIn = useSelector(state => state.userLogin);
  const users = useSelector(state => state.users);
  const dataBaseShopping = useSelector(state => state.ShoppingAlmacen);
  const productShopping = dataBaseShopping.map(el => el.product);

  let idUser = logIn.id;

  let usr = users?.filter(user => user.id === logIn.id);
  let cartId = usr?.map(el => el.Cart.id);

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
  const errorSubmit = () => {
    toast.error("Productos eliminados con éxito", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const vaciar = () => {
    dispatch(emptyCart());
    dispatch(emptyShoppingPersist());
    errorSubmit();
  };

  useEffect(() => {
    if (idUser) {
      dispatch(addDataBaseShoppingCart(cartId.toString()));
    }
  }, [dispatch]);

  const borrarCarrito = () => {
    for (let i = 0; i < dataBaseShopping.length; i++) {
      dispatch(
        deleteDataBaseShoppingCart({
          cartId: cartId.toString(),
          productId: dataBaseShopping[i].productId,
        })
      );
    }
    dispatch(emptyShoppingPersist());
    setTimeout(() => {
      dispatch(addDataBaseShoppingCart(cartId.toString()));
    }, 200);
  };

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
            <div className='comprarAhora'>
              <h2 className='ahora'>¡COMPRÁ AHORA! TU CARRITO NO ASEGURA INVENTARIO</h2>
              <p className='tene'>
                Tené en cuenta que los productos añadidos al carrito no se reservan. Finalizá tu
                compra ahora para hacerlos tuyos.
              </p>
              <Button onClick={borrarCarrito} variant='contained'>
                BORRAR TODO
              </Button>
            </div>
            <div className='contenidoShoppingCart'>
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
            </div>
            <div className='btnComprar'>
              <Comprar />
            </div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
          </div>
        ) : (
          <div>
            <h1 className='tucarrito'>TU CARRITO</h1>
            <div className='comprarAhora'>
              <h2 className='ahora'>¡COMPRÁ AHORA! TU CARRITO NO ASEGURA INVENTARIO</h2>
              <p className='tene'>
                Tené en cuenta que los productos añadidos al carrito no se reservan. Finalizá tu
                compra ahora para hacerlos tuyos.
              </p>
              <button onClick={vaciar}>BORRAR TODO</button>
            </div>
            <div>
              {cart?.map(products => {
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
              <Comprar />
            </div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
