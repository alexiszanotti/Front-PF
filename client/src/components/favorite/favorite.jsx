import React from "react";
import { useSelector } from 'react-redux';
import CardFavorite from "../cardFavorite/cardFavorite";
import { Link } from "react-router-dom";

import "./favorite.css"

export default function Favorite() {
    const favoritos = useSelector((state) => state.favorite);
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
                hola === undefined || hola.length === 0 ? <h1>no hay nada</h1> :
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

