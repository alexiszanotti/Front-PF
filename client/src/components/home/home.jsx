import "./home.css"
import React from "react";
import Products from "../product/product";

export default function Home() {
    const adidas = [
        {
            "ProductName" : " Originals Sleek Shoes",
            "ProductID" : "G27341",
            "ListingPrice" : "7599",
            "Sale Price" : "3799",
            "Discount" : "50",
            "Brand" : "ORIGINALS",
            "Description" : "A modern take on adidas sport heritage, tailored just for women. Perforated 3-Stripes on the leather upper of these shoes offer a sleek look that mirrors iconic tennis styles.",
            "Rating" : "0",
            "Reviews" : "0",
           
            "Last Visited" : "2020-04-13T15:06:15"
        },
        {
            
            "ProductName" : "Swim Puka Slippers ",
            "ProductID" : "CM0081",
            "ListingPrice" : "999",
            "Sale Price" : "599",
            "Discount" : "40",

            "Description" : "These adidas Puka slippers for women's come with slim straps for a great fit. Feature performance logo on the footbed and textured Rubber outsole that gives unique comfort.",
            "Rating" : "0",
            "Reviews" : "0",
            
            "Last Visited" : "2020-04-13T15:06:15"
        },
        {
           
            "ProductName" : " Questar Ride Shoes",
            "ProductID" : "B44832",
            "ListingPrice" : "6999",
            "Sale Price" : "3499",
            "Discount" : "50",

            "Description" : "Inspired by modern tech runners, these women's shoes step out with unexpected style. They're built with a breathable knit upper, while the heel offers the extra support of an Achilles-hugging design. The cushioned midsole provides a soft landing with every stride.",
            "Rating" : "0",
            "Reviews" : "0",
            
            "Last Visited" : "2020-04-13T15:06:15"
        },
        {
            
            "ProductName" : "Taekwondo Shoes",
            "ProductID" : "D98205",
            "ListingPrice" : "7999",
            "Sale Price" : "3999",
            "Discount" : "50",
            "Brand" : "ORIGINALS",
            "Description" : "This design is inspired by vintage Taekwondo styles originally worn to perfect high kicks and rapid foot strikes. The canvas shoes make a streetwear fashion statement as a chic, foot-hugging slip-on. They're shaped for a narrow, women's-specific fit and ride on a soft gum rubber outsole.",
            "Rating" : "0",
            "Reviews" : "0",
            
            "Last Visited" : "2020-04-13T15:06:15"
        },
        {
            
            "ProductName" : " Duramo Lite 2.0 Shoes",
            "ProductID" : "B75586",
            "ListingPrice" : "4799",
            "Sale Price" : "1920",
            "Discount" : "60",

            "Description" : "Refine your interval training in these women's versatile running-inspired shoes. Featuring a lightweight mesh and synthetic upper, they combine responsive midsole cushioning with a soft collar that reduces ankle pressure. ",
            "Rating" : "0",
            "Reviews" : "0",
           
            "Last Visited" : "2020-04-13T15:06:15"
        },
        {
            
            "ProductName" : "Duramo Lite 2.0 Shoes",
            "ProductID" : "CG4051",
            "ListingPrice" : "4799",
            "Sale Price" : "2399",
            "Discount" : "50",

            "Description" : "Refine your interval training in these women's versatile running-inspired shoes. Featuring a lightweight mesh and synthetic upper, they combine responsive midsole cushioning with a soft collar that reduces ankle pressure. ",
            "Rating" : "0",
            "Reviews" : "0",
            
            "Last Visited" : "2020-04-13T15:06:15"
        },
        {
           
            "ProductName" : " Puka Slippers ",
            "ProductID" : "CM0080",
            "ListingPrice" : "999",
            "Sale Price" : "599",
            "Discount" : "40",

            "Description" : "These adidas Puka slippers for women's come with slim straps for a great fit. Feature performance logo on the footbed and textured Rubber outsole that gives unique comfort.",
            "Rating" : "0",
            "Reviews" : "0",
           
            "Last Visited" : "2020-04-13T15:06:15"
        },
        {

            "ProductName" : "DURAMO 9 SHOES",
            "ProductID" : "B75990",
            "ListingPrice" : "5599",
            "Sale Price" : "2799",
            "Discount" : "50",

            "Description" : "These women's neutral running shoes will get you on the road to your goals. A sandwich mesh upper offers lightweight breathability, while a seamless print overlay adds support for a stable stride. The midsole offers pillow-soft Cloudfoam cushioning that eases every stride.",
            "Rating" : "0",
            "Reviews" : "0",
            
            "Last Visited" : "2020-04-13T15:06:15"
        },
    ]
    return (
        <div className="contenedor">
            {
                adidas.map((products) =>{
                    return(
                        <Products 
                        key={products.Discount}
                        title={products.ProductName}
                        image={"https://media.revistagq.com/photos/5ce269279d80fc260ce332f7/master/w_1600%2Cc_limit/EG5293-adidas-yeezy-glow-release-date.jpg"}
                        price={products.ListingPrice + "$"}
                        id= {products.ProductID}
                        />
                    )
                })
            }
        </div>

    )

}