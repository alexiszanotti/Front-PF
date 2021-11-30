import "./home.css";
import React, { useState, useEffect } from "react";
import Paginado from "../paged/paged";
import Products from "../product/product";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { filterByParams, resetFilter, getCollection } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";

export default function Home({setCurrentPage, currentPage}) {
  const dispatch = useDispatch();

  const logIn = useSelector(state => state.userLogin);
  const shoes = useSelector(state => state.productsFilter);
  const orderState = useSelector(state => state.orden);
  const collections = useSelector(state => state.collections);

  // let idUser = logIn.id;

  const [orden, setOrden] = useState(orderState);
  const [stateValue, setStateValue] = useState(false)

  const [shoesPorPaginaPorPagina] = useState(20);
  const indeceDelUltimoShoes = currentPage * shoesPorPaginaPorPagina; // 10
  const indiceDelPrimerShoes = indeceDelUltimoShoes - shoesPorPaginaPorPagina; // 0
  const currentShoes = shoes.slice(indiceDelPrimerShoes, indeceDelUltimoShoes);
  const paginado = pageNumber => {
    setCurrentPage(pageNumber);
  };

  function handleClick(e) {
    dispatch(resetFilter());
    setStateValue(true)
  }

  function handleChange(e) {
    setCurrentPage(1);
    setOrden({ ...orden, [e.target.name]: e.target.value });
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(shoes.length / shoesPorPaginaPorPagina); i++) {
    pageNumbers.push(i);
  }
  function nextPage() {
    if (currentPage === pageNumbers.length) {
      setCurrentPage(5);
      console.log("entro al console");
    } else {
      setCurrentPage(currentPage + 1);
    }
  }
  function previousPage() {
    if (currentPage === 1) {
      setCurrentPage(1);
      console.log("entro al console");
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    dispatch(filterByParams(orden));
    return () => {};
  }, [dispatch, orden]);

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  return (
    <div>
      <div className='boxCategories'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={18}>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>MODELO</InputLabel>
                  <Select
                    sx={{ bgcolor: "white" }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='COLECCION'
                    name='collection'
                    onChange={handleChange}
                  >
                    <MenuItem value='All'>TODOS</MenuItem>
                    {collections?.map(el => {
                      return (
                        <MenuItem key={el.id} value={el.name}>
                          {el.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>GENERO</InputLabel>
                  <Select
                    sx={{ bgcolor: "white" }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='GENERO'
                    name='gender'
                    onChange={handleChange}
                  >
                    <MenuItem value={"All"}>TODOS</MenuItem>
                    <MenuItem value={"Men"}>MASCULINO</MenuItem>
                    <MenuItem value={"Women"}>FEMENINO</MenuItem>
                    <MenuItem value={"Unisex"}>UNISEX</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>PRECIO</InputLabel>
                  <Select
                    sx={{ bgcolor: "white" }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='PRECIO'
                    name='price'
                    onChange={handleChange}
                  >
                    <MenuItem value={"ASC"}>MENOR A MAYOR</MenuItem>
                    <MenuItem value={"DESC"}>MAYOR A MENOR</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <button className='botonCart1' onClick={handleClick}>
        Borrar filtros
      </button>
      <div className='contenedorHome'>
        {currentShoes.length ? (
          currentShoes?.map(products => {
            return (
              <Products
                key={products.id}
                title={products.productName.toUpperCase()}
                image={products.images}
                price={"$ " + Number(products.salePrice)}
                id={products.id}
                stock={products.stock}
              />
            );
          })
        ) : (
          <Typography>No hay productos con esos parametros</Typography>
        )}
      </div>
      <div className='paginado'>
        <Paginado
          shoesPorPaginaPorPagina={shoesPorPaginaPorPagina}
          shoes={shoes.length}
          paginado={paginado}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}
