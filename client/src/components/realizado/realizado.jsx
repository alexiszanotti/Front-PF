import "./realizado.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Realizado() {
  return (
    <>
      <div className="realizado">
        <h1>COMPRA REALIZADA</h1>
        <img src="https://media3.giphy.com/media/wsTyMcJnYxnSyaGleS/giphy.gif?cid=790b76119c39e25e110e144278ca96b1036c37343d31ea78&rid=giphy.gif&ct=s" />
      </div>
      <div className="btn7">
        <Link to="/">
          <Button size='large' variant='contained'>
            HOME
          </Button>
        </Link>
      </div>
    </>
  );
}
