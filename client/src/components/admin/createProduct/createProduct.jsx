import "./createProduct.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getCollection } from "../../../Redux/Actions/index";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import zapa from "../../../images/ImgaProduct.png";

const validateForm = input => {
  let error = {};
  if (!input.productName) error.productName = "El nombre del producto es requerido";
  else if (!input.description) error.description = "La descripción es requerida";
  else if (!input.salePrice) error.salePrice = "El precio es requerido";
  else if (input.salePrice < 0) error.salePrice = "El precio no puede ser menor a 0";
  else if (!input.stock) error.stock = "El stock es requerido";
  else if (input.stock < 0) error.stock = "El stock no puede ser menor a 0";
  return error;
};
export default function CreateProduct() {
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  const collections = useSelector(state => state.collections);

  const [error, setError] = useState({});

  const [input, setInput] = useState({
    productName: "",
    salePrice: "",
    images: "",
    collection: "",
    description: "",
  });

  const handleInputChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validateForm({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(createProduct(input));
      swal("Creacion Exitosa!", "Producto creado con éxito!", "success");
      history.push("/");
    } else {
      swal("Error!", "Por favor, complete todos los campos requeridos!", "error");
    }
  };

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
    setInput({ ...input, images: [...input.images, file.secure_url] });
  };

  const handleSelectChange = e => {
    setInput({ ...input, collection: e.target.value });
  };

  return (
    <div className='createProduct'>
      <h1>Crear producto</h1>
      <div className='formulario-creacion'>
        <form className='form-inputs' onSubmit={e => handleSubmit(e)}>
          <input
            onChange={handleInputChange}
            value={input.productName}
            type='text'
            name='productName'
            placeholder='Nombre'
          />
          {error.productName && <p className='error'>{error.productName} </p>}

          <input
            onChange={handleInputChange}
            value={input.salePrice}
            type='number  '
            name='salePrice'
            placeholder='Precio de venta'
          />
          {error.salePrice && <p className='error'>{error.salePrice} </p>}
          <input
            onChange={handleInputChange}
            value={input.stock}
            type='number'
            name='stock'
            placeholder='Stock'
          />
          {error.stock && <p className='error'>{error.stock} </p>}
          <br></br>
          <textarea
            onChange={handleInputChange}
            value={input.description}
            type='text'
            name='description'
            placeholder='Descripción'
          />
          {error.description && <p className='error'>{error.description} </p>}
          <label>Imagen: </label>
          <input type='file' multiple='true' name='images' onChange={handleFiles} />
          {/* {error.images && <p className='error'>{error.images} </p>} */}
          <div className='container-img'>
            <img
              src={input?.images[0] ? input.images[0] : zapa}
              border='1px solid gray'
              width='100px'
              height='100px'
              alt='k'
            />
            <img
              src={input.images[1] ? input.images[1] : zapa}
              border='1px solid gray'
              width='100px'
              height='100px'
              alt='k'
            />
            <img
              src={input.images[2] ? input.images[2] : zapa}
              border='1px solid gray'
              width='100px'
              height='100px'
              alt='k'
            />
          </div>
          <select value={input.collection} onChange={e => handleSelectChange(e)}>
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
          <button className='btn'>Crear Producto</button>
        </form>
      </div>
    </div>
  );
}
