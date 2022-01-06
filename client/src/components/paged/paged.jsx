import "./paged.css";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Paginado({ shoesPorPaginaPorPagina, shoes, paginado, previousPage, nextPage, currentPage }) {
  const pageNumber = [];
  //el Math.ceil redondea para arriba
  for (let i = 1; i <= Math.ceil(shoes / shoesPorPaginaPorPagina); i++) {
    pageNumber.push(i);
  }

  return (
    <>
      <footer>
        <nav className='paginado'>
          {/* <ul className='paginado'> */}
            
            <h4>Página: {currentPage} de {pageNumber.length}.</h4> 
            {/* {pageNumber &&
              pageNumber.map(number => {
                return (
                  <li key={number} value={number} className='pag' onClick={() => paginado(number)}>
                    {number}
                  </li>
                );
              })} */}
              
             
          {/* </ul> */}
        </nav>
      </footer>
    </>
  );
}

export default Paginado;
