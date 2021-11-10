import React from "react";
import "./paged.css"
function Paginado({shoesPorPaginaPorPagina, shoes, paginado}){
    const pageNumber = []
                        //el Math.ceil redondea para arriba
    for (let i = 1; i <= Math.ceil(shoes/shoesPorPaginaPorPagina); i++){
        pageNumber.push(i)
    }


    return(
        <>
            <footer>
                <nav>
                    <ul className="paginado" >
                    {
                        pageNumber && 
                        pageNumber.map(number =>{
                            return(
                                    <p key={number} className="pag" onClick={() => paginado(number)}>{number}</p>

                            )
                            })
                    }
                    </ul>
                </nav>
            </footer>
        </>
    )
    
}

export default Paginado;