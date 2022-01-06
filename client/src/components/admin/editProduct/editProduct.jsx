import "./editProduct.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import { getAllProducts, modifyProduct, getCollection } from "../../../Redux/Actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProduct() {
  const dispatch = useDispatch();
  const productsData = useSelector(state => state.products);
  const collections = useSelector(state => state.collections);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  const [input, setInput] = useState({
    id: "",
  });

  const successSubmit = () => {
    toast.success("Producto modificado con éxito", {
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

  const handleSelectChange = function (e) {
    setInput({ ...input, id: e.target.value });
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChangeCollection = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLabelChangeCollection = e => {
    setInput({ ...input, salePrice: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(modifyProduct(input));
    successSubmit(handleButton());
    setInput({
      id: "",
    });
  }

  let aux = productsData.filter(el => el.id === input.id);

  const handleFiles = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Product_photo ");
    const res = await fetch("https://api.cloudinary.com/v1_1/djtkn6o7r/image/upload", {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    setInput({ ...input, images: file.secure_url });
  };

  return (
    <div className='editProductContainer'>
      <div className='productContainer'>
        <h1 className='titulo-revelde'>SELECCIONE EL PRODUCTO </h1>

        <select
          onChange={e => handleSelectChange(e)}
          className='select-renegado'
          required='required'
        >
          <option value=''>Seleccione un producto</option>
          {productsData.map(el => {
            return (
              <option key={el.id} name='id' value={el.id}>
                {el.productName}
              </option>
            );
          })}
        </select>

        <br></br>
        <Box sx={{ minWidth: 120 }}>
          <form onSubmit={e => handleSubmit(e)} className='CreacionUsuario'>
            <label>Precio:</label>
            <input
              onChange={handleLabelChangeCollection}
              name='salePrice'
              type='number'
              placeholder={aux?.map(el => el.salePrice)}
            ></input>
            <br></br>
            <label>Descripción:</label>
            <div className='descriptionEditProduct'>
              <textarea
                onChange={handleInputChange}
                type='text'
                name='description'
                placeholder={aux?.map(el => el.description)}
                rows='7'
                cols='70'
              />
            </div>
            <label>Stock:</label>
            <Input
              onChange={handleInputChange}
              type='number'
              name='stock'
              placeholder={aux?.map(el => el.stock)}
            />
            <br></br>
            <input type='file' multiple='true' name='images' onChange={handleFiles} />
            <br></br>
            <select value={input.collection} onChange={e => handleSelectChangeCollection(e)}>
              <option>Seleccione una categoria...</option>
              {collections?.map(c => {
                return (
                  <>
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  </>
                );
              })}
            </select>
            <br></br>
            <br></br>
            <select name='gender' onChange={e => handleSelectChangeCollection(e)}>
              <option value='UNISEX'>Seleccione un genero...</option>
              <option value='UNISEX'>UNISEX</option>
              <option value='MASCULINO'>MASCULINO</option>
              <option value='FEMENINO'>FEMENINO</option>
            </select>
            <br></br>
            <br></br>
            <br></br>
            <button className='btn'>Guardar cambios</button>
          </form>
        </Box>
      </div>
      <Link to='/'>
        <button className='botonAdmin'>
          Volver
        </button>
        </Link>
      <ToastContainer />
    </div>
  );
}
