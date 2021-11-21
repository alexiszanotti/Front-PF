import React, { useState, useEffect } from "react";
import { getAllProducts, modifyProduct, getCollection } from "../../../Redux/Actions/index"
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import zapa from "../../../images/ImgaProduct.png";
import { Button } from "@mui/material/";
import { Input } from "@mui/material";
import "./editProduct.css"

const validateForm = input => {
    let error = {};
    if (isNaN(input.discount) || input.discount < 0 || input.discount > 100) {
        error.discount = "Tiene que ser un número entre 0 y 100";
    }
    return error;
};

export default function EditProduct() {

    const dispatch = useDispatch();
    const productsData = useSelector(state => state.products);
    const collections = useSelector(state => state.collections);
    const [error, setError] = useState({});

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
        setError(validateForm({ ...input, [e.target.name]: e.target.value }));

    };

    const handleSelectChangeCollection = e => {
        setInput({ ...input, collection: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(modifyProduct(input));
        alert("Producto modificado con éxito");
        setInput({
            id: "",
        });
    }

    // const handleFiles = async e => {
    //     const files = e.target.files;
    //     const data = new FormData();
    //     data.append("file", files[0]);
    //     data.append("upload_preset", "Product_photo ");
    //     const res = await fetch("https://api.cloudinary.com/v1_1/djtkn6o7r/image/upload", {
    //         method: "POST",
    //         body: data,
    //     });

    //     const file = await res.json();
    //     setInput({ ...input, images: [...input.images, file.secure_url] });
    // };

    let aux = productsData.filter((el) => el.id === input.id)
    // const porcentage = (((input.listingPrice * input.discount) / 100) - input.listingPrice) * (-1)

    return (
        <div className='editProductContainer'>
            <div className='productContainer'>
                <h1>Seleccione el producto a modificar</h1>
                <Box sx={{ minWidth: 120 }}>
                    <select onChange={(e) => handleSelectChange(e)} className="select" required="required" >
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
                            name='listingPrice'
                            placeholder={aux?.map((el) => el.listingPrice)}
                        />
                        <br></br>
                        <label>Descuento:</label>
                        <Input
                            onChange={handleInputChange}
                            value={input.discount}
                            type="number"
                            name='discount'
                            placeholder={aux?.map((el) => el.discount)}
                        />
                        {error.discount && <p className='error'>{error.discount} </p>}
                        <br></br>
                        <label>Precio de venta:</label>
                        <Input
                            onChange={handleInputChange}
                            value={input.salePrice}
                            type="number"
                            name='salePrice'
                            placeholder={aux?.map((el) => el.salePrice)}
                        />
                        {/* <label>${porcentage}</label> */}
                        <br></br>
                        <label>Descripción:</label>
                        <div className="descriptionEditProduct">
                        <textarea
                            onChange={handleInputChange}
                            value={input.description}
                            type='text'
                            name='description'
                            placeholder={aux?.map((el) => el.description)}
                            rows="7" cols="70"
                            
                        />
                        </div>
                        {/* <label>Imagen: </label>
                        <input type='file' multiple='true' name='images' onChange={handleFiles} />
                        <div className='container-img'> */}
                        {/* </div> */}
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
                        <br></br>
                        <Button variant="contained">GUARDAR CAMBIOS</Button>
                    </form>
                </Box>
            </div>
        </div>
    )
}