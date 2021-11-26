import React from "react";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Button } from "@mui/material";
export default function Checkuot() {
  const usuario = useSelector((state) => state.userLogin);
  const usr = useSelector((state) => state.users);

  let usuarioLogeado = usr.filter((el) => el.id === usuario.id);

  const product = useSelector((state) => state.checkoutProducts.product);

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
          <ListSubheader component="div">CARRITO</ListSubheader>
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
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button>Comprar Todo</Button>
      </div>
    </div>
  );
}
