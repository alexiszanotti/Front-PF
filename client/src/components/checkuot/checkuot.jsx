import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { changeStatusCart, mercadoPago } from "../../Redux/Actions/index";
import MercadoPago from "../mercadoPago/mercadoPago";

export default function Checkuot() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.userLogin);
  const usr = useSelector((state) => state.users);
  const enzo = useSelector((state) => state.enzoPrueba);
  let usuarioLogeado = usr.filter((el) => el.id === usuario.id);
  let cartId = usuarioLogeado.map((el) => el.Cart.id);
  const idMP = useSelector((state) => state.mercadoPago);
  const totalCompra = useSelector((state) => state.checkoutProducts1);
  const [esperar, setEsperar] = useState(false);

  let cartIdd = cartId.toString();

  let total = 0;
  let suma = totalCompra.map(
    (el) => Number(el.price) * el.cantidad + totalCompra.length
  );
  for (let i of suma) total += i;

  suma = suma + totalCompra.length;
  let s = 0;
  let sumas = totalCompra.map((el) => Number(el.cantidad));
  for (let i of sumas) s += i;

  const setChangeStatusCart = () => {
    let hoy = new Date();
    let fecha =
      hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS * 2);
    let fechaFutura =
      manana.getDate() +
      "-" +
      (manana.getMonth() + 1) +
      "-" +
      manana.getFullYear();

    dispatch(
      changeStatusCart({
        cartId: cartIdd, // carrito del user logeaddo
        InfoCart: [
          {
            dateOfPurchase: fecha,
            confirmationDate: fecha,
            dateCancellation: fechaFutura,
          },
        ], // Arreglo con un objeto con info de la fecha en la cual se clickeo (dia de hoy)
        infoProducts: totalCompra,
      })
    );

    setEsperar(true);
    setTimeout(() => {
      dispatch(mercadoPago({ cartId: cartIdd }));
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      const script = document.createElement("script"); //Crea un elemento html script

      const attr_data_preference =
        document.createAttribute("data-preference-id"); //Crea un nodo atribute
      attr_data_preference.value = idMP; //Le asigna como valor el id que devuelve MP

      //Agrega atributos al elemento script
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);

      console.log(idMP);
      setLoading(true);

      //Agrega el script como nodo hijo del elemento form
      document.getElementById("form1").appendChild(script);
      // return () => {
      //   //Elimina el script como nodo hijo del elemento form
      //   document.getElementById("form1").removeChild(script);
      // };
    }, 8000);
  }, [idMP]);

  const render = !loading ? (
    <>
      <h1>Cargando....</h1>
      <img src="https://media4.giphy.com/media/K0vYRWCj0FlcBGSxK6/giphy.gif?cid=ecf05e47bc2jhce9is24eznj6n9h7ioelcx7vzys02ya3uwn&rid=giphy.gif&ct=s"  width="1000" height="850" />
    </>
  ) : (
    <div>
      <form id="form1"></form>
      <img src="https://media2.giphy.com/media/8lKyjU3F63hoa7KtOO/giphy.gif?cid=ecf05e47nwshrl1mk3bc1tm4q5m5nohcp5867n5nx5zmpdyy&rid=giphy.gif&ct=s"/>  
    </div>
  );

  return (
    <div>
      {esperar === false ? (
        <>
          <div className="shoppingGeneral">
            <h1>RESUMEN DE COMPRA</h1>
            {usuarioLogeado.map((el) => {
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
              <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">
                  CARRITO - TOTAL A PAGAR: {"$ " + total} - TOTAL DE PRODUCTOS:{" "}
                  {s}{" "}
                </ListSubheader>
              </ImageListItem>
              {totalCompra?.map((item) => (
                <ImageListItem key={item.images}>
                  <img
                    src={item.images}
                    srcSet={item.images}
                    alt={item.title}
                    loading="lazy"
                  />
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
            <button onClick={setChangeStatusCart}>CONTINUAR CON EL PAGO</button>
          </div>
        </>
      ) : (
        <>
          <div className="shoppingGeneral">{render}</div>
        </>
      )}
    </div>
  );
}
