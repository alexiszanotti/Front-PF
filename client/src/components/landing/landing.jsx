import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Styles from "./landing.css";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/Actions";
export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div>
      <Box
        component='img'
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 1000, md: 1000 },
          maxWidth: { xs: 1000, md: 1000 },
        }}
        alt='The house from the offer.'
        src='https://marcadegol.com/fotos//2019/07/adidas-pulseboost-hd.jpg'
        height='500'
        width='1100'
      />
      <Link to='/home'>
        <Button>INICIO</Button>
      </Link>
    </div>
  );
}
