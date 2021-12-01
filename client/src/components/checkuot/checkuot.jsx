import React from "react";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Checkuot() {
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userLogin);
  const usr = useSelector(state => state.users);
  let usuarioLogeado = usr.filter(el => el.id === usuario.id);
  let cartId = usuarioLogeado.map(el => el.Cart.id);
  const idMP = useSelector(state => state.mercadoPago);
  const totalCompra = useSelector(state => state.totalCompra);
  let cartIdd = cartId.toString();

  let total = 0;
  let suma = totalCompra.map(el => Number(el.price) * el.cantidad + totalCompra.length);
  for (let i of suma) total += i;
  console.log("Suma", suma);
  suma = suma + totalCompra.length;
  let s = 0;
  let sumas = totalCompra.map(el => Number(el.cantidad));
  for (let i of sumas) s += i;

  const changeStatusCart = () => {};

  return (
    <div>
      <div className='shoppingGeneral'>
        <h1>RESUMEN DE COMPRA</h1>
        {usuarioLogeado.map(el => {
          return (
            <div>
              <p>
                Nombre: {el.name} {el.lastName}
              </p>
              <p>Mail: {el.email}</p>
              <p>Telefono: {el.telephone}</p>
              <p>Direccion: </p>
              <li>Calle: {el.address}</li>
              <li>Numero: {el.number}</li>
              <li>CP: {el.cp}</li>
              <li>Localidad: {el.location}</li>
              <li>Provincia: {el.province}</li>
            </div>
          );
        })}
        <ImageList sx={{ width: 500, height: 450 }}>
          <ImageListItem key='Subheader' cols={2}>
            <ListSubheader component='div'>
              CARRITO - TOTAL A PAGAR: {"$ " + total} - TOTAL DE PRODUCTOS: {s}{" "}
            </ListSubheader>
          </ImageListItem>
          {totalCompra?.map(item => (
            <ImageListItem key={item.images}>
              <img src={item.images} srcSet={item.images} alt={item.title} loading='lazy' />
              <ImageListItemBar
                title={item.title}
                subtitle={"$ " + item.price * item.cantidad}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    {item.cantidad}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <button>CONTINUAR CON EL PAGO</button>.
      </div>
    </div>
  );
}
