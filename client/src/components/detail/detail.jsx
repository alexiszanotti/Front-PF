// import Styles from "./detail.css";
import React, { useEffect } from "react";
import { detailProducts }  from "../../Redux/Actions/index.jsx";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./detail.css"

export default function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { id } = useParams();

  console.log(props)

  const detail = useSelector((state) => state.detail);


  console.log(detail, "holahola")

  useEffect(() => {
      dispatch(detailProducts(props.match.params.id))
  }, [dispatch]);

  function handleButtonHome(e) {
    e.preventDefault();
    history.push("/home");
  }

  function handleButtonShop(e) {
    e.preventDefault();
    history.push("/home");
  }

  function handleButtonFavorite(e) {
    e.preventDefault();
    history.push("/home");
  }

  return (
    <div className="container">
             
                  
                    {detail.map((products)=>{
                        return (
                          <div className="detailContainer"> 
                            <h1>{products.productName}</h1>
                            <ul className="detailUl">
                          <br></br>
                          <img className="img" src= {products.images[0]}/> 
                          <br></br>
                          <br></br>
                          <br></br>
                          <li className="detailSummary">{products.description}</li>
                          <br></br>
                          <li>{products.salePrice + "$"}</li>
                          </ul>
                          <li><button onClick={handleButtonFavorite} className="btn1"><FavoriteIcon /></button> <button onClick={handleButtonShop} className="btn2"><ShoppingCartIcon /></button></li>
                          </div>
                        )
                    })
                  }

      {/* <button onClick={handleButtonFavorite} className="btn"><FavoriteIcon /></button>  */}
      {/* <button onClick={handleButtonShop} className="btn"><ShoppingCartIcon /></button> */}
      <button onClick={handleButtonHome} className="btn">Home</button>
      <br></br>
    </div>
  );
}
