import "./shopingCart.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardShopingCart from "../cardShopingCart/cardShopingCart";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { emptyCart, checkoutProducts } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
export default function ShopingCart() {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.shoppingCart);
  const userLogin = useSelector(state => state.userLogin);
  const dataBaseShopping = useSelector(state => state.ShoppingAlmacen);
  const productShopping = dataBaseShopping.map(el => el.product);
  let idUser = userLogin.id;

  const [valor, setValor] = useState({
    product: productShopping,
  });

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
  };

  console.log(valor);
  const handleCheckOut = () => {
    dispatch(checkoutProducts(valor));
  };

  return (
    <div>
      <div>
        {cart.length === 0 && dataBaseShopping?.length === 0 ? (
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
              <TextField label='Codigo de descuento' color='secondary' focused />
              <Box>
                <Link to='/pago'>
                  <Button onClick={handleCheckOut}>IR A COMPRAR</Button>
                </Link>
              </Box>
              <h1 className='metodoTarjeta'>OPCIONES DE PAGO</h1>
              <img
                alt='k'
                className='imagenTarjeta'
                src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esAR/Images/Logos_Argentina-sinMP_tcm216-730132.png'
              />
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
              <TextField label='Codigo de descuento' color='secondary' focused />
              <Box>
                <Link to='/pago'>
                  <Button>IR A COMPRAR</Button>
                </Link>
              </Box>
              {/* <h1 className="metodoTarjeta">OPCIONES DE PAGO</h1>
              <img
                alt="k"
                className="imagenTarjeta"
                src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esAR/Images/Logos_Argentina-sinMP_tcm216-730132.png"
              /> */}
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
    </div>
  );
}
