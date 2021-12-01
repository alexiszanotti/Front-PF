import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { mercadoPago } from "../../Redux/Actions";
import MercadoPago from "../mercadoPago/mercadoPago"
import axios from "axios";
import {useDispatch} from "react-redux";
import { Modal } from "@material-ui/core";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Checkuot() {
  const [modal1, setModal1] = useState(false);

  const openCloseModal1 = () => {
    setModal1(!modal1);
  };

  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.userLogin);
  const usr = useSelector((state) => state.users);
  let usuarioLogeado = usr.filter((el) => el.id === usuario.id);
  let cartId = usuarioLogeado.map((el) => el.Cart.id);
  const idMP = useSelector((state) => state.mercadoPago )

  console.log(cartId.toString());

  let cartIdd = cartId.toString()

  useEffect(()=>{
    dispatch(mercadoPago({cartId:  cartIdd}))
  },[dispatch])
  

  const product = useSelector((state) => state.checkoutProducts.product);
  let total= 0;
  let suma = product.map((el) => Number(el.salePrice));
  for (let i of suma) total += i;

  let s= 0;
  let sumas = product.map((el) => Number(el.stock));
  for (let i of sumas) s += i;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 650,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const editar = (
    <div className='detailContainer'>
      <h1>Estas seguro que quieres realizar la compra?</h1>
      <div className="formulario">
        <MercadoPago data={idMP}/>
        <Link to="/">
        <Button>Volver</Button>
        </Link>
      </div>

    </div>
  );
  return (
    <div>
      <div className="shoppingGeneral">
        <h1>RESUMEN DE COMPRA</h1>
        {usuarioLogeado.map((el) => {
          return (
            <div>
              <p>
                Nombre: {el.name} {el.lastName}
              </p>
              <p>
              Mail: {el.email}
              </p>
              <p>
              Telefono: {el.telephone}
              </p>
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
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">CARRITO - TOTAL A PAGAR: {total} - TOTAL DE PRODUCTOS: {s} </ListSubheader>
        </ImageListItem>
        {product?.map((item) => (
          <ImageListItem key={item.images}>
            <img
              src={item.images}
              srcSet={item.images}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.productName}
              subtitle={item.salePrice} 
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.productName}`}
                >
                  {item.stock}
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <button onClick={() => openCloseModal1()} >acá</button>.
      <Modal open={modal1} onClose={openCloseModal1}>
              {editar}
      </Modal>
    
      </div>
    </div>
  );
}