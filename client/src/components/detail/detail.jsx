import "./detail.css"
import React, { useEffect } from 'react';
// import { detailProducts }  from "../../Redux/Actions/index.js";
// import { useHistory, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';


export default function Detail(){
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const { id } = useParams();

    // const detail = 

    

    // useEffect(() => {
    //     dispatch(detailProducts(id))
    // }, [dispatch, id]);

    function handleButtonHome(e) {
        e.preventDefault();
        history.push('/home');
    }

    const adidas = [
        {
            "ProductName" : " Originals Sleek Shoes",
            "ProductID" : "G27341",
            "ListingPrice" : "7599",
            "SalePrice" : "3799",
            "Discount" : "50",
            "Brand" : "ORIGINALS",
            "Description" : "A modern take on adidas sport heritage, tailored just for women. Perforated 3-Stripes on the leather upper of these shoes offer a sleek look that mirrors iconic tennis styles.",
            "Rating" : "0",
            "Reviews" : "0",
           
            "Last Visited" : "2020-04-13T15:06:15"
        }
    ]

    return(
        <div>  

           {
               adidas.map(products => {
                   return (
                       <div>
                            <h1>{products.ProductName}</h1>
                            <h3>{products.ListingPrice}</h3>
                            <h3>{products.SalePrice}</h3>
                            <h3>{products.Brand}</h3>
                            <h3>{products.Description}</h3>
                       </div>
                   )
               })
           }

            <button onClick={handleButtonHome}>Home</button>
        </div>
    )
}