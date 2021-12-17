import "./shopingCart.css";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export default function Comprar() {
  const history = useHistory();
  const logIn = useSelector(state => state.userLogin);
  let idUser = logIn.id;

  let checkoutProducts = [];

  const { loginWithRedirect } = useAuth0();
  function handleClick(e) {
    e.preventDefault();
    setTimeout(() => {
      history.push("/pago");
    }, 1000);
    console.log(checkoutProducts, "total");
  }

  return (
    <div>
      {idUser ? (
        <>
          <div>
            <Box>
              <Button size='large' onClick={e => handleClick(e)} variant='contained'>
                PAGAR
              </Button>
            </Box>
          </div>

          <div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Box>
              <Button variant='contained' onClick={() => loginWithRedirect()}>
                Loguearte
              </Button>
            </Box>
          </div>
          <div>
            <Link to='/home'>
              <button className='botonCart1'>volver</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
