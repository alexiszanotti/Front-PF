import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { favorite } from "../../Redux/Actions/index.jsx";
// import CardShopingCart from "../cardShopingCart/cardShopingCart";
import CardFavorite from "../cardFavorite/cardFavorite";
import { Link } from "react-router-dom";

import "./favorite.css"

export default function Favorite() {
    const dispatch = useDispatch();

    const favoritos = useSelector((state) => state.favorite);
       

    useEffect(() => {
        dispatch(favorite());
    }, [dispatch])

    var hash = {};
     let hola = favoritos.filter(function(current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });



    return (
        <div>
            <h1>Mi lista de deseos</h1>
            <h2>{hola.length} {hola.length === 1 ? "Artículo" : "Artículos"}       </h2>

            <br></br>
            <br></br>
            <div className="termo">
            {
                hola === undefined || hola.length === 0 ? <h1></h1> :
                hola.map((products) => {
                        return (
                            
                                <CardFavorite
                                    key={products.id}
                                    id={products.id}
                                    title={products.productName}
                                    price={products.salePrice}
                                    brand={products.collection.name}
                                    images={products.images[0]}

                               />
                                
                                )
                            })
                        }
                        </div>
            <div>
                <Link to="/home">
                    <button className="botonCart1">volver</button>
                </Link>
            </div>

        </div>

    )
}

