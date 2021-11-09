import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export default function Landing() {
  return (
    <div>
        <h1>bienvenidos</h1>
        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/adidas-pulseboost-hd-1561454648.jpg" alt="" height="700" width="1150"/>
        <Link to="/home">
        <Button>INICIO</Button>
        </Link>
    </div>
  );
}  