import "./home.css";
import React, {useState} from "react";
import Paginado from "../paged/paged";
import Products from "../product/product";
import {useSelector} from "react-redux"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterPrice, filterDiscount, filterModel, filterSexo} from "../../Redux/Actions/index"
import { useDispatch} from "react-redux";
export default function Home() {
    const shoes =  useSelector((state) => state.products)
    const[orden, setOrden]=useState("")
    const dispatch = useDispatch()


      // Pagina actual
    const[currentPage, setCurrentPage] = useState(1);
    // cantidad de paises que tengo por pagina
    const[shoesPorPaginaPorPagina, setShoesPorPaginaPorPagina]= useState(20);
    // seteo el index del ultimo pais
    const indeceDelUltimoShoes = currentPage * shoesPorPaginaPorPagina // 10
    const indiceDelPrimerShoes= indeceDelUltimoShoes - shoesPorPaginaPorPagina // 0
    const currentShoes = shoes.slice(indiceDelPrimerShoes, indeceDelUltimoShoes)
    // slice muestra un nuevo array empezando del principio al final
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }



    function handelFilterPrice(e){
        e.preventDefault();
        dispatch(filterPrice(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)

    }
    
    function handelFilterDiscount(e){
        e.preventDefault();
        dispatch(filterDiscount(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)

    }
    function handelFilterModel(e){
        e.preventDefault();
        dispatch(filterModel(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }
    function handelFilterSexo(e){
        e.preventDefault();
        dispatch(filterSexo(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    
    return (
        <div>
            <div className="boxCategories">
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">MODELO</InputLabel>
                            <Select
                            sx={{ bgcolor: "white" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="MODELO"
                            onChange={handelFilterModel}
                            >
                            <MenuItem value="ALL">TODOS</MenuItem>
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
                            <InputLabel id="demo-simple-select-label">SEXO</InputLabel>
                            <Select
                            sx={{ bgcolor: "white" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="TALLE"
                            onChange={handelFilterSexo}
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
                            <InputLabel id="demo-simple-select-label">PRECIO</InputLabel>
                            <Select
                            sx={{ bgcolor: "white" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="PRECIO"
                            onChange={handelFilterPrice}
                            >
                            <MenuItem value={"ASC"}>MENOR A MAYOR</MenuItem>
                            <MenuItem value={"DES"}>MAYOR A MENOR</MenuItem>
                            
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel value={"ALL"}id="demo-simple-select-label">DESCUENTO</InputLabel>
                            <Select
                            sx={{ bgcolor: "white" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="DESCUENTO"
                            onChange={handelFilterDiscount}
                            >
                            <MenuItem value="All">TODOS</MenuItem>
                            <MenuItem value={"0.00"}>SIN DESCUENTO</MenuItem>
                            <MenuItem value={"40.00"}>40%</MenuItem>
                            <MenuItem value={"50.00"}>50%</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
            </div>
            <div className="contenedorHome">
                
                {
                    currentShoes.length &&
                    currentShoes.map((products) =>{
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
            <div>
                <Paginado 
                shoesPorPaginaPorPagina= {shoesPorPaginaPorPagina}
                shoes= {shoes.length}
                paginado={paginado}
                />
            </div>
    </div>
    )

}