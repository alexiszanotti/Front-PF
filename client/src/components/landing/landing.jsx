import "./landing.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/Actions";
import { Carousel } from "react-carousel-minimal";
import { useSelector } from "react-redux";

export default function Landing() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProducts());
    const interval = setInterval(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const products = useSelector((state) => state.products);
  let aux = []
  for(let i = 0; i < products.length ; i++ ){
    if(i < 10){
      aux.push(products[i])
    }
  }

  const data = aux.map((el) => {
    return {
      image: el.images,
      caption: el.productName,
    };
  });


  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  const renderCards = !loading ? (
    <Carousel
      data={data}
      time={3000}
      width="750px"
      height="450px"
      captionStyle={captionStyle}
      radius="10px"
      slideNumber={true}
      slideNumberStyle={slideNumberStyle}
      captionPosition="bottom"
      automatic={true}
      dots={true}
      pauseIconColor="white"
      pauseIconSize="40px"
      slideBackgroundColor="darkgrey"
      slideImageFit="cover"
      thumbnails={true}
      thumbnailWidth="100px"
      style={{
        textAlign: "center",
        maxWidth: "850px",
        maxHeight: "500px",
        margin: "40px auto",
      }}
    />
  ) : (
    <>
    <img alt="l" src="https://media4.giphy.com/media/4wp3eYvjcq5i7Agxg5/giphy.gif?cid=ecf05e47sat0w6fbe73jrdj2syy6otovc7koep32fz9w44i0&rid=giphy.gif&ct=s" />
    <h1>...Cargando</h1>
    </>
  );
  return (
    <div className="containerLanding">
      <h1 className="tituloLanding">BIENVENIDOS A ADIDAS OFICIAL</h1>

      <Link to="/home">
        <button className="btn5">Entrar al sitio</button>
      </Link>
      <div style={{ textAlign: "center" }}>
        {/* <p>Easy to use, responsive and customizable carousel component for React Projects.</p> */}
        <div
          style={{
            padding: "0 20px",
          }}
        >
        {renderCards}
        </div>
      </div>
    </div>
  );
}
