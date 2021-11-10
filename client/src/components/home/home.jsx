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
import { filterPrice, filterDiscount, filterModel} from "../../Redux/Actions/index"
import { useDispatch} from "react-redux";
export default function Home() {
    const shoes =  useSelector((state) => state.products)
    const[orden, setOrden]=useState("")
    const dispatch = useDispatch()


      // Pagina actual
    const[currentPage, setCurrentPage] = useState(1);
    // cantidad de paises que tengo por pagina
    const[shoesPorPaginaPorPagina, setShoesPorPaginaPorPagina]= useState(8);
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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            onChange={handelFilterModel}
                            >
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
                            <InputLabel id="demo-simple-select-label">TALLE</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            >
                            <MenuItem value={10}>40</MenuItem>
                            <MenuItem value={20}>41</MenuItem>
                            <MenuItem value={30}>42</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">PRECIO</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            onChange={handelFilterDiscount}
                            >
                            <MenuItem value={"0.00"}>Sin descuento</MenuItem>
                            <MenuItem value={"40.00"}>40%</MenuItem>
                            <MenuItem value={"50.00"}>50%</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
            </div>
            <div className="contenedor">
                
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