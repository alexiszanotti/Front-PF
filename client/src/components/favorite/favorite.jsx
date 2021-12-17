import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardFavorite from "../cardFavorite/cardFavorite";
import { Link } from "react-router-dom";
import { emptyFavorites, addDataBaseFavorite, deleteAllDataBaseeFavorite } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import "./favorite.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../footer/footer";

export default function Favorite() {
  const dispatch = useDispatch();
  const favoritos = useSelector((state) => state.favorite);
  const logIn = useSelector(state => state.userLogin);
  const dataBaseFavorite = useSelector((state) => state.favoriteAlmacen)
  let idUser = logIn.id;



  var hash = {};
  let sinLogin = favoritos.filter(function (current) {
    var exists = !hash[current.id];
    hash[current.id] = true;
    return exists;
  });

  const errorSubmit = () => {
    toast.error('Productos eliminados con éxito', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  const handleEmptyFavorites = () => {
    if(idUser){
      dispatch(deleteAllDataBaseeFavorite(idUser))
      setTimeout(() =>{
        dispatch(addDataBaseFavorite(idUser));
      }, 300)
    }
    dispatch(emptyFavorites());
    errorSubmit()
  };

  useEffect(() => {
    if (idUser) {
      dispatch(addDataBaseFavorite(idUser));

    }
  }, [dispatch, idUser]);

  return (
    <div>
      {idUser ? (
        <>
          <div className="favoriteContainer">
            <h1>Mi lista de deseos</h1>
            <h2>
              {dataBaseFavorite.products?.length}{" "}
              {dataBaseFavorite.products?.length === 1 ? "Artículo" : "Artículos"}{" "}
            </h2>
            <Button onClick={handleEmptyFavorites} variant='contained'>
              BORRAR TODOS FAVORITOS
            </Button>
          </div>
          <br></br>
          <br></br>
          <div className="termo">
            {dataBaseFavorite.products === undefined || dataBaseFavorite.products?.length === 0 ? (
              <h1>...</h1>
            ) : (
              dataBaseFavorite.products?.map((products) => {
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
          {
            dataBaseFavorite.products === undefined || dataBaseFavorite.products?.length === 0 ?(
              null 
            ) : (
              <Footer/>
            )
            
          }
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
            <Button onClick={handleEmptyFavorites} variant='contained'>
              BORRAR TODOS FAVORITOS
            </Button>
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
          {
            sinLogin === undefined || sinLogin.length === 0 ?(
              null 
            ) : (
              <Footer/>
            )
            
          }
          <div>
            <Link to="/home">
              <button className="botonCart1">volver</button>
            </Link>
          </div>
        </>
      )}
      <ToastContainer />
    
    </div>
  );
}
