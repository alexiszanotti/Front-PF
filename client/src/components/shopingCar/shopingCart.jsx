import "./shopingCart.css";
import React, { useEffect } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comprar from "../shopingCar/Comprar.jsx";
import Footer from "../footer/footer";

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
      if(cartId){
        dispatch(addDataBaseShoppingCart(cartId.toString()));
      }
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
            <div className='titulo-btn-container'>
              <h1 className='tucarrito'>TU CARRITO</h1>

              <h2 className='ahora'>¡COMPRÁ AHORA! TU CARRITO NO ASEGURA INVENTARIO</h2>
              <p className='tene'>
                Tené en cuenta que los productos añadidos al carrito no se reservan. Finalizá tu
                compra ahora para hacerlos tuyos.
              </p>

              <Button className='btnComprar1' onClick={borrarCarrito} variant='contained'>
                BORRAR TODO
              </Button>
            </div>
            <div className='contenidoShoppingCart'>
              {productShopping?.map(products => {
                return (
                  <div key={products.id}>
                    <CardShopingCart
                      key={products.id}
                      id={products.id}
                      images={products.images}
                      title={products.productName}
                      stock={products.stock}
                      price={Number(products.salePrice)}
                    />
                  </div>
                );
              })}
            </div>

            <div className='btnComprar'>
              <Comprar />
            </div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
            <Footer />
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
              <Button onClick={vaciar} variant='contained'>
                BORRAR TODO
              </Button>
            </div>
            <div className='contenidoShoppingCart'>
              {cart?.map(products => {
                return (
                  <div key={products.id}>
                    <CardShopingCart
                      key={products.id}
                      id={products.id}
                      images={products.images}
                      title={products.productName}
                      stock={products.stock}
                      price={Number(products.salePrice)}
                    />
                  </div>
                );
              })}
            </div>
            <div className='btnComprar'>
              <Comprar />
            </div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
