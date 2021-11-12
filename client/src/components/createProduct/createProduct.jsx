import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createProduct.css";
import { createProduct, getCollection } from "../../Redux/Actions/index";
import { Link, useHistory } from "react-router-dom";

const validateForm = input => {
  let error = {};
  if (!input.productName) error.productName = "El nombre del producto es requerido";
  else if (!input.listingPrice) error.listingPrice = "El precio de lista es requerido";
  else if (!input.salePrice) error.salePrice = "El precio de venta es requerido";
  else if (!input.discount) error.discount = "El descuento es requerido";
  else if (!input.images) error.images = "Al menos una imagen es requerida";
  else if (!input.description) error.description = "La descripción es requerida";

  return error;
};
export default function CreateProduct() {
  const collections = useSelector(state => state.collections);
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const history = useHistory();
  const [input, setInput] = useState({
    productName: "",
    listingPrice: "",
    salePrice: "",
    discount: "",
    images: [],
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

  const handleSelectChange = e => {
    setInput({ ...input, collection: e.target.value });
  };
  useEffect(() => {
    dispatch(getCollection());
  }, []);

  return (
    <div>
      <h1>Crear producto</h1>
      <div className='formulario-creacion'>
        <Link to='/home'>
          <button className='crear-categoria'>Volver</button>
        </Link>
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
          <input type='file' name='images' />
          {error.images && <p className='error'>{error.images} </p>}
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
        </form>
      </div>
    </div>
  );
}
