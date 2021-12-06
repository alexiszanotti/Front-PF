import "./misCompras.css";
import React, { useEffect } from "react";
import { getAllUsers, filterByCart } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import Compras from "./compras/compras";

export default function MisCompras() {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const usuarios = useSelector(state => state.users);
  const usuariosCarritoFiltrado = usuarios.filter(el => el.id === userLogin.id);
  const compras = useSelector(state => state.misCompras);
  const compras2 = compras.map((el) => el.products);
  const compras3 = compras2.flat();
  console.log(compras2.flat());

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(filterByCart(usuariosCarritoFiltrado[0].id));
    console.log("hola")
  }, [dispatch, usuariosCarritoFiltrado[0].id]);

  return (
    <div className='misComprasContainer'>
      <h1>Mis compras</h1>
      <p>Total de compras</p>
      {compras3.map(el => {
        return (
          <Compras
            productId={el.productId}
            precioProducto={el.price}
            nombreProducto={el.productName}
            imagenProducto={el.images}
            fechaCompra={compras[0].dateOfPurchase}
            estadoOrden={compras[0].status}
            cantidad={el.quantity}
            userId={compras[0].userId}
            cartId={usuariosCarritoFiltrado[0].Cart.id}
          />
        );
      })}
    </div>
  );
}
