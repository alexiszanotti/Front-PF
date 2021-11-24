import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardFavorite from "../cardFavorite/cardFavorite";
import { Link } from "react-router-dom";
import { emptyFavorites, postFavorite } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import "./favorite.css";

export default function Favorite() {
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favorite);
  const userLogin = useSelector((state) => state.userLogin);
  const users = useSelector((state) => state.users);
  let usr = users.filter((user) => user.id === userLogin.id);
  let productsFav = usr.map((el) => el.products);
  console.log(productsFav);
  var hash = {};
  let sinLogin = favoritos.filter(function (current) {
    var exists = !hash[current.id];
    hash[current.id] = true;
    return exists;
  });

  const handleEmptyFavorites = () => {
    dispatch(emptyFavorites());
  };

  const agregarFavorito = () => {
    var idUser = userLogin.id;
    if (idUser) {
      let idPorducs = favoritos.map((el) => el.id);
      if (idPorducs.length > 0) {
        for (let i = 0; i < idPorducs.length; i++) {
          dispatch(postFavorite({ userId: idUser, productId: idPorducs[i] }));
        }
      }
    }
  };
  useEffect(() => {
    agregarFavorito();
  }, [agregarFavorito]);

  return (
    <div>
      {userLogin.id ? (
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
