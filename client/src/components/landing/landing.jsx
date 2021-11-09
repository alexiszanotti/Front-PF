import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Landing() {
  return (
    <div>
        <h1>INICIO</h1>
        <Link to="/home">
        <Button>INICIO</Button>
        </Link>
    </div>
  );
}  