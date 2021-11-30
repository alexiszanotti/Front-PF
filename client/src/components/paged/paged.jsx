import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./paged.css";
function Paginado({ shoesPorPaginaPorPagina, shoes, paginado, previousPage, nextPage }) {
  const pageNumber = [];
  //el Math.ceil redondea para arriba
  for (let i = 1; i <= Math.ceil(shoes / shoesPorPaginaPorPagina); i++) {
    pageNumber.push(i);
  }

  const [page, setPage] = React.useState('');

  const handleChange = (event) => {
    setPage(event.target.value);
  }

  return (
    <>
      <footer>
        <nav>
          <ul className='paginado'>
            <button onClick={previousPage} className='btn1'>
              Anterior
            </button>
            {pageNumber &&
              pageNumber.map(number => {
                return (
                  <li value={number} className='pag' onClick={() => paginado(number)}>
                    {number}
                  </li>
                );
              })}
            <button onClick={nextPage} className='btn2'>
              Siguiente
            </button>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default Paginado;
