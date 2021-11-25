import "./editProduct.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Box from "@mui/material/Box";
import { Input } from "@mui/material";
import {
  getAllProducts,
  modifyProduct,
  getCollection,
} from "../../../Redux/Actions/index";
import swal from 'sweetalert';

export default function EditProduct() {

  const history = useHistory();

  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const collections = useSelector((state) => state.collections);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  const [input, setInput] = useState({
    id: "",
  });

  const handleSelectChange = function (e) {
    setInput({ ...input, id: e.target.value });
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChangeCollection = (e) => {
    setInput({ ...input, collection: e.target.value });
  };

  const handleLabelChangeCollection = (e) => {
    setInput({ ...input, salePrice: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(modifyProduct(input));
    swal("Modificacion Exitosa!", "Producto modificado con éxito!", "success");
    setInput({
      id: "",
    });
    history.push('/');
  }

  let aux = productsData.filter((el) => el.id === input.id);
  const porcentage = (((input.listingPrice * input.discount) / 100) - input.listingPrice) * (-1)
  

console.log(aux)
console.log(input)
  return (
    <div className="editProductContainer">
      <div className="productContainer">
        <h1>Seleccione el producto a modificar</h1>
        <Box sx={{ minWidth: 120 }}>
          <select
            onChange={(e) => handleSelectChange(e)}
            className="select"
            required="required"
          >
            <option value="">Seleccione un producto</option>
            {productsData.map((el) => {
              return (
                <option key={el.id} name="id" value={el.id}>
                  {el.productName}
                </option>
              );
            })}
          </select>
        </Box>
        <br></br>
        <Box sx={{ minWidth: 120 }}>
          <form onSubmit={(e) => handleSubmit(e)} className="CreacionUsuario">
            <label>Precio de lista:</label>
            <Input
              onChange={handleInputChange}
              value={input.listingPrice}
              type="number"
              name="listingPrice"
              placeholder={aux?.map((el) => el.listingPrice)}
            />
            <br></br>
            <label>Descuento:</label>
            <Input
              onChange={handleInputChange}
              value={input.discount}
              type="number"
              name="discount"
              placeholder={aux?.map((el) => el.discount)}
            />
            <br></br>
            <label>Precio de venta:</label>
            <label value={input.salePrice}  onChange={handleLabelChangeCollection} name="salePrice">{porcentage} </label>
            <br></br>
            <label>Descripción:</label>
            <div className="descriptionEditProduct">
              <textarea
                onChange={handleInputChange}
                value={input.description}
                type="text"
                name="description"
                placeholder={aux?.map((el) => el.description)}
                rows="7"
                cols="70"
              />
            </div>
            <label>STOCK:</label>
            <Input
              onChange={handleInputChange}
              type="number"
              name="stock"
              value={input.stock}
              placeholder={aux?.map((el) => el.stock)}
            />
            <br></br>
            <select
              value={input.collection}
              onChange={(e) => handleSelectChangeCollection(e)}
            >
              <option>Seleccione una categoria...</option>
              {collections?.map((c) => {
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
            <br></br>
            <button className="btn">Guardar cambios</button>
          </form>
        </Box>
      </div>
    </div>
  );
}
