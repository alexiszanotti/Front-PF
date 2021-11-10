import "./home.css"
import React from "react";
import Products from "../product/product";
import {useSelector} from "react-redux"
export default function Home() {
    const shoes =  useSelector((state) => state.products)
    console.log(shoes)

    // function validateImg(img, req) {
    //     req = new XMLHttpRequest();
    //     if (req.status !== 403) {
    //       return img;
    //     } else {
    //       return "https://via.placeholder.com/150";
    //     }
    //   }
    
    return (
        <div className="contenedor">
            {
                shoes.length &&
                shoes.map((products) =>{
                    return(
                        <Products 
                        key={products.id}
                        title={products.productName}
                        image={products.images[0]}
                        price={products.salePrice + "$"}
                        id= {products.id}
                        />
                    )
                })
            }
        </div>

    )

}