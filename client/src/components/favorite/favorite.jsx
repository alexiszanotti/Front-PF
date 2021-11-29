import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardFavorite from "../cardFavorite/cardFavorite";
import { Link } from "react-router-dom";
import { emptyFavorites, addDataBaseFavorite } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import "./favorite.css";

export default function Favorite() {
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favorite);
  const userLogin = useSelector((state) => state.userLogin);
  const logIn = useSelector(state => state.userLogin);
  const dataBaseFavorite = useSelector((state) => state.favoriteAlmacen)
  let idUser = logIn.id;

  var hash = {};
  let sinLogin = favoritos.filter(function (current) {
    var exists = !hash[current.id];
    hash[current.id] = true;
    return exists;
  });

  const handleEmptyFavorites = () => {
    dispatch(emptyFavorites());
  };

  useEffect(() => {
    if (idUser) {
      dispatch(addDataBaseFavorite(idUser));

    }
  }, [dispatch]);

  return (
    <div>
      {userLogin.id ? (
        <>
          <div className="favoriteContainer">
            <h1>Mi lista de deseos</h1>
            <h2>
              {dataBaseFavorite?.length}{" "}
              {dataBaseFavorite?.length === 1 ? "Artículo" : "Artículos"}{" "}
            </h2>
            <button onClick={handleEmptyFavorites}>
              BORRAR TODOS FAVORITOS
            </button>
          </div>
          <br></br>
          <br></br>
          <div className="termo">
            {dataBaseFavorite === undefined || dataBaseFavorite?.length === 0 ? (
              <h1>...</h1>
            ) : (
              dataBaseFavorite?.map((products) => {
                return (
                  <CardFavorite
                    id={products.id}
                    key={products.id}
                    title={products.productName}
                    price={products.salePrice}
                    images={products.images}
                  />
                );
              })
            )}
          </div>
          <div>
            <Link to="/home">
              <button className="botonCart1">volver</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="favoriteContainer">
            <h1>Mi lista de deseos</h1>
            <h2>
              {sinLogin.length}{" "}
              {sinLogin.length === 1 ? "Artículo" : "Artículos"}{" "}
            </h2>
            <button onClick={handleEmptyFavorites}>
              BORRAR TODOS FAVORITOS
            </button>
          </div>
          <br></br>
          <br></br>
          <div className="termo">
            {sinLogin === undefined || sinLogin.length === 0 ? (
              <h1>...</h1>
            ) : (
              sinLogin.map((products) => {
                return (
                  <CardFavorite
                    id={products.id}
                    key={products.id}
                    title={products.productName}
                    price={products.salePrice}
                    brand={products.collection.name}
                    images={products.images}
                  />
                );
              })
            )}
          </div>
          <div>
            <Link to="/home">
              <button className="botonCart1">volver</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
