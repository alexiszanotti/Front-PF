import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { modifyProduct } from "../../../Redux/Actions/index";
import "./stock.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Stock() {
  const dispatch = useDispatch();

  const products = useSelector(state => state.products);

  const [input, setInput] = useState({
    id: "",
    stock: 0,
  });

  const handleStock = e => {
    setInput({ ...input, stock: e.target.value });
  };

  if (input.id !== "") {
    dispatch(modifyProduct(input));
  }

  const successSubmit = () => {
    toast.success("Cantidad modificada con éxito", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleButton = () => {
    setTimeout(() => {
      window.location.replace("");
    }, 2000);
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <div className='contentStock'>
      <h1>MODIFICAR STOCK</h1>

      {products.map(e => {
        return (
          // <div className="gridContainer">
              <div className="elementStock">
                <div className="imagen1">
                    <Img alt='complex' src={e.images} />
                    </div>
                <Typography >
                  {e.productName}
                </Typography>
                <div class="zapallo">
                    <Button
                      onClick={() => {
                        setInput({ ...input, id: e.id });
                        successSubmit();
                        handleButton();
                      }}
                      variant='outlined'
                    >
                      Modificar Stock
                    </Button>
                    <br></br>
                    <input
                      id='outlined-number'
                      required
                      placeholder={e.stock}
                      label={e.stock}
                      type='number'
                      onChange={e => handleStock(e)}
                    />
                </div>
              {/* </div> */}
          </div>
        );
      })}
      <Link to='/'>
        <button className='botonAdmin'>
          Volver
        </button>
      </Link>
      <ToastContainer />
    </div>
  );
}
