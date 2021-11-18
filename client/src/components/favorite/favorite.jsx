import {React, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import CardFavorite from "../cardFavorite/cardFavorite";
import { Link } from "react-router-dom";
import "./favorite.css"

export default function Favorite() {
    const dispatch = useDispatch();
    var favoritos = useSelector((state) => state.favorite);
    function recuperoValores() {
        return  localStorage.getItem("favoritos")
        
        
      
      }
      console.log(favoritos, "favoritos estado")
      let aux = recuperoValores()
      aux = JSON.parse(aux)
    /*   aux = aux.filter(e=> ) */

 
    
     
          if(favoritos.length === 0 && aux.length > 0 ){
            favoritos = aux
            console.log(favoritos, "entro primer if")
        } 
        if(favoritos.length > 0 && aux.length > 0 ){
             favoritos.concat(aux)
             console.log("entro segundo if")
          }
        if(favoritos.length > 0 && aux.length ===  0) {
            favoritos=favoritos
            console.log("entro tercero if")
        }   
     
    

     

      
/*     useEffect(() => {
        let aux = recuperoValores()
        favoritos.push(aux)
        console.log(favoritos, "favoritos")
      }, [favoritos, ]) */

   /*    var hash = {};
      let hola = favoritos.filter(function(current) {
       var exists = !hash[current.id];
       hash[current.id] = true;
       return exists;
     }); */

     
     
     let hola = favoritos
  
     console.log(hola, "hola") 

     

    return (
        <div>
            <div className="carritoVacio">
            <h1>Mi lista de deseos</h1>
            <h2>{hola.length} {hola.length === 1 ? "Artículo" : "Artículos"}       </h2>
            </div>
            <br></br>
            <br></br>
            <div className="termo">
            {
                hola === undefined || hola.length === 0 ? <h1>no hay nada</h1> :
                hola.map((products) => {
                        return (
                            
                                <CardFavorite
                                    key={products.id}
                                    id={products.id}
                                    title={products.productName}
                                    price={products.salePrice}
                                    brand={products.collection.name}
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

