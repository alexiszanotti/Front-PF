import "./checkout.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { changeStatusCart, mercadoPago } from "../../Redux/Actions/index";
import { Button } from "@mui/material";
import Footer from "../footer/footer";
export default function Checkuot() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.userLogin);
  const usr = useSelector(state => state.users);
  let usuarioLogeado = usr.filter(el => el.id === usuario.id);
  let cartId = usuarioLogeado.map(el => el.Cart.id);
  const idMP = useSelector(state => state.mercadoPago);
  const totalCompra = useSelector(state => state.checkoutProducts1);
  const [esperar, setEsperar] = useState(false);

  let cartIdd = cartId.toString();

  let total = 0;
  let suma = totalCompra.map(el => Number(el.price) * el.cantidad + totalCompra.length);
  for (let i of suma) total += i;

  suma = suma + totalCompra.length;
  let s = 0;
  let sumas = totalCompra.map(el => Number(el.cantidad));
  for (let i of sumas) s += i;

  const setChangeStatusCart = () => {
    let hoy = new Date();
    let fecha = hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS * 2);
    let fechaFutura = manana.getDate() + "-" + (manana.getMonth() + 1) + "-" + manana.getFullYear();

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
    }, 8000);
  };

  // if (loading === true) {

  setTimeout(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    const attr_data_preference = document.createAttribute("data-preference-id");
    if (idMP.length === 0) {
      console.log("no hay id");
    } else {
      //Crea un elemento html script

      attr_data_preference.value = idMP; //Le asigna como valor el id que devuelve MP

      //Agrega atributos al elemento script

      script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);

      setLoading(true);

      //Agrega el script como nodo hijo del elemento form
      if (loading === true) {
        document.getElementById("form1").appendChild(script);
        return () => {
          //Elimina el script como nodo hijo del elemento form
          document.getElementById("form1").removeChild(script);
        };
      }
    }
  }, 8000);
  // }

  const render = !loading ? (
    <>
      <div className='pepe'>
        <img
          className='zapatilla'
          alt='l'
          src='https://media4.giphy.com/media/K0vYRWCj0FlcBGSxK6/giphy.gif?cid=ecf05e47bc2jhce9is24eznj6n9h7ioelcx7vzys02ya3uwn&rid=giphy.gif&ct=s'
        />
      </div>
    </>
  ) : (
    <div>
      <div className='pepe'>
        <h1>ULTIMO PASO</h1>
        <h3>Espere hasta que aparezca el boton de pagar y listo puedes realizar tu compra !</h3>
        <form id='form1'></form>
        <img
          alt='l'
          src='https://media2.giphy.com/media/8lKyjU3F63hoa7KtOO/giphy.gif?cid=ecf05e47nwshrl1mk3bc1tm4q5m5nohcp5867n5nx5zmpdyy&rid=giphy.gif&ct=s'
        />
      </div>
    </div>
  );

  return (
    <div>
      {esperar === false ? (
        <>
          <div className='title-checkout'>
            <h1>RESUMEN DE COMPRA</h1>
            <Button onClick={setChangeStatusCart} variant='contained'>
              CONTINUAR CON EL PAGO
            </Button>
          </div>
          <div className='checkout'>
            <div className='datos-chekout'>
              <div className='btnContinuarConElPago'></div>
              {usuarioLogeado.map(el => {
                return (
                  <div>
                    <p>
                      <strong> Nombre:</strong> <br /> {el.name} {el.lastName}
                    </p>
                    <p>
                      <strong>Mail:</strong> {el.email}
                    </p>
                    <p>
                      <strong>Telefono:</strong> <br /> {el.telephone}
                    </p>
                    <p>
                      <strong>Direccion:</strong>{" "}
                    </p>
                    <p>
                      Calle: {el.address}
                      <br />
                      Numero: {el.number}
                      <br />
                      CP: {el.cp}
                      <br />
                      Localidad: {el.location}
                      <br />
                      Provincia: {el.province}
                      <br />
                    </p>
                  </div>
                );
              })}
            </div>
            <div className='zapatillas-checkout'>
              <ImageList sx={{ width: 500, height: 450 }}>
                <ImageListItem key='Subheader' cols={2}>
                  <ListSubheader component='div'>
                    <strong>TOTAL A PAGAR:</strong> {"$ " + total}{" "}
                    <strong> - TOTAL DE PRODUCTOS:</strong> {s}{" "}
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
            </div>
          </div>
            <div className="footerCheckout">
            <Footer />
            </div>
        </>
      ) : (
        <>
          <div className='shoppingGeneral'>{render}</div>
        </>
      )}
    </div>
  );
}
