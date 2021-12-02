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
  var compras = useSelector(state => state.misCompras);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(filterByCart(usuariosCarritoFiltrado[0].Cart.id));
  }, [dispatch]);

  const productosFiltrados = compras.Cart;
  const productosFiltros = compras?.Cart?.ProductsInCarts;

  const userLogeado = useSelector(state => state.userLogin);

  return (
    <div className='misComprasContainer'>
      <h1>Mis compras</h1>
      <p>Total de compras</p>
      {productosFiltros?.map(el => {
        return (
          <Compras
            productId={el.product.id}
            precioProducto={el.product.salePrice}
            nombreProducto={el.product.productName}
            imagenProducto={el.product.images}
            fechaCompra={productosFiltrados.dateOfPurchase}
            estadoOrden={productosFiltrados.status}
            cantidad={el?.quantity}
            cartId={usuariosCarritoFiltrado[0].Cart.id}
            userId={usuariosCarritoFiltrado}
          />
        );
      })}
    </div>
  );
}
