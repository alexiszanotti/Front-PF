import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { shoppingCart }  from "../../Redux/Actions/index.jsx";
export default function ShopingCart(props) {
    const dispatch = useDispatch();
    console.log(props)

    const cart = useSelector((state) => state.shoppingCart);

    useEffect(() =>{
        dispatch(shoppingCart(props.match.params.id));
    },[dispatch])

    console.log(cart)
    return(
        <div>
            <h1>TU CARRITO</h1>
            {
                cart === undefined || cart.length === 0 ? <h1>No hay productos</h1> :
                cart.map((products) => {
                    return(
                        <div key={products.id}>
                            <button>X</button>
                            <h1>{products.productName}</h1>
                            <h2>{products.salePrice + "$"}</h2>
                            <h2>{products.brand.name}</h2>
                            <img src={products.images[0]} alt=""/>
                        </div>
                    )
                })
            }
            
        </div>
    ) 
}

