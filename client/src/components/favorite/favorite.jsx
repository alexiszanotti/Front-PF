import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { favorite } from "../../Redux/Actions/index.jsx";
// import CardShopingCart from "../cardShopingCart/cardShopingCart";
import CardFavorite from "../cardFavorite/cardFavorite";
import { Link } from "react-router-dom";

import "./favorite.css"

export default function Favorite(props) {
    const dispatch = useDispatch();

    const favoritos = useSelector((state) => state.favorite);

    // console.log(favoritos);


    useEffect(() => {
        dispatch(favorite(props.match.params.id));
    }, [dispatch])

    

    return (
        <div>
            <h1>Mi lista de deseos</h1>
            <h2>{favoritos.length} {favoritos.length === 1 ? "Artículo" : "Artículos"}       </h2>

            <br></br>
            <br></br>
            <div className="termo">
            {
                favoritos === undefined || favoritos.length === 0 ? <h1></h1> :
                    favoritos.map((products) => {
                        return (
                            
                                <CardFavorite
                                    key={products.id}
                                    id={products.id}
                                    title={products.productName}
                                    price={products.salePrice}
                                    brand={products.brand.name}
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

