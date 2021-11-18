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
import { filterByParams, resetFilter } from "../../Redux/Actions/index";
import { useDispatch, } from "react-redux";
import { Typography } from "@mui/material";
import {Button} from "@mui/material/";

export default function Home() {
  const shoes = useSelector(state => state.productsFilter);
  const orderState = useSelector(state => state.orden);
  const [orden, setOrden] = useState(orderState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterByParams(orden));
    return () => {
     
    }
  }, [orden])
  console.log(orden);
  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPorPaginaPorPagina, setShoesPorPaginaPorPagina] = useState(20);
  const indeceDelUltimoShoes = currentPage * shoesPorPaginaPorPagina; // 10
  const indiceDelPrimerShoes = indeceDelUltimoShoes - shoesPorPaginaPorPagina; // 0
  const currentShoes = shoes.slice(indiceDelPrimerShoes, indeceDelUltimoShoes);
  const paginado = pageNumber => {
    setCurrentPage(pageNumber);
  };


  function handleClick(e) {
   dispatch(resetFilter());
  }


  function handleChange (e){

    setCurrentPage(1);
    setOrden({...orden,[e.target.name]: e.target.value});
  }
 

  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(shoes.length / shoesPorPaginaPorPagina); i++) {
    pageNumbers.push(i);
  }
  function nextPage() {
    if (currentPage === pageNumbers.length) {
      setCurrentPage(1);
      console.log("entro al console");
    } else {
      setCurrentPage(currentPage + 1);
    }
  }
  function previousPage() {
    if (currentPage === 1) {
      setCurrentPage(pageNumbers.length);
      console.log("entro al console");
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div>
      <div className='boxCategories'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={4}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>MODELO</InputLabel>
                  <Select
                    sx={{ bgcolor: "white" }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='MODELO'
                    name="collection"
                    onChange={handleChange}
                  >
                    <MenuItem value='All'>TODOS</MenuItem>
                    <MenuItem value={"CORE / NEO"}>CORE/NEO</MenuItem>
                    <MenuItem value={"SPORT PERFORMANCE"}>SPORT PERFORMANCE</MenuItem>
                    <MenuItem value={"ORIGINALS"}>ORIGINALS</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>GENERO</InputLabel>
                  <Select
                    sx={{ bgcolor: "white" }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='GENERO'
                    name="gender"
                    onChange={handleChange}
                  >
                    <MenuItem value={"All"}>TODOS</MenuItem>
                    <MenuItem value={"Men's"}>MASCULINO</MenuItem>
                    <MenuItem value={"Women's"}>FEMENINO</MenuItem>
                    <MenuItem value={"Unisex"}>UNISEX</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>PRECIO</InputLabel>
                  <Select
                    sx={{ bgcolor: "white" }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='PRECIO'
                    name="price"
                    onChange={handleChange}
                  >
                    <MenuItem value={"ASC"}>MENOR A MAYOR</MenuItem>
                    <MenuItem value={"DESC"}>MAYOR A MENOR</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel value={"ALL"} id='demo-simple-select-label'>
                    DESCUENTO
                  </InputLabel>
                  <Select
                    sx={{ bgcolor: "white" }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='DESCUENTO'
                    name="discount"
                    onChange={handleChange}
                  >
                    <MenuItem value='All'>TODOS</MenuItem>
                    <MenuItem value={"0.00"}>SIN DESCUENTO</MenuItem>
                    <MenuItem value={"40.00"}>40%</MenuItem>
                    <MenuItem value={"50.00"}>50%</MenuItem>
                  </Select>
                  <Button onClick ={handleClick}>Resetear</Button>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div>
        <Paginado
          shoesPorPaginaPorPagina={shoesPorPaginaPorPagina}
          shoes={shoes.length}
          paginado={paginado}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
      <div className='contenedorHome'>
        {currentShoes.length ? 
        
          currentShoes.map(products => {
            return (
              <Products
                key={products.id}
                title={products.productName}
                image={products.images[0]}
                price={"$ " + Number(products.salePrice)}
                id={products.id}
              />
            );
          }):
          <Typography>No hay productos con esos parametros</Typography> 
        }
      </div>
    </div>
  );
}
