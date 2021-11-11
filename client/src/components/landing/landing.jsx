import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Styles from "./landing.css";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../Redux/Actions";
import { Carousel } from 'react-carousel-minimal';
export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const data = [
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c653d88f003245258132ab4a009c5169_9366/Zapatillas_Galaxy_5_Negro_FW5717_01_standard.jpg",
      caption: "Zapatillas Galaxy 5"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/790f615d90cb4b6caa04aaff015c710f_9366/Zapatillas_Superstar_Blanco_FV0322_01_standard.jpg",
      caption: "Zapatillas Superstar"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/b19f906a930a48da810bad1801602f3b_9366/Zapatillas_Racer_TR21_Granate_GZ8183_01_standard.jpg",
      caption: "Zapatillas Racer TR21"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/c5c83b9a26c74bef8855ab14011cfc6e_9366/Zapatillas_Run60s_Rojo_EG8689_01_standard.jpg",
      caption: "Zapatillas RUN 60S"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/52488a782563401fbc12acc40116a5b5_9366/Zapatillas_Postmove_Negro_H00460_01_standard.jpg",
      caption: "Zapatillas Postmove"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/8639197d086740c8a64eac310115f645_9366/Zapatllas_Run_Falcon_2.0_Negro_FY5946_01_standard.jpg",
      caption: "Zapatillas RUN Falcon"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/87288c3d31324fe98b2cad1f007cdd95_9366/Zapatillas_Response_Super_2.0_Negro_H02022_01_standard.jpg",
      caption: "Zapatillas Response Super"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/6899f3652da84540a495ac5300b1e674_9366/Zapatillas_Ultraboost_20_Negro_FZ0174_01_standard.jpg",
      caption: "Zapatillas Ultraboost"
    },
    {
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/e601ce16ad6b4344bde1ac79010e4584_9366/Zapatillas_Ultraboost_Jordan_E._Moss_SandL_Dna_Negro_FZ2917_01_standard.jpg",
      caption: "Zapatillas Jordan"
    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="App">
      <h1 className="containerTitle">Bienvenidos a Adidas Oficial</h1>

      <Link to='/home'>
      <button className="btn">Entrar al sitio</button>
      </Link>
      <div style={{ textAlign: "center" }}>
        {/* <p>Easy to use, responsive and customizable carousel component for React Projects.</p> */}
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={data}
            time={3000}
            width="850px"
            height="500px"
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
        </div>
      </div>
    </div>
      
  );
}
  

