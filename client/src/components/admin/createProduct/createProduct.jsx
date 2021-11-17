import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createProduct.css";
import { createProduct, getCollection } from "../../../Redux/Actions/index";
import { useHistory } from "react-router-dom";
import zapa from "../../../images/ImgaProduct.png";

const validateForm = input => {
  let error = {};
  if (!input.productName) error.productName = "El nombre del producto es requerido";
  else if (!input.listingPrice) error.listingPrice = "El precio de lista es requerido";
  else if (!input.salePrice) error.salePrice = "El precio de venta es requerido";
  else if (!input.discount) error.discount = "El descuento es requerido";
  // else if (input.images.length < 1) error.images = "Al menos una imagen es requerida";
  else if (!input.description) error.description = "La descripción es requerida";

  return error;
};
export default function CreateProduct() {

  const history = useHistory()

  const localStorage = window.localStorage;

  const userLogin = JSON.parse(localStorage.getItem('user'));
  console.log(userLogin, 'createProducto')
  if(userLogin.type !== 'Admin') {
    console.log('no es admin')
    History.push("/home");
    
    window.location.replace('');
    
  }

  const dispatch = useDispatch();
  const collections = useSelector(state => state.collections);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    productName: "",
    listingPrice: "",
    salePrice: "",
    discount: "",
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
      alert("Producto creado con éxito");
      history.push("/home");
    } else {
      alert("Por favor, complete todos los campos requeridos");
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
  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  return (
    <div>
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
            value={input.listingPrice}
            type='number'
            name='listingPrice'
            placeholder='Precio de lista'
          />
          {error.listingPrice && <p className='error'>{error.listingPrice} </p>}
          <input
            onChange={handleInputChange}
            value={input.salePrice}
            type='number'
            name='salePrice'
            placeholder='Precio de venta'
          />
          {error.salePrice && <p className='error'>{error.salePrice} </p>}
          <input
            onChange={handleInputChange}
            value={input.discount}
            type='number  '
            name='discount'
            placeholder='Descuento'
          />
          {error.discount && <p className='error'>{error.discount} </p>}
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
              src={input.images[0] ? input.images[0] : zapa}
              border='1px solid gray'
              width='100px'
              height='100px'
            />
            <img
              src={input.images[1] ? input.images[1] : zapa}
              border='1px solid gray'
              width='100px'
              height='100px'
            />
            <img
              src={input.images[2] ? input.images[2] : zapa}
              border='1px solid gray'
              width='100px'
              height='100px'
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
          <button className='crear-categoria'>Crear categoria</button>
          <button type='submit'>Crear Producto</button>
        </form>
      </div>
    </div>
  );
}
